# Vedantix migration audit

Source of truth: `rishwijagesar/vedantix` / `main`.
Migration branch: `lovable-migration`.
Draft validation PR: `#5`.
Connected Lovable repository: `rishwijagesar/vedantix-frontend-mirror` / `main`.
Lovable project: `Vedantix Frontend Mirror` (`1a802d37-67b8-4407-98f6-913af6f7a354`).

## Rules

- Public frontend must remain visually unchanged.
- `/admin`, CRM, old customer portal and Base44 auth/backoffice are excluded.
- Production (`main` -> AWS S3/CloudFront) must not be changed by migration work.
- No new database/Supabase until the backend is redesigned.
- Do not merge the migration branch or change production DNS until route/function/visual parity is verified.

## Migration status

The controlled migration branch builds as a regular React/Vite application without Base44 runtime or build dependencies.

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
- old customer portal navigation/configuration.
- unused backoffice hooks and API clients.
- remaining Base44 scaffold files such as `pages.config.js`.

The package lock was regenerated and contains no `@base44` packages.
A recursive branch file scan also contains no Base44/OAuth/customer-portal implementation files.

## Source/layout parity

A Git comparison against the production base confirms that the migration cleanup did not modify the normal public page components, public shared presentation components or page-specific CSS. Changes are restricted to routing, build/dependency configuration, the temporary planning adapter, documentation and deletion of old backoffice code.

### Controlled Vite-build browser comparison

A temporary GitHub Actions job built `lovable-migration`, served that build locally and captured full-page Chromium screenshots against the live `https://vedantix.nl` production site.

Checked routes:

- `/`
- `/prijzen`
- `/resultaten`
- `/contact`
- `/faq`
- `/online-groei-audit`
- `/ai-vindbaarheid`
- `/blog`

Checked viewports:

- desktop: 1440x1000
- mobile: 390x844

Result:

- 15 of 16 production/migration screenshot pairs were pixel-identical.
- The remaining homepage difference was isolated to timing/loading state in the external review widget.
- The Vedantix-owned layout, typography, spacing and surrounding sections were unchanged.

The temporary visual-comparison workflow was removed again after the artifact was captured.

## Connected Lovable mirror

Lovable is now connected to `rishwijagesar/vedantix-frontend-mirror`, branch `main`, using its native TanStack Start stack. Production remains unpublished and unchanged.

The Lovable conversion was checked internally against `https://vedantix.nl` on the same eight core routes at desktop 1440x1000 and mobile 390x844. The check found matching header/navigation, hero, headings, section order, CTA labels, widths, colors and footer links. Page-height variation stayed within 5% and was attributable to lazy/dynamic content.

One real CSS token difference was found after the Tailwind v3 -> v4 conversion: the body fallback font stack. `src/vedantix-base.css` in the Lovable mirror now explicitly uses the same computed production stack:

`ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`

No page markup, layout or page-specific CSS was changed for this correction.

### Lovable route parity corrections

The initial Lovable catch-all redirected unknown paths to `/`, which dropped the public `/:previewSlug` behavior. This has been corrected:

- `src/api/preview.api.js` is present in the Lovable repository and uses the existing public Vedantix API.
- `src/pages/CustomerPreviewPage.jsx` is present with only TanStack compatibility imports/parameter handling adapted.
- exactly one unknown URL segment is treated as `previewSlug`;
- unknown multi-segment paths still redirect to `/`;
- `/pakketvergelijking` still redirects to `/prijzen#vergelijk`.

A fake preview slug was browser-tested and entered the preview flow instead of redirecting to the homepage, ending in the expected preview error UI when no preview could be loaded.

A later static route audit found one additional collision caused by the single-segment preview fallback. The retired legacy routes `/login`, `/klantenportaal`, `/ClientPortal`, `/CRM` and `/admin` are now explicitly reserved to redirect to `/`, matching the old React Router behavior rather than being interpreted as customer-preview slugs. Multi-segment retired backoffice paths continue to fall through to the homepage wildcard.

## Public functionality that must be preserved

### Normal public pages

All public pages/routes from `src/App.jsx`, including home, pricing, results, contact, FAQ, AI visibility, audit, blog and industry/city routes remain represented in the Lovable/TanStack router.

The public page components and their page-specific CSS were deliberately not redesigned during the backend cleanup or Lovable conversion.

### Customer preview route

`/:previewSlug` remains public functionality.
It uses `CustomerPreviewPage` + `preview.api.js` and the public Vedantix API (`/api/preview/:slug` and `/api/preview/:slug/html`), not the Base44 SDK.

### Pricing

Pricing pages use the public Vedantix API through `src/api/client.js` and `src/api/pricing.api.js`. This integration remains present in the Lovable mirror.

### Online Growth Audit

The audit page uses the public Vedantix API through `src/api/client.js` and `src/api/onlineGrowthAudit.api.js`. This integration remains present in the Lovable mirror.

### Planning

`/planning` was the only confirmed public page that directly used Base44 entities (`Availability` and `Appointment`).

For the migration/Lovable build, `src/api/entities.js` is a temporary compatibility adapter:

- reads return the current effectively-empty state;
- appointment writes fail closed instead of reconnecting to Base44;
- the existing planning page markup/layout is unchanged.

The old Base44 availability data was effectively empty, so this preserves the current practical public behavior: no selectable appointment slots. The redesigned appointment backend can be added later without bringing the old Base44 backoffice back.

## Lovable same-origin public API proxy

The Lovable/TanStack build no longer depends on browser CORS access to `api.vedantix.nl`.

`src/server.ts` in `rishwijagesar/vedantix-frontend-mirror` proxies only these public API families to `https://api.vedantix.nl`:

- `/api/pricing`;
- `/api/audit` and subpaths;
- `/api/preview` and subpaths.

The browser-side `src/api/client.js` defaults to the same-origin base (`""`) in Lovable. `VITE_API_BASE_URL` remains available as an explicit development/debug override.

The proxy uses an allow-list of public request headers and does not forward browser cookies, authorization headers or the browser Origin. Upstream `Set-Cookie` and CORS response headers are not reflected to the browser.

### End-to-end proxy smoke test

A temporary GitHub Actions workflow built the actual Lovable/TanStack repository, started its dev server and called the same-origin endpoints through `src/server.ts`.

Results:

- `GET /api/pricing` -> **200**, `application/json; charset=utf-8`, with real Vedantix package data from the upstream API.
- `GET /api/preview/nonexistent-migration-smoke/html` -> **404**, body `Preview not found`, proving the request reached the upstream preview API rather than the application-router fallback.
- `OPTIONS /api/audit` -> **204 No Content**, proving the audit proxy family reaches the upstream service without a proxy/runtime error.
- the TanStack production build and local server both succeeded.

The temporary smoke-test workflow was removed after the successful run.

## SEO / AI discovery files

The connected Lovable repository preserves the production versions of:

- `public/robots.txt`;
- `public/sitemap.xml`;
- `public/llms.txt`;
- `public/llms-full.txt`.

Their Git blob hashes match the controlled migration source. `public/.well-known/llms.txt`, which was omitted by the initial Lovable conversion, has also been restored from the controlled source.

## Remaining cutover condition

Do not point `vedantix.nl` at Lovable yet.

The code-level migration, route parity, visual parity, static discovery files and public API proxy have now been validated. `/planning` preserves the current practical no-slots behavior and no longer needs to block the frontend migration.

The remaining cutover step is one final smoke/parity test on an externally reachable Lovable deployment (without the private editor/login boundary). After that succeeds, hosting/domain routing can be changed deliberately.

The original production `main` branch and AWS deployment remain untouched by this migration work.
