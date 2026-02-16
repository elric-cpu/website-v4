# Requirements -> Tests Map

| Req ID | Requirement                                                      | Automated Test                                                                 | Manual fallback                           |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------- |
| R1     | Public lead capture funnel validates required fields and submits | `tests/unit/submitCommercialAgreementLead.spec.ts` + `e2e/public-lead.spec.ts` | Verify analytics + CRM routing in staging |
| R2     | Auth signup creates session + routes by role                     | `e2e/auth.spec.ts`                                                             | Verify email confirmation flow            |
| R3     | Auth login redirects to correct portal and enforces role         | `tests/unit/ProtectedRoute.spec.tsx` + `e2e/auth.spec.ts`                      | Verify SSO providers                      |
| R4     | Auth session restores on refresh                                 | `e2e/auth.spec.ts` (session mock)                                              | Cross-device session invalidation         |
| R5     | Client portal loads documents + invoices for own tenant only     | `tests/integration/portalData.spec.ts`                                         | Production RLS verification               |
| R6     | Client portal CRUD (upload/delete) produces notification         | `e2e/portal-client-crud.spec.ts`                                               | Real storage + scan in staging            |
| R7     | RBAC blocks access to disallowed routes                          | `tests/unit/ProtectedRoute.spec.tsx`                                           | Manual role audit                         |
| R8     | Input validation rejects malformed email/phone                   | `tests/unit/validators.spec.ts`                                                | Manual exploratory                        |
| R9     | No external network calls after setup                            | `e2e/*.spec.ts` network guard                                                  | N/A                                       |
