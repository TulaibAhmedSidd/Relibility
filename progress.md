# RQS Website Progress

## Done

- Replaced the starter Next.js page with a reusable, enterprise-style site foundation.
- Created one central content source in `content/site.config.ts`.
- Added typed content models for pages, posts, sections, navigation, and theme data.
- Migrated the main live sitemap route inventory into the new app structure.
- Built a premium homepage with reusable sections for hero, stats, services, industries, process, testimonials, and CTA.
- Added dynamic route rendering for migrated pages and article URLs.
- Added shared SEO metadata helpers plus `sitemap.xml` and `robots.txt`.
- Added MongoDB connection scaffolding for the later CMS/admin phase.
- Added Mongoose models and API routes for `Leads`, `PageContent`, and `ThemeConfig`.
- Added lightweight RFQ lead capture forms and a floating engineering desk support widget.
- Added a first-pass `/admin/leads` dashboard and JSON-LD corporate/founder schema.
- Synced the app header, utility bar, service mega-menu, and service URL coverage to the live RQS navigation structure.
- Added alias route support so legacy/live service URL variants resolve through the same central content source.
- Installed `framer-motion`, `mongodb`, `clsx`, and `tailwind-merge`.

## Remaining In Initial Phase

- Expand each migrated service page with fuller body content from the legacy site.
- Expand each article page with the original long-form content, related links, and richer editorial structure.
- Add dedicated media assets, diagrams, and custom OG images.
- Add stronger internal linking between service pages, case study themes, and articles.
- Audit the live site one more time for any page URLs outside the current sitemap and nav-based migration set.
- Connect live MongoDB credentials and verify end-to-end lead persistence in production.
- Add authenticated status updates on `/admin/leads` instead of read-only badges.

## Later Advanced Phase

- Build the full CRUD admin dashboard.
- Persist content, ordering, visibility, and theme settings in MongoDB.
- Add authentication, authorization, role management, and audit trails.
- Add form handling, inquiry routing, analytics, and media management.
- Add security hardening, validation, rate limiting, and deployment configuration.
