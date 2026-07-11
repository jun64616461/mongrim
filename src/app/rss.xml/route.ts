import { site } from '@/lib/site';
import { getAllPostMeta } from '@/lib/posts';
import { dreams } from '@/lib/dreams';

export const dynamic = 'force-static';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const posts = getAllPostMeta();
  const postItems = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${site.url}/guides/${p.slug}</link>
      <guid>${site.url}/guides/${p.slug}</guid>
      <description>${escapeXml(p.description)}</description>
      <category>${escapeXml(p.category)}</category>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
    </item>`,
    )
    .join('\n');

  const dreamItems = dreams
    .slice(0, 30)
    .map(
      (d) => `    <item>
      <title>${escapeXml(d.keyword)} 해몽</title>
      <link>${site.url}/dreams/${d.slug}</link>
      <guid>${site.url}/dreams/${d.slug}</guid>
      <description>${escapeXml(d.summary)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.fullName)}</title>
    <link>${site.url}</link>
    <description>${escapeXml(site.description)}</description>
    <language>ko-KR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${postItems}
${dreamItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
