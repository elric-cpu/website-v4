import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { getSupabaseClient } from "../_shared/supabase.ts";
import { extractTaskCandidates } from "../_shared/extraction.ts";
import { buildQuestions, getGlobalQuestions } from "../_shared/questions.ts";

type PageEntry = {
  page_number: number;
  text: string;
  start_offset: number;
  end_offset: number;
};

Deno.serve(async (request) => {
  const corsResponse = handleCors(request);
  if (corsResponse) return corsResponse;

  try {
    const payload = await request.json();
    const {
      document_id,
      project_id,
      parsed_text,
      page_map,
      pages = [],
    } = payload;

    if (!document_id || !parsed_text || !page_map) {
      return new Response(
        JSON.stringify({
          error: "Missing document_id, parsed_text, or page_map.",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = getSupabaseClient(request);
    const { data: userData } = await supabase.auth.getUser();

    const { data: document, error: docError } = await supabase
      .from("estimate_documents")
      .select("id, org_id, project_id")
      .eq("id", document_id)
      .maybeSingle();

    if (docError || !document) {
      return new Response(
        JSON.stringify({ error: "Document not found or access denied." }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    await supabase.from("estimate_document_parses").insert({
      document_id,
      parsed_text,
      page_map,
    });

    if (pages.length > 0) {
      const pageRows = (pages as PageEntry[]).map((page) => ({
        document_id,
        page_number: page.page_number,
        text: page.text,
        start_offset: page.start_offset,
        end_offset: page.end_offset,
      }));
      await supabase.from("estimate_document_pages").insert(pageRows);
    }

    const { data: run, error: runError } = await supabase
      .from("estimate_extraction_runs")
      .insert({
        document_id,
        org_id: document.org_id,
        status: "running",
        created_by: userData?.user?.id ?? null,
      })
      .select()
      .single();

    if (runError || !run) {
      return new Response(
        JSON.stringify({ error: "Failed to create extraction run." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const orchestratorUrl = Deno.env.get("ORCHESTRATOR_URL");
    let candidates = extractTaskCandidates(parsed_text, page_map);

    if (orchestratorUrl) {
      try {
        const response = await fetch(
          `${orchestratorUrl.replace(/\/$/, "")}/extract`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parsed_text, page_map }),
          },
        );

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data?.tasks) && data.tasks.length > 0) {
            candidates = data.tasks.map((task: any) => ({
              task_key: task.task_key,
              trade: task.trade,
              action: task.action,
              object: task.object,
              confidence: task.confidence ?? 0.5,
              source_ref: task.source_ref ?? null,
              missing_fields: task.missing_fields ?? [],
            }));
          }
        }
      } catch {
        // fall back to local extraction
      }
    }
    const candidateRows = candidates.map((candidate) => ({
      extraction_run_id: run.id,
      trade: candidate.trade,
      action: candidate.action,
      object: candidate.object,
      confidence: candidate.confidence,
      source_ref: candidate.source_ref,
      missing_fields: candidate.missing_fields,
    }));

    if (candidateRows.length > 0) {
      await supabase.from("estimate_task_candidates").insert(candidateRows);
    }

    const { data: estimateVersion, error: versionError } = await supabase
      .from("estimate_versions")
      .insert({
        project_id: project_id || document.project_id,
        org_id: document.org_id,
        source_document_id: document.id,
        status: "draft",
        created_by: userData?.user?.id ?? null,
      })
      .select()
      .single();

    if (versionError || !estimateVersion) {
      return new Response(
        JSON.stringify({ error: "Failed to create estimate version." }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const taskRows = candidates.map((candidate) => ({
      estimate_version_id: estimateVersion.id,
      task_key: candidate.task_key,
      trade: candidate.trade,
      location_label: null,
      scope_narrative: `${candidate.action} for ${candidate.object}.`,
      source_ref: candidate.source_ref,
    }));

    const { data: tasks } = await supabase
      .from("estimate_tasks")
      .insert(taskRows)
      .select();

    if (tasks && tasks.length > 0) {
      const taskLineItems = tasks.map((task) => ({
        estimate_task_id: task.id,
        item_key: task.task_key,
        description: task.scope_narrative,
        quantity: null,
        unit: null,
        material_unit_price: null,
        labor_hours: null,
        labor_rate: null,
        equipment_cost: 0,
        disposal_cost: 0,
        markup_pct: 15,
        total_cost: null,
        source_ref: task.source_ref,
      }));
      await supabase.from("estimate_line_items").insert(taskLineItems);
    }

    const globalQuestions = getGlobalQuestions().map((question) => ({
      estimate_version_id: estimateVersion.id,
      task_id: null,
      scope: "global",
      question_key: question.question_key,
      prompt: question.prompt,
      depends_on: question.depends_on ?? null,
      answer_type: question.answer_type,
      options: question.options ?? null,
      required: question.required ?? true,
      derived_field: question.derived_field ?? null,
    }));

    const taskQuestions =
      tasks?.flatMap((task, index) => {
        const missing = candidates[index]?.missing_fields ?? [];
        return buildQuestions(missing).map((question) => ({
          estimate_version_id: estimateVersion.id,
          task_id: task.id,
          scope: "task",
          question_key: question.question_key,
          prompt: question.prompt,
          depends_on: question.depends_on ?? null,
          answer_type: question.answer_type,
          options: question.options ?? null,
          required: question.required ?? true,
          derived_field: question.derived_field ?? null,
        }));
      }) ?? [];

    const questionRows = [...globalQuestions, ...taskQuestions];
    if (questionRows.length > 0) {
      await supabase.from("estimate_questions").insert(questionRows);
    }

    await supabase
      .from("estimate_extraction_runs")
      .update({ status: "completed", completed_at: new Date().toISOString() })
      .eq("id", run.id);

    return new Response(
      JSON.stringify({
        estimate_version_id: estimateVersion.id,
        task_count: candidates.length,
        question_count: questionRows.length,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "Unknown error." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
