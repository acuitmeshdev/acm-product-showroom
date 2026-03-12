import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const products = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/products' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    logo: z.string(),                          // path relative to /public/
    heroImage: z.string().optional(),
    websiteUrl: z.string().url(),
    brandColor: z.string().default('#6366f1'), // hex color

    // Brochure rendering mode
    brochureType: z.enum(['markdown', 'html', 'pdf']).default('markdown'),
    brochureFile: z.string().optional(),       // required for html/pdf, path relative to /public/

    // markdown mode fields
    features: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional(),
    })).optional(),
    specs: z.array(z.object({
      label: z.string(),
      value: z.string(),
    })).optional(),
    pricing: z.array(z.object({
      plan: z.string(),
      price: z.string(),
      period: z.string().default('/month'),
      features: z.array(z.string()),
      highlighted: z.boolean().default(false),
    })).optional(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).optional(),
    videoUrl: z.string().optional(),
    formspreeId: z.string().optional(),

    category: z.string(),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    order: z.number().default(0),
  }),
});

export const collections = { products };
