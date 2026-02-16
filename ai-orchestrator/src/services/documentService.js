import { supabaseAdmin } from "../db/supabase.js";

const buildExcerpt = (page, pageText, excerpt) => {
  if (!excerpt) {
    return {
      page_number: page.page_number,
      start_offset: page.start_offset,
      end_offset: page.start_offset,
      excerpt_text: "",
    };
  }
  const normalizedPage = pageText.toLowerCase();
  const normalizedExcerpt = excerpt.toLowerCase();
  const index = normalizedPage.indexOf(normalizedExcerpt);
  const start = index >= 0 ? page.start_offset + index : page.start_offset;
  const end =
    index >= 0 ? start + excerpt.length : page.start_offset + excerpt.length;
  return {
    page_number: page.page_number,
    start_offset: start,
    end_offset: end,
    excerpt_text: excerpt,
  };
};

export const upsertDocumentParse = async (
  documentId,
  organizationId,
  parsed,
) => {
  await supabaseAdmin.from("document_parses").upsert({
    document_id: documentId,
    organization_id: organizationId,
    parsed_text: parsed.parsed_text,
    page_map: parsed.page_map,
    created_at: new Date().toISOString(),
  });

  await supabaseAdmin
    .from("document_pages")
    .delete()
    .eq("document_id", documentId);

  const pageRows = parsed.pages.map((page) => ({
    id: crypto.randomUUID(),
    document_id: documentId,
    organization_id: organizationId,
    page_number: page.page_number,
    text: page.text,
    start_offset: page.start_offset,
    end_offset: page.end_offset,
  }));

  if (pageRows.length) {
    await supabaseAdmin.from("document_pages").insert(pageRows);
  }
};

export const createExcerpts = async ({
  documentId,
  organizationId,
  pageIndex,
  sourceRefs,
}) => {
  const excerptMap = new Map();
  const excerptRows = [];

  sourceRefs.forEach((source) => {
    if (!source?.page || !source?.excerpt) return;
    const key = `${source.page}|${source.excerpt}`;
    if (excerptMap.has(key)) return;
    const page = pageIndex.get(source.page);
    if (!page) return;
    const data = buildExcerpt(page, page.text, source.excerpt);
    const id = crypto.randomUUID();
    excerptMap.set(key, id);
    excerptRows.push({
      id,
      document_id: documentId,
      organization_id: organizationId,
      ...data,
    });
  });

  if (excerptRows.length) {
    await supabaseAdmin.from("document_excerpts").insert(excerptRows);
  }

  return excerptMap;
};
