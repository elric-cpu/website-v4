# Testing Strategy (Vite + React + Supabase)

Goals

- Protect P0 revenue journeys, auth, and portal access with deterministic automation.
- Enforce RBAC + RLS negatives for multi-tenant isolation.
- No external network calls after setup; all tests use MSW or local mocks.

Pyramid

- Unit: pure functions, validation/formatting, permission helpers, component error/empty states.
- Integration: Supabase query wrappers + RLS negatives using seeded fixtures.
- E2E: P0 journeys in Playwright (Chromium/WebKit/Firefox) with trace/video on failure.
- Estimating: math totals + labor hours in unit tests; RLS isolation for staff orgs in integration tests.

Environments

- Local: Vite dev server + MSW; optional local Supabase for deeper RLS checks.
- CI PR: unit + integration + E2E cross-browser + a11y smoke.
- CI Nightly: add Lighthouse CI, k6, ZAP baseline.
- Data: seed `scripts/seed/seed-test.sql`, reset schema between runs.

Security

- Block external network in tests; only baseURL + mocked Supabase allowed.
- AppSec: input validation tests, dependency audit hook, ZAP baseline in CI.
- Reliability: retry + idempotency checks in integration tests (mail/jobs/events).
- Rate limiting and CSRF: validate headers/429 in API tests when endpoints exist.

Observability (testable requirements)

- Structured logs for auth/billing/permissions events.
- Sentry (or stub) initialized with env placeholder; smoke test verifies init.
- Uptime checks for /health or / (synthetic).
