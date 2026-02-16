# Journey Inventory

P0

1. Commercial agreement lead capture (funnel + submit) — mobile first.
2. Client signup -> login -> portal landing.
3. Client portal documents CRUD with notification.

P0 steps + assertions

- Lead funnel: complete steps -> submit -> toast “Request received”.
- Auth: register -> login -> route to `/client-portal` -> “My Projects” visible.
- Documents: upload file -> row appears -> delete removes row -> toast visible.

P1

1. Client portal billing pay action.
2. Magic link login.
3. Subcontractor login -> portal landing.

P2

1. Estimator lead flow.
2. Contact form submit.

Mobile notes

- Test funnel and login at 375px width; ensure buttons visible and no horizontal scroll.

Playwright automation order (first 10)

1. `e2e/public-lead.spec.ts` : commercial funnel submit
2. `e2e/auth.spec.ts` : signup + login + session restore
3. `e2e/portal-client-crud.spec.ts` : upload/delete + toast
4. `tests/a11y/basic-a11y.spec.ts` : base a11y sweep
5. `tests/smoke/navigation.spec.ts` : navigation smoke
6. `tests/smoke/home.spec.ts` : homepage smoke
7. `tests/smoke/contact-form.spec.ts` : contact submit
8. `tests/regression/content.spec.ts` : content integrity
9. `tests/visual/templates.spec.ts` : template visual diff
10. `tests/regression/maintenance-planners.spec.js` : regression

Manual checklists (when automation is impractical)

- Real device sanity (iOS/Android) on lead funnel and client login.
- Visual nuance: typography, spacing, and brand colors on top landing pages.
- Exploratory: role switching and unexpected navigation paths.
