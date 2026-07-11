import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { JsonLd } from '@/components/JsonLd';
import { Toc } from '@/components/Toc';
import {
  getPostSlugs,
  getPost,
  getPostMeta,
  getRelatedPosts,
} from '@/lib/posts';
import {
  buildMetadata,
  postArticleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from '@/lib/seo';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const meta = getPostMeta(slug);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/guides/${slug}`,
    keywords: meta.keywords,
    type: 'article',
    publishedTime: meta.date,
  });
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) notFound();

  const post = await getPost(slug);
  const related = getRelatedPosts(post, 3);
  const jsonLd: object[] = [
    postArticleJsonLd(post),
    breadcrumbJsonLd([
      { name: '홈', path: '/' },
      { name: '가이드', path: '/guides' },
      { name: post.title, path: `/guides/${post.slug}` },
    ]),
  ];
  if (post.faqs && post.faqs.length > 0) jsonLd.push(faqJsonLd(post.faqs));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: '홈', path: '/' },
          { name: '가이드', path: '/guides' },
          { name: post.title, path: `/guides/${post.slug}` },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_260px]">
        <article className="min-w-0">
          <header>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-[var(--accent-ink)]">{post.category}</span>
              <span className="text-[var(--text-muted)]">· 약 {post.readingMinutes}분 읽기</span>
              <span className="text-[var(--text-muted)]">· {post.date}</span>
            </div>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-[var(--text-muted)]">
              {post.description}
            </p>
          </header>

          <AdSlot slot="top" height={100} label="광고" />

          <div
            className="prose-dream mt-6"
            // 마크다운은 rehype-sanitize 로 정화되어 원시 HTML/스크립트가 제거됨 (XSS 방지)
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* FAQ */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold">자주 묻는 질문</h2>
              <div className="space-y-3">
                {post.faqs.map((f) => (
                  <details key={f.q} className="card p-4">
                    <summary className="cursor-pointer font-semibold">{f.q}</summary>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <Disclaimer className="mt-8" />

          {/* 태그 */}
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <Link
                key={t}
                href={`/tags/${encodeURIComponent(t)}`}
                className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1 text-sm text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
              >
                #{t}
              </Link>
            ))}
          </div>

          {/* 관련 글 */}
          {related.length > 0 && (
            <section className="mt-10">
              <h2 className="mb-4 text-xl font-bold">함께 읽으면 좋은 글</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/guides/${r.slug}`}
                    className="card p-4 transition hover:border-[var(--accent)]"
                  >
                    <h3 className="text-sm font-bold">{r.title}</h3>
                    <p className="mt-1 line-clamp-2 text-xs text-[var(--text-muted)]">
                      {r.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <AdSlot slot="bottom" height={100} label="광고" />
        </article>

        {/* 사이드바: 목차 */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <div className="card p-5">
              <Toc items={post.toc} />
            </div>
            <Link
              href="/search"
              className="block rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-white transition hover:brightness-110"
            >
              내 꿈 검색하기
            </Link>
            <AdSlot slot="sidebar" height={600} format="vertical" label="광고" />
          </div>
        </aside>
      </div>
    </div>
  );
}
