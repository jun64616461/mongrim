import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DreamCard } from '@/components/DreamCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Disclaimer } from '@/components/Disclaimer';
import { JsonLd } from '@/components/JsonLd';
import { SectionTitle } from '@/components/RelatedDreams';
import { getAllTags, getDreamsByTag } from '@/lib/dreams';
import { getAllPostMeta } from '@/lib/posts';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  const dreamTags = getAllTags().map((t) => t.tag);
  const postTags = getAllPostMeta().flatMap((p) => p.tags);
  const all = [...new Set([...dreamTags, ...postTags])];
  return all.map((tag) => ({ tag: encodeURIComponent(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return buildMetadata({
    title: `‘${decoded}’ 태그의 꿈과 글`,
    description: `‘${decoded}’와 관련된 꿈 해몽과 가이드 글을 모았습니다.`,
    path: `/tags/${tag}`,
  });
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const dreamItems = getDreamsByTag(decoded);
  const postItems = getAllPostMeta().filter((p) => p.tags.includes(decoded));

  if (dreamItems.length === 0 && postItems.length === 0) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '꿈 사전', path: '/dreams' },
          { name: `#${decoded}`, path: `/tags/${tag}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: '홈', path: '/' },
          { name: '꿈 사전', path: '/dreams' },
          { name: `#${decoded}`, path: `/tags/${tag}` },
        ]}
      />

      <div className="mt-4">
        <SectionTitle sub={`‘${decoded}’와 관련된 꿈 ${dreamItems.length}개 · 글 ${postItems.length}편`}>
          #{decoded}
        </SectionTitle>
      </div>

      {dreamItems.length > 0 && (
        <section>
          <h2 className="mb-4 text-lg font-bold">관련 꿈 해몽</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {dreamItems.map((d) => (
              <DreamCard key={d.slug} dream={d} />
            ))}
          </div>
        </section>
      )}

      {postItems.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-bold">관련 가이드 글</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {postItems.map((p) => (
              <Link
                key={p.slug}
                href={`/guides/${p.slug}`}
                className="card group p-5 transition hover:border-[var(--accent)]"
              >
                <span className="text-xs font-medium text-[var(--accent-ink)]">{p.category}</span>
                <h3 className="mt-1 font-bold group-hover:text-[var(--accent-ink)]">{p.title}</h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-[var(--text-muted)]">{p.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Disclaimer className="mt-10" />
    </div>
  );
}
