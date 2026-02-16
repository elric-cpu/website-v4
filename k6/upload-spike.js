import http from "k6/http";
import { sleep } from "k6";

export const options = { vus: 5, duration: "30s" };

export default function () {
  const payload = JSON.stringify({ name: "test.pdf", size: 4 });
  http.post(
    `${__ENV.BASE_URL || "http://127.0.0.1:3000"}/api/upload`,
    payload,
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  sleep(1);
}
