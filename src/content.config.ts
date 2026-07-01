import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const faqEntry = z.object({
  question: z.string(),
  answer: z.string()
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(160),
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),
      author: z.string().default('Legwork Editorial Team'),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum([
        'Technical SEO',
        'Content Strategy',
        'AEO/GEO',
        'Local SEO',
        'Analytics',
        'Link Building',
        'Web Development'
      ]),
      tags: z.array(z.string()).default([]),
      faq: z.array(faqEntry).default([]),
      relatedPosts: z.array(z.string()).default([]),
      draft: z.boolean().default(false)
    })
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    clientName: z.string(),
    anonymized: z.boolean().default(false),
    industry: z.string(),
    summary: z.string().max(200),
    challenge: z.string(),
    approach: z.string(),
    services: z.array(z.string()).default([]),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          detail: z.string().optional()
        })
      )
      .min(1),
    testimonial: z
      .object({
        quote: z.string(),
        author: z.string(),
        role: z.string()
      })
      .optional(),
    publishDate: z.coerce.date(),
    featured: z.boolean().default(false)
  })
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    name: z.string(),
    shortDescription: z.string().max(160),
    icon: z.enum([
      'wrench',
      'document',
      'link',
      'map-pin',
      'pencil',
      'shopping-cart',
      'sparkles',
      'chart-bar',
      'code-bracket',
      'bolt',
      'magnifying-glass',
      'browser',
      'refresh'
    ]),
    pillar: z.enum(['Web Development', 'SEO & AI Search Visibility']),
    order: z.number(),
    deliverables: z.array(z.string()).min(1),
    relatedCaseStudies: z.array(z.string()).default([]),
    faq: z.array(faqEntry).default([])
  })
});

export const collections = { blog, caseStudies, services };
