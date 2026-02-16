import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import { server } from "../../mocks/server";
import { submitCommercialAgreementLead } from "../../src/lib/commercialAgreements/submitCommercialAgreementLead";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("submitCommercialAgreementLead", () => {
  it("posts to commercial endpoint when configured", async () => {
    vi.stubEnv(
      "VITE_COMMERCIAL_AGREEMENT_LEAD_ENDPOINT",
      "http://localhost/lead",
    );
    const result = await submitCommercialAgreementLead({ companyName: "Acme" });
    expect(result.ok).toBe(true);
    expect(result.mode).toBe("primary-endpoint");
  });

  it("falls back to console when no endpoint is set", async () => {
    vi.stubEnv("VITE_COMMERCIAL_AGREEMENT_LEAD_ENDPOINT", "");
    vi.stubEnv("VITE_ESTIMATOR_LEAD_ENDPOINT", "");
    const result = await submitCommercialAgreementLead({ companyName: "Acme" });
    expect(result.mode).toBe("noop");
  });
});
