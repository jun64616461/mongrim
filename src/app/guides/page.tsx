import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { SectionTitle } from '@/components/RelatedDreams';
import { getAllPostMeta } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '꿈 이야기 가이드',
  description:
    '자주 꾸는 꿈의 의미, 길몽·흉몽 구분법, 악몽과 가위눌림, 프로이트와 융의 이론, 자각몽까지. 꿈과 잠을 깊이 이해하는 가이드 글 모음입니다.',
  path: '/guides',
});

export default function GuidesPage() {
  const posts = getAllPostMeta();
  const categoryList = [...new Set(posts.map((p) => p.category))];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Breadcrumbs items={[{ name: '홈', path: '/' }, { name: '가이드', path: '/guides' }]} />

      <div className="mt-4">
        <SectionTitle sub={`꿈과 잠에 대한 ${posts.length}편의 가이드`}>
          꿈 이야기 가이드
        </SectionTitle>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 text-sm text-[var(--text-muted)]">
        {categoryList.map((c) => (
          <span key={c} className="rounded-full bg-[var(--bg-soft)] px-3 py-1">
            {c}
          </span>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((p, i) => (
          <div key={p.slug}>
            <Link
              href={`/guides/${p.slug}`}
              className="card group flex h-full flex-col p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="font-medium text-[var(--accent-ink)]">{p.category}</span>
                <span className="text-[var(--text-muted)]">· 약 {p.readingMinutes}분</span>
              </div>
              <h2 className="mt-2 text-xl font-bold group-hover:text-[var(--accent-ink)]">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-muted)]">
                {p.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-[var(--bg-soft)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
                    #{t}
                  </span>
                ))}
              </div>
            </Link>
            {i === 3 && <AdSlot slot="list" height={120} label="광고" />}
          </div>
        ))}
      </div>

      <Disclaimer className="mt-10" />
    </div>
  );
}
