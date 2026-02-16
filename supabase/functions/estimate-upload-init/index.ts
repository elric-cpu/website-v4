import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, jsonResponse } from "../_shared/cors.ts";
import {
  createAdminClient,
  getUserFromRequest,
  requireOrgMember,
  requireStaffRole,
} from "../_shared/utils.ts";

serve(async (req) => {
  const options = handleOptions(req);
  if (options) return options;

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const supabase = createAdminClient();
    const { user, error } = await getUserFromRequest(supabase, req);
    if (error || !user) return jsonResponse({ error: "Unauthorized" }, 401);

    const roleCheck = requireStaffRole(user);
    if (!roleCheck.ok) return jsonResponse({ error: roleCheck.error }, 403);

    const payload = await req.json();
    const {
      project_id: projectId,
      file_name: fileName,
      mime_type: mimeType,
      size_bytes: sizeBytes,
    } = payload || {};
    if (!projectId || !fileName) {
      return jsonResponse({ error: "Missing project_id or file_name" }, 400);
    }

    const { data: project } = await supabase
      .from("projects")
      .select("id, organization_id")
      .eq("id", projectId)
      .maybeSingle();

    if (!project) {
      return jsonResponse({ error: "Project not found" }, 404);
    }

    const memberCheck = await requireOrgMember(
      supabase,
      project.organization_id,
      user.id,
    );
    if (!memberCheck.ok) return jsonResponse({ error: memberCheck.error }, 403);

    const documentId = crypto.randomUUID();
    const storagePath = `org/${project.organization_id}/projects/${projectId}/${documentId}.pdf`;

    const { error: insertError } = await supabase
      .from("project_documents")
      .insert({
        id: documentId,
        organization_id: project.organization_id,
        project_id: projectId,
        uploaded_by: user.id,
        file_name: fileName,
        storage_path: storagePath,
        mime_type: mimeType || "application/pdf",
        size_bytes: sizeBytes || null,
        status: "pending_upload",
      });

    if (insertError) {
      return jsonResponse({ error: insertError.message }, 400);
    }

    const { data: signed, error: signedError } = await supabase.storage
      .from("project-docs")
      .createSignedUploadUrl(storagePath, 600);

    if (signedError || !signed) {
      return jsonResponse(
        { error: signedError?.message || "Unable to create upload URL" },
        500,
      );
    }

    return jsonResponse({
      document_id: documentId,
      storage_path: storagePath,
      signed_url: signed.signedUrl,
      token: signed.token,
      expires_in: signed.expiresIn,
    });
  } catch (err) {
    return jsonResponse({ error: err.message || "Server error" }, 500);
  }
});
