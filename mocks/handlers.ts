import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("http://localhost/lead", () => HttpResponse.json({ ok: true })),
];
