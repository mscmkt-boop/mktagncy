# Sparkline — SEO & AEO/GEO Agency Site

Static-generated marketing site for Sparkline, a full-service SEO agency with AI search visibility (AEO/GEO) as a differentiator. Built with Astro, Tailwind CSS v4, and git-based Markdown/MDX content collections — zero database, zero server required at runtime.

## Stack

- **Astro 7** (static output, islands only where genuinely interactive)
- **Tailwind CSS v4** (`@tailwindcss/vite`, no separate config file — theme lives in `src/styles/global.css`)
- **Content Collections** (`src/content.config.ts`) for blog posts, case studies, and services — all Markdown/MDX, versioned in this repo
- **@astrojs/sitemap** and **@astrojs/mdx** integrations
- No client-side framework (React/Vue/etc.) — the two interactive bits (mobile nav toggle, case-study industry filter) are small vanilla `<script>` blocks scoped to their component. FAQ accordions use native `<details>/<summary>`, so they work with zero JS.

## Local development

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs static site to ./dist
npm run preview   # serve the production build locally
```

Requires Node 22.12+.

## Project structure

```
src/
├── content.config.ts       # Zod schemas for blog, case-studies, services
├── content/
│   ├── blog/                # 4 starter posts (MDX)
│   ├── case-studies/        # 3 case studies (MD)
│   └── services/            # 11 service pages (MD)
├── components/               # Header, Footer, Seo, Breadcrumbs, FaqBlock, StatCard, etc.
├── layouts/
│   ├── BaseLayout.astro      # HTML shell, meta/OG/JSON-LD via <Seo>
│   └── ArticleLayout.astro   # Blog post wrapper (BlogPosting schema)
├── lib/site.ts               # Single source of truth for brand name, nav, contact info
└── pages/                    # File-based routing, incl. dynamic [slug].astro for services/case studies/blog
```

## Content model

All content is Markdown/MDX with frontmatter validated by Zod (`src/content.config.ts`). To add a new service, blog post, or case study, drop a new file into the matching `src/content/*` folder — no code changes needed for a new page to appear (services and blog get auto-generated routes; the homepage and services index auto-list every entry).

- **Blog** (`src/content/blog/`): title, description, author, publishDate, category (enum), tags, optional `faq[]` (renders as an accordion + `FAQPage` schema when present), optional `relatedPosts`.
- **Case studies** (`src/content/case-studies/`): clientName (anonymize-friendly), industry, challenge/approach (strings), `metrics[]` (structured, not prose), optional testimonial.
- **Services** (`src/content/services/`): name, shortDescription, icon (enum matched to `src/components/Icon.astro`), order (controls nav/grid ordering), `deliverables[]`, `relatedCaseStudies[]` (slugs), optional `faq[]`.

The FAQ field is present in the schema for every content type per the brief, even though the four starter blog posts mostly leave it empty — it's there so an AEO-focused content pass can populate it later without a schema migration.

### Adding a non-technical editor later

Content is plain files in this repo today (no CMS). If a non-technical editor needs a UI later, **Decap CMS** (git-based, config-only, no backend to run) is the lowest-effort add — it reads/writes these same Markdown files via GitHub's API. Wire it up by adding a `public/admin/config.yml` mapping to these three collections; no change to the Astro side is needed since content stays in the same files either way.

## Deployment

The build output (`npm run build` → `dist/`) is a fully static folder: HTML, CSS, JS, and a sitemap, with no server-side runtime dependency. That means:

- **Vercel (recommended)**: connect the GitHub repo, framework preset "Astro" is auto-detected, zero config needed. Auto-deploys on push.
- **Netlify / Cloudflare Pages**: same static-export deployment model, build command `npm run build`, publish directory `dist`.
- **Manual / FTP fallback**: run `npm run build` locally and upload the contents of `dist/` to any static host (e.g. Hostinger) via FTP/SFTP. No code changes required — verified by running the build and serving `dist/` directly with `npm run preview`.

Before going live, update `site:` in `astro.config.mjs` and the constants in `src/lib/site.ts` (`SITE.url`, email, phone, social links, booking URL) to the real production domain and contact details — they're currently placeholders (`sparklineseo.com`).

## SEO / AEO implementation notes

- JSON-LD is emitted per page type: `ProfessionalService` (home), `Service` (service pages), `BlogPosting` (posts), `FAQPage` (anywhere an FAQ block renders), `BreadcrumbList` (every page below the homepage). Verified structurally against schema.org required properties; re-validate on the live domain with [Google's Rich Results Test](https://search.google.com/test/rich-results) once deployed, since it requires a public URL.
- `sitemap-index.xml` and `robots.txt` are generated/included automatically; canonical, Open Graph, and Twitter Card tags are set on every page via `src/components/Seo.astro`.
- Every page has exactly one `<h1>` with no skipped heading levels; skip-to-content link, visible focus states, and labeled form fields are in from the base layout, not retrofitted.

## Lighthouse results

Run against the production build (`npm run build && npm run preview`) with `npx lighthouse`. Full HTML report for the homepage: [`lighthouse/homepage-report.html`](lighthouse/homepage-report.html) (raw JSON alongside it).

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Homepage | 100 | 100 | 100 | 100 |
| Service detail (AEO/GEO) | 100 | 100 | 100 | 100 |
| Blog post | 100 | 100 | 100 | 100 |
| Case studies (filter UI) | 100 | 100 | 100 | 100 |
| Contact (form) | 100 | 100 | 100 | 100 |

LCP ~0.9s, CLS 0, TBT 0ms on the homepage locally — well inside the "good" Core Web Vitals thresholds. Re-run Lighthouse against the live production URL after deploy, since real-world network/CDN conditions will differ from local `preview`.

## Known gaps / flagged for follow-up

These are intentional placeholders, not bugs — flagging per the brief's "flag anything you can't resolve automatically" instruction:

1. **OG image is SVG** (`public/og-default.svg`). Some platforms (notably Facebook/LinkedIn) don't reliably render SVG for `og:image`. Swap in a rasterized 1200×630 PNG/JPG before launch — I can't generate real brand photography/renders in this environment.
2. **Contact form has no live backend.** `src/lib/site.ts` → `contactFormEndpoint` is intentionally blank, so the form currently falls back to a `mailto:` link on submit instead of silently failing. Point it at a real form backend (Formspree, Web3Forms, etc. — anything that accepts a `FormData` POST) to get structured submissions instead.
3. **About page team bios are placeholders** (fictional names/roles) to prove the section design — replace with the real team before launch.
4. **Case studies are anonymized/illustrative**, built to validate the metrics-first template and Case Study schema structure. Swap in real client data (or keep anonymized, the schema supports both) before launch.
5. **Blog posts (4 starter posts) are structural placeholders**, per the brief — short by design, FAQ blocks mostly empty. A later content pass should deepen these and add AEO-specific entity/FAQ work.
6. **Booking link and social URLs** (`SITE.bookingUrl`, `SITE.social`) point to placeholder URLs — wire up to the real Cal.com/LinkedIn/X accounts.
7. **Analytics is not wired in** (no GA4/GTM snippet included) — intentionally, since adding tracking scripts is a decision the client should make explicitly (and it affects the Lighthouse best-practices/performance score). Add via a `<script>` in `BaseLayout.astro` when ready.
