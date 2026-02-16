import { describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

const env = {
  url: process.env.SUPABASE_URL,
  anon: process.env.SUPABASE_ANON_KEY,
  staffEmail: process.env.TEST_STAFF_EMAIL,
  staffPassword: process.env.TEST_STAFF_PASSWORD,
  staff2Email: process.env.TEST_STAFF2_EMAIL,
  staff2Password: process.env.TEST_STAFF2_PASSWORD,
};

const hasEnv = Object.values(env).every(Boolean);

const setupClient = () =>
  createClient(env.url, env.anon, { auth: { persistSession: false } });

(hasEnv ? describe : describe.skip)("estimating RLS", () => {
  it("isolates projects by organization", async () => {
    const clientA = setupClient();
    const clientB = setupClient();

    const loginA = await clientA.auth.signInWithPassword({
      email: env.staffEmail,
      password: env.staffPassword,
    });
    expect(loginA.error).toBeNull();

    const loginB = await clientB.auth.signInWithPassword({
      email: env.staff2Email,
      password: env.staff2Password,
    });
    expect(loginB.error).toBeNull();

    const { data: projectsA } = await clientA
      .from("projects")
      .select("id, organization_id");
    const { data: projectsB } = await clientB
      .from("projects")
      .select("id, organization_id");

    expect(
      projectsA?.some(
        (project) => project.id === "66666666-6666-6666-6666-666666666666",
      ),
    ).toBe(true);
    expect(
      projectsA?.some(
        (project) => project.id === "77777777-7777-7777-7777-777777777777",
      ),
    ).toBe(false);

    expect(
      projectsB?.some(
        (project) => project.id === "77777777-7777-7777-7777-777777777777",
      ),
    ).toBe(true);
    expect(
      projectsB?.some(
        (project) => project.id === "66666666-6666-6666-6666-666666666666",
      ),
    ).toBe(false);
  });
});
