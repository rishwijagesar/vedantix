# Vedantix migration audit

Source of truth: `rishwijagesar/vedantix` / `main`.
Migration branch: `lovable-migration`.
Draft validation PR: `#5`.

## Rules

- Public frontend must remain visually unchanged.
- `/admin`, CRM, old customer portal and Base44 auth/backoffice are excluded.
- Production (`main` -> AWS S3/CloudFront) must not be changed by migration work.
- No new database/Supabase until the backend is redesigned.
- Do not merge the migration branch until route/function/visual parity is verified.

## Migration status

The migration branch now builds as a regular React/Vite application without Base44 runtime or build dependencies.

Validated on CI:

- `npm ci` passes.
- lint passes.
- typecheck passes.
- production build passes.
- high/critical production dependency audit passes.

Removed from the migration branch:

- `@base44/sdk`.
- `@base44/vite-plugin`.
- the `base44/` backend/functions directory.
- Base44 auth/OAuth pages and helpers.
- old `/admin`, CRM and customer-portal frontend code.
- unused backoffice hooks and API clients.

The package lock was regenerated and contains no `@base44` packages.

## Public functionality that must be preserved

### Normal public pages

All public pages/routes from `src/App.jsx`, including home, pricing, results, contact, FAQ, AI visibility, audit, blog and industry/city routes remain in the migration router.

The public page components and their page-specific CSS were deliberately not redesigned during the backend cleanup.

### Customer preview route

`/:previewSlug` is public functionality and remains available on the migration branch.
It uses `src/pages/CustomerPreviewPage.jsx` + `src/api/preview.api.js` and the public Vedantix API (`/api/preview/:slug`), not the Base44 SDK.

### Pricing

Pricing pages use the public Vedantix API through `src/api/client.js` and `src/api/pricing.api.js`. This integration remains present.

### Online Growth Audit

The audit page uses the public Vedantix API through `src/api/client.js` and `src/api/onlineGrowthAudit.api.js`. This integration remains present.

### Planning

`/planning` was the only confirmed public page that directly used Base44 entities (`Availability` and `Appointment`).

For the migration branch, `src/api/entities.js` is now a temporary compatibility adapter:

- reads return the current effectively-empty state;
- appointment writes fail closed instead of reconnecting to Base44;
- the existing planning page markup/layout is unchanged.

The appointment backend must be redesigned/reconnected before planning can accept real bookings after cutover.

## Current Lovable mirror

The existing Lovable mirror was generated before this GitHub cleanup and is not the current source of truth. In particular, it dropped the public `/:previewSlug` route.

Use the `lovable-migration` GitHub branch as the next import/sync source rather than continuing to patch the old Lovable-generated code.

## Cutover conditions

Do not point `vedantix.nl` at a new host until all of the following are verified:

1. public route and redirect parity;
2. visual parity at desktop, tablet and mobile sizes;
3. customer preview functionality;
4. pricing API functionality;
5. Online Growth Audit functionality;
6. intended behavior for `/planning`;
7. SEO metadata, sitemap, robots and AI discovery files;
8. a final production-like build/preview test.
