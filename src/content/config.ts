import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    date: z.string(),
    category: z.enum(['Bipedal & Isaac Lab', 'VLA & Manipulation', 'AMR & SLAM']),
    featured: z.boolean().default(true),
    order: z.number(),
    simEngine: z.string(),
    middleware: z.string(),
    hardware: z.string(),
    tags: z.array(z.string()),
    metrics: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    ),
    videoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    quickCommand: z.string().optional(), // Copyable terminal snippet inside the drawer
    architectureSteps: z.array(z.string()),
  }),
});

// Ready for future papers — just create src/content/publications/*.md later!
const publicationsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number(),
    pdfUrl: z.string().optional(),
    arxivUrl: z.string().optional(),
    codeUrl: z.string().optional(),
    bibtex: z.string().optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  publications: publicationsCollection,
};