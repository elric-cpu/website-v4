# Agent instructions (scope: this directory and subdirectories)

## Scope and layout

- **This AGENTS.md applies to:** `feature_enhanced/` and below.
- **Key directories:**
  - `src/` (app code)
  - `public/` (static assets)
  - `plugins/` (custom Vite/plugins)
  - `tools/` (build helpers)

## Commands

- **Install:** `npm install`
- **Dev:** `npm run dev` (Vite dev server on port `3000`)
- **Build:** `npm run build`
- **Preview:** `npm run preview`
- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Test:** `npm run test`

## Feature map

| Feature                 | Owner    | Key paths                                                                                                                                 | Entrypoints                                                       | Tests | Docs |
| ----------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----- | ---- |
| commercial-agreements   | frontend | `src/pages/services/commercial/CommercialServiceAgreements.jsx`, `src/components/commercial-agreements/`, `src/lib/commercialAgreements/` | Route: `/services/commercial/service-agreements` in `src/App.jsx` | N/A   | N/A  |
| estimator               | frontend | `src/components/estimator/`, `src/lib/maintenanceEstimator/`                                                                              | Component: `src/components/estimator/EstimatorWizard.jsx`         | N/A   | N/A  |
| maintenance-estimator   | frontend | `src/pages/resources/HomeMaintenanceEstimator.jsx`, `src/components/maintenance-estimator/`, `src/lib/maintenanceEstimator/`              | Route: `/resources/home-maintenance-estimator` in `src/App.jsx`   | N/A   | N/A  |
| residential-maintenance | frontend | `src/pages/services/residential/`, `src/components/residential-maintenance/`, `src/lib/residentialMaintenance/`                           | Route: `/services/residential-maintenance` in `src/App.jsx`       | N/A   | N/A  |
| services                | frontend | `src/pages/services/`, `src/pages/ServicesOverview.jsx`                                                                                   | Route: `/services` in `src/App.jsx`                               | N/A   | N/A  |
| niches                  | frontend | `src/pages/services/niches/`, `src/data/nicheMenus.js`                                                                                    | Route family: `/services/niches/*` in `src/App.jsx`               | N/A   | N/A  |

## Conventions

- Node version is pinned in `.nvmrc` (`20.19.1`).
- `base_code/` is read-only; importing for reference is OK, editing is not.

## Common pitfalls

- Build runs `tools/generate-llms.js` before `vite build` (it’s allowed to fail and continue).

## Do not

- Edit anything under `base_code/`.
