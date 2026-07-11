import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { dreams, categories, getAllTags } from '@/lib/dreams';
import { getAllPostMeta } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = site.url;

  const staticRoutes = [
    '', '/dreams', '/guides', '/search', '/about', '/contact',
    '/privacy', '/terms', '/faq',
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: p === '' ? 1 : 0.7,
  }));

  const dreamRoutes = dreams.map((d) => ({
    url: `${base}/dreams/${d.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${base}/category/${c.id}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const tagRoutes = getAllTags().map((t) => ({
    url: `${base}/tags/${encodeURIComponent(t.tag)}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.4,
  }));

  const postRoutes = getAllPostMeta().map((p) => ({
    url: `${base}/guides/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dreamRoutes, ...categoryRoutes, ...tagRoutes, ...postRoutes];
}
