import { describe, expect, it, vi } from "vitest";
import { getClientPortalBundle } from "../../src/lib/portalData";

const mockRpc = vi.fn(() =>
  Promise.resolve({
    data: {
      project: { id: "proj-1" },
      documents: [{ id: "doc-1" }],
      invoices: [],
    },
    error: null,
  }),
);

vi.mock("@/lib/customSupabaseClient", () => ({
  supabase: { rpc: (...args) => mockRpc(...args) },
}));

describe("portalData RLS", () => {
  it("loads portal bundle with a single RPC call", async () => {
    const bundle = await getClientPortalBundle();
    expect(bundle.documents).toHaveLength(1);
    expect(mockRpc).toHaveBeenCalledTimes(1);
  });
});
