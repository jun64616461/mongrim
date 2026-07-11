import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { FortuneBadge } from '@/components/FortuneBadge';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { JsonLd } from '@/components/JsonLd';
import { RelatedDreams } from '@/components/RelatedDreams';
import { AiTeaser } from '@/components/AiTeaser';
import {
  dreams,
  getDreamBySlug,
  getCategory,
  getRelatedDreams,
  getPopularDreams,
} from '@/lib/dreams';
import {
  buildMetadata,
  dreamArticleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from '@/lib/seo';

export function generateStaticParams() {
  return dreams.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dream = getDreamBySlug(slug);
  if (!dream) return {};
  const cat = getCategory(dream.category);
  return buildMetadata({
    title: `${dream.keyword} 해몽 (${cat.label})`,
    description: `${dream.keyword}의 의미: ${dream.summary} 전통적 해석과 심리학적 관점, 상황별 해몽을 정리했습니다.`,
    path: `/dreams/${dream.slug}`,
    keywords: [dream.keyword, ...dream.aliases, ...dream.tags, '꿈해몽', '해몽'],
    type: 'article',
  });
}

export default async function DreamDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dream = getDreamBySlug(slug);
  if (!dream) notFound();

  const cat = getCategory(dream.category);
  const related = getRelatedDreams(dream, 6);
  const popular = getPopularDreams(6).filter((d) => d.slug !== dream.slug);

  const faqs = [
    {
      q: `${dream.keyword}은 길몽인가요, 흉몽인가요?`,
      a: `${dream.keyword}은 전통적으로 '${dream.fortune}'으로 분류됩니다. ${dream.summary} 다만 같은 꿈이라도 상황과 감정에 따라 해석이 달라질 수 있습니다.`,
    },
    {
      q: `${dream.keyword}의 심리학적 의미는 무엇인가요?`,
      a: dream.psychological.slice(0, 180),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={[
          dreamArticleJsonLd(dream),
          breadcrumbJsonLd([
            { name: '홈', path: '/' },
            { name: '꿈 사전', path: '/dreams' },
            { name: cat.label, path: `/category/${cat.id}` },
            { name: dream.keyword, path: `/dreams/${dream.slug}` },
          ]),
          faqJsonLd(faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: '홈', path: '/' },
          { name: '꿈 사전', path: '/dreams' },
          { name: cat.label, path: `/category/${cat.id}` },
          { name: dream.keyword, path: `/dreams/${dream.slug}` },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_300px]">
        <article className="min-w-0">
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/category/${cat.id}`}
                className="inline-flex items-center gap-1 rounded-full bg-[var(--bg-soft)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-muted)] hover:text-[var(--accent-ink)]"
              >
                <span aria-hidden="true">{cat.emoji}</span> {cat.label}
              </Link>
              <FortuneBadge fortune={dream.fortune} />
            </div>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {dream.keyword} 해몽
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">
              {dream.summary}
            </p>
          </header>

          <AdSlot slot="top" height={100} label="광고" />

          {/* 전통적 해석 */}
          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <span aria-hidden="true" className="text-[var(--moon)]">☾</span>
              전통적 해석
            </h2>
            <p className="mt-3 leading-relaxed">{dream.traditional}</p>
          </section>

          {/* 심리학적 해석 */}
          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <span aria-hidden="true" className="text-[var(--accent)]">✦</span>
              심리학적 해석
            </h2>
            <p className="mt-3 leading-relaxed">{dream.psychological}</p>
          </section>

          <AdSlot slot="middle" height={280} label="광고" />

          {/* 상황별 세부 해석 */}
          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <span aria-hidden="true" className="text-[var(--aurora)]">◈</span>
              상황별 세부 해석
            </h2>
            <div className="mt-4 space-y-3">
              {dream.situations.map((s) => (
                <div key={s.title} className="card p-4">
                  <h3 className="font-bold text-[var(--accent-ink)]">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-muted)]">
                    {s.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* 태그 */}
          <div className="mt-8 flex flex-wrap gap-2">
            {dream.tags.map((t) => (
              <Link
                key={t}
                href={`/tags/${encodeURIComponent(t)}`}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                #{t}
              </Link>
            ))}
          </div>

          <Disclaimer className="mt-8" />

          {/* 관련 꿈 */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold">함께 보면 좋은 꿈</h2>
              <RelatedDreams dreams={related} />
            </section>
          )}

          <div className="mt-10">
            <AiTeaser />
          </div>

          <AdSlot slot="bottom" height={100} label="광고" />
        </article>

        {/* 사이드바 */}
        <aside className="space-y-6">
          <div className="lg:sticky lg:top-20 space-y-6">
            <div className="card p-5">
              <h2 className="mb-3 text-sm font-bold">인기 꿈 키워드</h2>
              <ul className="space-y-2">
                {popular.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={`/dreams/${d.slug}`}
                      className="flex items-center justify-between gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent-ink)]"
                    >
                      <span>{d.keyword}</span>
                      <FortuneBadge fortune={d.fortune} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <AdSlot slot="sidebar" height={600} format="vertical" label="광고" />
          </div>
        </aside>
      </div>
    </div>
  );
}
