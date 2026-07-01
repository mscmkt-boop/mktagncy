// Flip to true only when the site is ready to actually go live on its real
// domain. While false, every page is sent as noindex/nofollow and
// robots.txt disallows all crawlers — this is a staging/testing build.
export const SITE_IS_LIVE = false;

export const SITE = {
  name: 'Legwork',
  legalName: 'Legwork Co, LLC',
  tagline: 'Affordable websites, search visibility, and leads — so you can stay focused on your craft.',
  url: 'https://www.legworkco.com',
  email: 'hello@legworkco.com',
  phone: '+1 (555) 019-2044',
  addressLocality: 'Austin',
  addressRegion: 'TX',
  bookingUrl: 'https://cal.com/legworkco/intro-call',
  // Placeholder — point this at a real form backend (Formspree, Web3Forms, etc.)
  // before launch. Left blank intentionally so the form degrades to a mailto
  // fallback instead of silently failing.
  contactFormEndpoint: '',
  social: {
    linkedin: 'https://www.linkedin.com/company/legworkco',
    x: 'https://x.com/legworkco'
  },
  founded: '2019'
} as const;

export const NAV_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' }
] as const;

export const FOOTER_LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' }
] as const;
