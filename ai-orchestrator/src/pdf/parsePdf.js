import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const normalizeText = (items) =>
  items
    .map((item) => item.str)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

export const parsePdf = async (data) => {
  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;
  const numPages = pdf.numPages;
  const pageMap = [];
  const pages = [];
  let cursor = 0;
  const pageTexts = [];

  for (let pageNumber = 1; pageNumber <= numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = normalizeText(content.items || []);
    const startOffset = cursor;
    const endOffset = cursor + text.length;

    pageMap.push({
      page: pageNumber,
      start_offset: startOffset,
      end_offset: endOffset,
    });
    pages.push({
      page_number: pageNumber,
      text,
      start_offset: startOffset,
      end_offset: endOffset,
    });
    pageTexts.push(text);

    cursor = endOffset + 1;
  }

  return {
    parsed_text: pageTexts.join("\n"),
    page_map: pageMap,
    pages,
  };
};
