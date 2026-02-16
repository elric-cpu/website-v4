import { supabase } from "@/lib/customSupabaseClient";

export const initDocumentUpload = async (payload) => {
  const { data, error } = await supabase.functions.invoke(
    "estimate-upload-init",
    {
      body: payload,
    },
  );
  if (error) throw error;
  return data;
};

export const completeDocumentUpload = async (payload) => {
  const { data, error } = await supabase.functions.invoke(
    "estimate-upload-complete",
    {
      body: payload,
    },
  );
  if (error) throw error;
  return data;
};

export const fetchEstimateStatus = async (payload) => {
  const { data, error } = await supabase.functions.invoke("estimate-status", {
    body: payload,
  });
  if (error) throw error;
  return data;
};

export const fetchEstimate = async (payload) => {
  const { data, error } = await supabase.functions.invoke("estimate-get", {
    body: payload,
  });
  if (error) throw error;
  return data;
};

export const fetchQuestions = async (payload) => {
  const { data, error } = await supabase.functions.invoke(
    "estimate-questions",
    {
      body: payload,
    },
  );
  if (error) throw error;
  return data;
};

export const submitAnswers = async (payload) => {
  const { data, error } = await supabase.functions.invoke(
    "estimate-recompute",
    {
      body: payload,
    },
  );
  if (error) throw error;
  return data;
};

export const uploadPdfToSignedUrl = async ({ storagePath, token, file }) => {
  const { data, error } = await supabase.storage
    .from("project-docs")
    .uploadToSignedUrl(storagePath, token, file, {
      contentType: file.type || "application/pdf",
    });
  if (error) throw error;
  return data;
};
