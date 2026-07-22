import type { MetadataRoute } from 'next';

// Content pages only. URLs use the apex host to match metadataBase, canonical
// tags and the structured data.
const BASE = 'https://greenstarsolar.co.uk';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{ path: string; priority: number }> = [
    { path: '/', priority: 1.0 },
    { path: '/solar-panels-home', priority: 0.9 },
    { path: '/solar-panels-business', priority: 0.9 },
    { path: '/battery-storage-home', priority: 0.9 },
    { path: '/battery-storage-business', priority: 0.9 },
    { path: '/ev-charging', priority: 0.9 },
    { path: '/case-studies', priority: 0.7 },
    { path: '/gallery', priority: 0.6 },
  ];
  return pages.map((p) => ({
    url: `${BASE}${p.path === '/' ? '' : p.path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: p.priority,
  }));
}
