export const SITE = {
  name: 'Sparkline',
  legalName: 'Sparkline SEO, LLC',
  tagline: 'SEO and AI search visibility that shows up in the numbers, not just the rankings.',
  url: 'https://www.sparklineseo.com',
  email: 'hello@sparklineseo.com',
  phone: '+1 (555) 019-2044',
  addressLocality: 'Austin',
  addressRegion: 'TX',
  bookingUrl: 'https://cal.com/sparklineseo/intro-call',
  // Placeholder — point this at a real form backend (Formspree, Web3Forms, etc.)
  // before launch. Left blank intentionally so the form degrades to a mailto
  // fallback instead of silently failing.
  contactFormEndpoint: '',
  social: {
    linkedin: 'https://www.linkedin.com/company/sparklineseo',
    x: 'https://x.com/sparklineseo'
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
