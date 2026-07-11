import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { TagCloud } from '@/components/TagCloud';
import { SectionTitle } from '@/components/RelatedDreams';
import { DreamSearchClient } from '@/components/DreamSearchClient';
import { buildSearchIndex } from '@/lib/search';
import { getAllTags } from '@/lib/dreams';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '꿈 검색',
  description:
    '꾼 꿈의 키워드를 입력하면 관련 해몽을 찾아드립니다. 부분 일치·동의어는 물론, 여러 요소가 섞인 복합 꿈도 각 상징별로 함께 안내합니다.',
  path: '/search',
});

export default function SearchPage() {
  const index = buildSearchIndex();
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumbs items={[{ name: '홈', path: '/' }, { name: '꿈 검색', path: '/search' }]} />

      <div className="mt-4">
        <SectionTitle sub="복합 꿈도 각 상징을 나눠 찾아드립니다 (예: 고양이가 하늘에서 떨어지는 꿈)">
          꿈 검색
        </SectionTitle>
      </div>

      <Suspense fallback={<div className="text-sm text-[var(--text-muted)]">검색 준비 중…</div>}>
        <DreamSearchClient index={index} />
      </Suspense>

      <AdSlot slot="middle" height={120} label="광고" />

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-bold">인기 태그로 찾기</h2>
        <TagCloud tags={tags} max={24} />
      </section>

      <Disclaimer className="mt-10" />
    </div>
  );
}
