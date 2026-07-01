---
name: "Core Web Vitals & Site Performance"
shortDescription: "LCP, CLS, and INP work that improves both ranking signals and actual conversion rate."
icon: "bolt"
pillar: "SEO & AI Search Visibility"
order: 10
deliverables:
  - "Core Web Vitals audit (field and lab data) across key templates"
  - "Image optimization and modern format (WebP/AVIF) conversion"
  - "JavaScript payload reduction and third-party script audit"
  - "Layout shift elimination for ads, embeds, and web fonts"
  - "Ongoing CWV monitoring and regression alerting"
relatedCaseStudies:
  - "multi-location-retailer-local-search"
faq:
  - question: "Are Core Web Vitals a major ranking factor?"
    answer: "They're one input among many, generally acting as a tie-breaker between otherwise similarly relevant pages rather than a dominant factor on their own. Their bigger, more consistent impact is on conversion rate and bounce rate, which is why we treat them as a business metric, not just an SEO checkbox."
  - question: "What usually causes the worst Core Web Vitals scores?"
    answer: "Unoptimized hero images, render-blocking third-party scripts (chat widgets, tag managers, ad tech), and web fonts or ads loading without reserved space are the most common causes we find, in roughly that order of impact."
---

Core Web Vitals — Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Interaction to Next Paint (INP) — measure how fast a page loads, how stable the layout is while it loads, and how responsive it feels once a user starts interacting with it.

## The business case is bigger than the ranking case

Core Web Vitals affect search rankings modestly. They affect conversion rate substantially — a slow, jumpy page loses visitors before they ever act, regardless of how well it ranks. We treat this work as a revenue lever first and a ranking signal second, which tends to make the business case for prioritizing it much easier internally.

## Where the gains usually come from

In practice, the biggest wins come from a small number of fixes: converting and properly sizing images (WebP/AVIF with responsive `srcset`), auditing third-party scripts that block rendering, and reserving layout space for anything that loads asynchronously — ads, embeds, web fonts — so it doesn't shift content after the fact. We prioritize fixes by projected impact on the specific templates driving the most traffic, not a generic checklist applied evenly across the whole site.
