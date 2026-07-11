import Link from 'next/link';
import type { Metadata } from 'next';
import { DreamCard } from '@/components/DreamCard';
import { Pagination } from '@/components/Pagination';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { JsonLd } from '@/components/JsonLd';
import { SectionTitle } from '@/components/RelatedDreams';
import { dreams, categories } from '@/lib/dreams';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '꿈 사전 — 전체 꿈 해몽 목록',
  description: `뱀·이빨·물·불부터 쫓기는 꿈까지, ${dreams.length}개의 꿈 해몽을 카테고리별로 정리했습니다. 키워드로 내 꿈의 의미를 찾아보세요.`,
  path: '/dreams',
});

const PER_PAGE = 12;

export default async function DreamsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const current = Math.max(1, Number(page) || 1);
  const totalPages = Math.ceil(dreams.length / PER_PAGE);
  const start = (current - 1) * PER_PAGE;
  const pageItems = dreams.slice(start, start + PER_PAGE);
  const firstHalf = pageItems.slice(0, 6);
  const secondHalf = pageItems.slice(6);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '꿈 사전', path: '/dreams' },
        ])}
      />
      <Breadcrumbs items={[{ name: '홈', path: '/' }, { name: '꿈 사전', path: '/dreams' }]} />

      <div className="mt-4">
        <SectionTitle sub={`총 ${dreams.length}개의 꿈 해몽 · ${current}/${totalPages} 페이지`}>
          꿈 해몽 사전
        </SectionTitle>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white">
          전체
        </span>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/category/${c.id}`}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1.5 text-sm text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
          >
            {c.emoji} {c.label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {firstHalf.map((d) => (
          <DreamCard key={d.slug} dream={d} />
        ))}
      </div>

      {secondHalf.length > 0 && (
        <>
          <AdSlot slot="list" height={120} label="광고" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondHalf.map((d) => (
              <DreamCard key={d.slug} dream={d} />
            ))}
          </div>
        </>
      )}

      <Pagination basePath="/dreams" current={current} total={totalPages} />

      <Disclaimer className="mt-10" />
    </div>
  );
}
