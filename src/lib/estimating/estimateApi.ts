import { supabase } from "@/lib/customSupabaseClient";
import type {
  EstimateLineItem,
  EstimateQuestion,
  EstimateTask,
  ParseResult,
} from "./types";

const bucketName =
  import.meta.env.VITE_ESTIMATE_STORAGE_BUCKET || "estimate-documents";
const extractFunction =
  import.meta.env.VITE_ESTIMATOR_AI_FUNCTION || "extract-estimate";
const pricingFunction =
  import.meta.env.VITE_ESTIMATOR_PRICE_FUNCTION || "price-lookup";

export const ensureOrgForUser = async (userId: string) => {
  const { data: existing } = await supabase
    .from("organization_members")
    .select("org_id")
    .eq("user_id", userId)
    .limit(1);

  if (existing && existing.length > 0) return existing[0].org_id;

  const { data: org } = await supabase
    .from("organizations")
    .insert({
      name: "Estimating Workspace",
      created_by: userId,
    })
    .select()
    .single();

  if (!org) {
    throw new Error("Unable to create organization.");
  }

  await supabase.from("organization_members").insert({
    org_id: org.id,
    user_id: userId,
    role: "owner",
  });

  return org.id;
};

export const createProject = async ({
  orgId,
  name,
  propertyAddress,
  locationZip,
  createdBy,
}: {
  orgId: string;
  name: string;
  propertyAddress?: string;
  locationZip?: string;
  createdBy: string;
}) => {
  const { data, error } = await supabase
    .from("estimate_projects")
    .insert({
      org_id: orgId,
      name,
      property_address: propertyAddress || null,
      location_zip: locationZip || null,
      created_by: createdBy,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const uploadDocument = async ({
  orgId,
  projectId,
  file,
  userId,
}: {
  orgId: string;
  projectId: string;
  file: File;
  userId: string;
}) => {
  const path = `${orgId}/${projectId}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(path, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);

  const { data, error } = await supabase
    .from("estimate_documents")
    .insert({
      org_id: orgId,
      project_id: projectId,
      title: file.name,
      storage_bucket: bucketName,
      storage_path: path,
      file_url: urlData?.publicUrl || null,
      uploaded_by: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const invokeExtraction = async ({
  documentId,
  projectId,
  parseResult,
}: {
  documentId: string;
  projectId: string;
  parseResult: ParseResult;
}) => {
  const { data, error } = await supabase.functions.invoke(extractFunction, {
    body: {
      document_id: documentId,
      project_id: projectId,
      parsed_text: parseResult.parsedText,
      page_map: parseResult.pageMap,
      pages: parseResult.pages,
    },
  });

  if (error) throw error;
  return data;
};

export const fetchEstimateTasks = async (estimateVersionId: string) => {
  const { data, error } = await supabase
    .from("estimate_tasks")
    .select("*")
    .eq("estimate_version_id", estimateVersionId);

  if (error) throw error;
  return (data || []) as EstimateTask[];
};

export const fetchEstimateLineItems = async (taskIds: string[]) => {
  const { data, error } = await supabase
    .from("estimate_line_items")
    .select("*")
    .in("estimate_task_id", taskIds);

  if (error) throw error;
  return (data || []) as EstimateLineItem[];
};

export const fetchEstimateQuestions = async (estimateVersionId: string) => {
  const { data, error } = await supabase
    .from("estimate_questions")
    .select("*")
    .eq("estimate_version_id", estimateVersionId);

  if (error) throw error;
  return (data || []) as EstimateQuestion[];
};

export const upsertAnswer = async ({
  questionId,
  value,
  answeredBy,
}: {
  questionId: string;
  value: string | number | null;
  answeredBy: string;
}) => {
  await supabase.from("estimate_answers").upsert(
    {
      question_id: questionId,
      value,
      answered_by: answeredBy,
    },
    { onConflict: "question_id" },
  );
};

export const updateTask = async (
  taskId: string,
  updates: Partial<EstimateTask>,
) => {
  await supabase.from("estimate_tasks").update(updates).eq("id", taskId);
};

export const updateLineItem = async (
  lineItemId: string,
  updates: Partial<EstimateLineItem>,
) => {
  await supabase
    .from("estimate_line_items")
    .update(updates)
    .eq("id", lineItemId);
};

export const fetchProductionRates = async () => {
  const { data, error } = await supabase
    .from("estimate_production_rates")
    .select("*");
  if (error) throw error;
  return data || [];
};

export const fetchLaborRates = async () => {
  const { data, error } = await supabase
    .from("estimate_labor_rate_cards")
    .select("*");
  if (error) throw error;
  return data || [];
};

export const getPrice = async ({
  itemKey,
  locationZip,
  unit,
  quantity,
}: {
  itemKey: string;
  locationZip: string | null;
  unit: string | null;
  quantity: number;
}) => {
  const { data, error } = await supabase.functions.invoke(pricingFunction, {
    body: {
      item_key: itemKey,
      location_zip: locationZip,
      unit,
      quantity,
    },
  });

  if (error) throw error;
  return data;
};
