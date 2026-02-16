import http from "k6/http";
import { sleep, check } from "k6";

export const options = { vus: 10, duration: "30s" };

export default function () {
  const res = http.get(
    `${__ENV.BASE_URL || "http://127.0.0.1:3000"}/client-portal-login`,
  );
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}
