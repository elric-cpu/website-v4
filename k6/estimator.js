import http from "k6/http";
import { sleep } from "k6";

export const options = { vus: 5, duration: "30s" };

export default function () {
  http.get(
    `${__ENV.BASE_URL || "http://127.0.0.1:3000"}/resources/home-maintenance-estimator`,
  );
  sleep(1);
}
