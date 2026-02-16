import { supabaseAdmin } from "../db/supabase.js";
import { parsePdf } from "../pdf/parsePdf.js";
import { runTaskExtraction } from "../extract/taskExtractor.js";
import { buildDraftEstimate } from "../estimate/buildDraft.js";
import {
  upsertDocumentParse,
  createExcerpts,
} from "../services/documentService.js";
import {
  getOrCreateEstimate,
  createEstimateVersion,
  insertEstimateData,
} from "../services/estimateService.js";
import { writeAudit } from "../services/auditService.js";
import { logError } from "../utils/logger.js";

export const handleExtract = async (req, res) => {
  try {
    const {
      document_id: documentId,
      organization_id: organizationId,
      project_id: projectId,
      requested_by: requestedBy,
    } = req.body || {};
    if (!documentId || !organizationId || !projectId) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const { data: document } = await supabaseAdmin
      .from("project_documents")
      .select("id, storage_path")
      .eq("id", documentId)
      .maybeSingle();

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    await supabaseAdmin
      .from("extraction_runs")
      .update({ status: "processing" })
      .eq("document_id", documentId);

    await writeAudit({
      organizationId,
      projectId,
      actorId: requestedBy,
      eventType: "extraction_started",
      payload: { document_id: documentId },
    });

    const fileResponse = await supabaseAdmin.storage
      .from("project-docs")
      .download(document.storage_path);

    if (fileResponse.error || !fileResponse.data) {
      throw new Error("Unable to download PDF");
    }

    const arrayBuffer = await fileResponse.data.arrayBuffer();
    const parsed = await parsePdf(new Uint8Array(arrayBuffer));

    await upsertDocumentParse(documentId, organizationId, parsed);

    const taskCandidates = await runTaskExtraction({
      parsedText: parsed.parsed_text,
      pageMap: parsed.page_map,
    });

    await supabaseAdmin
      .from("extraction_runs")
      .update({
        status: "completed",
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        prompt_version: "v1",
        task_candidates: taskCandidates,
        completed_at: new Date().toISOString(),
      })
      .eq("document_id", documentId);

    const { data: project } = await supabaseAdmin
      .from("projects")
      .select("id, name, zip")
      .eq("id", projectId)
      .maybeSingle();

    if (!project) {
      throw new Error("Project not found");
    }

    const estimate = await getOrCreateEstimate({
      organizationId,
      projectId,
      requestedBy,
    });

    const pageIndex = new Map(
      parsed.pages.map((page) => [page.page_number, page]),
    );
    const excerptMap = await createExcerpts({
      documentId,
      organizationId,
      pageIndex,
      sourceRefs: taskCandidates.map((candidate) => candidate.source_ref),
    });

    const draft = await buildDraftEstimate({
      organizationId,
      project,
      taskCandidates,
    });

    const version = await createEstimateVersion({
      estimateId: estimate.id,
      organizationId,
      totals: draft.totals,
      createdBy: requestedBy,
    });

    await insertEstimateData({
      versionId: version.id,
      organizationId,
      tasks: draft.tasks,
      lineItems: draft.lineItems,
      excerptMap,
    });

    await writeAudit({
      organizationId,
      projectId,
      actorId: requestedBy,
      eventType: "estimate_version_created",
      payload: { estimate_id: estimate.id, version_id: version.id },
    });

    await writeAudit({
      organizationId,
      projectId,
      actorId: requestedBy,
      eventType: "extraction_completed",
      payload: { document_id: documentId },
    });

    return res.json({
      ok: true,
      estimate_id: estimate.id,
      version_id: version.id,
    });
  } catch (error) {
    logError("Extraction failed", { error: error.message });
    await supabaseAdmin
      .from("extraction_runs")
      .update({ status: "failed" })
      .eq("document_id", req.body?.document_id || "");
    return res.status(500).json({ error: "Extraction failed." });
  }
};
