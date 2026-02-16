import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import type { ParseResult } from "./types";

GlobalWorkerOptions.workerSrc = workerUrl;

const joinPageText = (items: any[]) =>
  items
    .map((item) => item.str)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

export const parsePdfToText = async (file: File): Promise<ParseResult> => {
  const data = await file.arrayBuffer();
  const pdf = await getDocument({ data }).promise;
  const pages = [];
  let offset = 0;

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const textContent = await page.getTextContent();
    const text = joinPageText(textContent.items);
    const startOffset = offset;
    const endOffset = startOffset + text.length;
    pages.push({
      page_number: pageNumber,
      text,
      start_offset: startOffset,
      end_offset: endOffset,
    });
    offset = endOffset + 1;
  }

  const parsedText = pages.map((page) => page.text).join("\n");
  const pageMap = pages.map((page) => ({
    page: page.page_number,
    start: page.start_offset,
    end: page.end_offset,
  }));

  return { parsedText, pageMap, pages };
};
