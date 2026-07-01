import type { APIRoute } from 'astro';
import { SITE, SITE_IS_LIVE } from '../lib/site';

export const prerender = true;

const LIVE_BODY = `# ${SITE.name} — robots.txt
# Web development + SEO/GEO agency site: open to search engines by
# default, and to AI answer engines by design (this is the whole point
# of the AEO/GEO service line — we want to be crawlable and citable,
# not blocked).

User-agent: *
Allow: /
Disallow: /admin/

# Search engines
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# AI answer engines / AEO — explicitly welcomed
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`;

const STAGING_BODY = `# ${SITE.name} — staging build, not yet live.
# Every crawler is blocked and every page is sent as noindex until
# SITE_IS_LIVE is flipped to true in src/lib/site.ts.
User-agent: *
Disallow: /
`;

export const GET: APIRoute = () => {
  return new Response(SITE_IS_LIVE ? LIVE_BODY : STAGING_BODY, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
};
