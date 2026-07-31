# Admin Screens 05, 16–21 Merge Audit

## Audit outcome

- Destination: `frontend` (Next.js 14 App Router, React 18, TypeScript, npm).
- Existing security boundary retained: the single `/admin` layout continues to wrap every screen with `AdminRouteGuard` and `AdminShell`.
- Existing navigation, authentication context, logout flow, toast host, responsive shell, and backend proxy conventions were reused.
- Screen 16 was already a complete byte-equivalent implementation of its source project, so it was preserved instead of duplicated.
- Screen 05 and Screen 17 existed in reduced form and were upgraded in place.
- Screens 18–21 were missing and were added under the existing admin route tree.
- No dependency was added. The destination already provides every runtime package used by the seven source screens.
- Source projects for Screens 18/19 and 20/21 overlap. Screen 19 was used as the canonical analytics source because it contains both the dashboard and report drill-down graph. Screen 21 was used as the canonical ecosystem source because it contains both the module dashboard and module detail graph.

## Source projects reviewed

1. `Admin-Dashboard-feature-admin-brand-authorization-screen-05`
2. `Admin-Dashboard-feature-admin-ecosystem-module-configuration-screen-21`
3. `Admin-Dashboard-feature-admin-ecosystem-modules-dashboard-screen-20`
4. `Retail-Eco-Admin--feature-admin-analytics-bi-dashboard-screen-18`
5. `Retail-Eco-Admin--feature-admin-analytics-report-detail-screen-19`
6. `Retail-Eco-Admin--feature-admin-customer-support-operations-screen-16`
7. `Retail-Eco-Admin--feature-admin-customer-support-operations-screen-17`

All seven frontend directories and their package manifests were validated before integration.

## Integrated route map

| Screen | Route | Result |
| --- | --- | --- |
| 05 | `/admin/verification/brand-authorizations/[authorizationId]` | Full authorization review detail |
| 16 | `/admin/customer-support/cases` | Preserved existing full operations dashboard |
| 17 | `/admin/customer-support/cases/[caseId]` | Full 12-tab case workspace |
| 18 | `/admin/analytics` | Analytics and BI dashboard |
| 19 | `/admin/analytics/reports/[reportId]` | Registry-driven report detail |
| 19 index | `/admin/analytics/reports` | Report catalogue/entry route |
| 20 | `/admin/ecosystem-modules` | Ecosystem module dashboard |
| 21 | `/admin/ecosystem-modules/[moduleId]` | Full module configuration workspace |

Analytics and Ecosystem Modules are now enabled in the existing admin sidebar. Detail pages remain reachable from their parent workspace rather than adding redundant sidebar entries.

## Integration safeguards

- No second admin shell, auth provider, navigation tree, or toast host was introduced.
- Unknown support cases and ecosystem modules return controlled not-found states; they are not replaced with fabricated fallback records.
- Report aliases map all Screen 18 drill-down actions to valid Screen 19 report registry entries.
- `returnTo` values are sanitized before they become links, including report breadcrumbs, support details, and ecosystem details.
- Screen 17 mutations use the existing mock service boundary and write audit events to its in-memory fixture store.
- Imported mojibake in user-visible dates, separators, arrows, names, and labels was normalized to valid UTF-8.

## Backend contracts still to connect

The merged services intentionally preserve mock data until matching Laravel endpoints exist. They are isolated behind service modules so UI components do not need to change when the API is connected.

### Brand authorization

- `GET /api/admin/verification/brand-authorizations/{authorizationId}`
  - Auth: authenticated admin with brand-authorization review permission.
  - Response: `BrandAuthorizationDetail`.
- `POST /api/admin/verification/brand-authorizations/{authorizationId}/decisions`
  - Body: decision, reason, evidence/notes, confirmation metadata.
  - Response: updated decision/audit state.

### Customer support

- `GET /api/admin/customer-support/cases` with queue, search, status, priority, SLA, assignment, date, and pagination query parameters.
- `POST /api/admin/customer-support/cases`, `/bulk-assign`, `/bulk-response`, and `/export`.
- `GET /api/admin/customer-support/cases/{caseId}` returning `CaseDetailFullData`.
- `POST /api/admin/customer-support/cases/{caseId}/messages` and `/internal-notes`.
- `PATCH /api/admin/customer-support/cases/{caseId}` for assignment, priority, escalation, resolution, and closure.
- `PATCH /api/admin/customer-support/cases/{caseId}/checklist/{itemId}`.
- Auth: authenticated support/admin permission; sensitive internal notes and controlled actions require the appropriate elevated permission.

### Analytics

- `GET /api/admin/analytics` with reporting period, comparison, region, channel, customer, supplier, category, brand, fulfilment, payment, and saved-view filters.
- `GET /api/admin/analytics/reports/{reportId}` and `/records` with filter, sort, search, and pagination parameters.
- `POST /api/admin/analytics/reports/{reportId}/exports` and `/schedules`.
- Auth: authenticated analytics permission, with finance/customer/compliance fields filtered by backend permissions.

### Ecosystem modules

- `GET /api/admin/ecosystem-modules` with status, lifecycle, category, owner, risk, health, environment, search, sort, and pagination parameters.
- `POST /api/admin/ecosystem-modules` for controlled registration.
- `GET /api/admin/ecosystem-modules/{moduleId}`.
- Controlled `PATCH`/`POST` endpoints for configuration, versions, environments, dependencies, integrations, feature flags, countries, access roles, reviews, release scheduling, production enablement, suspension, retirement, and secret rotation.
- Auth: authenticated ecosystem administration permission; high-impact actions require backend authorization and audit logging.

All mutation responses should return the updated resource plus an immutable audit reference. Secrets must never be returned after submission.

## Verification commands

Run from `frontend`:

```powershell
npm run type-check
npm run lint
npm test -- --pool=threads --maxWorkers=1 --no-file-parallelism
npm run build
```

The explicit Vitest thread options avoid a worker-process deadlock observed on this Windows environment; they do not change test behavior.

## Verification result

- `npm run type-check`: passed.
- `npm run lint`: passed with no warnings or errors.
- Full Vitest suite: 18 files passed, 137 tests passed.
- `npm run build`: passed; Next.js generated all seven integrated routes.
- Live unauthenticated route probe: every integrated admin route returned HTTP 307 to `/login` with an encoded internal destination, confirming the existing server-side admin boundary remains active.
- Interactive browser verification remains outstanding because no in-app browser surface was attached to the execution session. The implementation is not represented as manually verified.
