# Vedantix migration audit

Source of truth: `rishwijagesar/vedantix` / `main`.
Migration branch: `lovable-migration`.

## Rules

- Public frontend must remain visually unchanged.
- `/admin`, CRM, old customer portal and Base44 auth/backoffice are excluded.
- Production (`main` -> AWS S3/CloudFront) must not be changed by migration work.
- No new database/Supabase until the backend is redesigned.

## Public functionality that must be preserved

### Normal public pages

All public pages/routes from `src/App.jsx`, including home, pricing, results, contact, FAQ, AI visibility, audit, blog and industry/city routes.

### Customer preview route

`/:previewSlug` is public functionality and must remain available.
It uses `src/pages/CustomerPreviewPage.jsx` + `src/api/preview.api.js` and the public Vedantix API (`/api/preview/:slug`), not the Base44 SDK.

### Pricing

Pricing pages use the public Vedantix API through `src/api/client.js` and `src/api/pricing.api.js`. Preserve this integration during migration.

### Online Growth Audit

The audit page uses the public Vedantix API through `src/api/client.js` and `src/api/onlineGrowthAudit.api.js`. Preserve this integration during migration.

### Planning

`/planning` still uses `Availability` and `Appointment` from `src/api/entities.js`, which currently map to the Base44 SDK. This is the main public Base44 dependency that still needs a replacement backend/API before Base44 can be removed completely.

## Current Lovable mirror known issue

The current Lovable mirror redirects unknown paths to `/` and therefore dropped `/:previewSlug`. This is a migration bug and must be restored before cutover.

## Cutover condition

Do not point `vedantix.nl` at Lovable until public route parity, visual parity at desktop/tablet/mobile, preview functionality, pricing, audit and planning are verified.
