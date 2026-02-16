import { createClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const envReady = Boolean(supabaseUrl && supabaseAnonKey && supabaseServiceKey);

describe("estimating RLS", () => {
  const testFn = envReady ? it : it.skip;

  testFn("isolates estimate projects by org membership", async () => {
    const admin = createClient(supabaseUrl!, supabaseServiceKey!, {
      auth: { persistSession: false },
    });

    const password = "ChangeMe123!";
    const stamp = Date.now();
    const email1 = `est-user1-${stamp}@example.com`;
    const email2 = `est-user2-${stamp}@example.com`;

    const user1 = await admin.auth.admin.createUser({
      email: email1,
      password,
      email_confirm: true,
    });
    const user2 = await admin.auth.admin.createUser({
      email: email2,
      password,
      email_confirm: true,
    });

    const anonClient = createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: { persistSession: false },
    });

    const session1 = await anonClient.auth.signInWithPassword({
      email: email1,
      password,
    });
    const session2 = await anonClient.auth.signInWithPassword({
      email: email2,
      password,
    });

    const authed1 = createClient(supabaseUrl!, supabaseAnonKey!, {
      global: {
        headers: {
          Authorization: `Bearer ${session1.data.session?.access_token}`,
        },
      },
      auth: { persistSession: false },
    });

    const authed2 = createClient(supabaseUrl!, supabaseAnonKey!, {
      global: {
        headers: {
          Authorization: `Bearer ${session2.data.session?.access_token}`,
        },
      },
      auth: { persistSession: false },
    });

    const { data: org } = await authed1
      .from("organizations")
      .insert({ name: "RLS Test Org", created_by: user1.data?.user?.id })
      .select()
      .single();

    await authed1.from("organization_members").insert({
      org_id: org.id,
      user_id: user1.data?.user?.id,
      role: "owner",
    });

    const { data: project } = await authed1
      .from("estimate_projects")
      .insert({
        org_id: org.id,
        name: "RLS Project",
        created_by: user1.data?.user?.id,
      })
      .select()
      .single();

    const { data: projectsForUser2 } = await authed2
      .from("estimate_projects")
      .select("*");

    expect(
      projectsForUser2?.find((row) => row.id === project.id),
    ).toBeUndefined();
  });
});
