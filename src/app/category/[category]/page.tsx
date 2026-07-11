import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DreamCard } from '@/components/DreamCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { JsonLd } from '@/components/JsonLd';
import { SectionTitle } from '@/components/RelatedDreams';
import { CategoryNav } from '@/components/CategoryNav';
import {
  categories,
  getCategory,
  getDreamsByCategory,
  type CategoryId,
} from '@/lib/dreams';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) return {};
  const count = getDreamsByCategory(cat.id).length;
  return buildMetadata({
    title: `${cat.label} 꿈 해몽 모음`,
    description: `${cat.description} ${cat.label} 관련 꿈 ${count}개의 전통·심리학적 해석을 모았습니다.`,
    path: `/category/${cat.id}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = categories.find((c) => c.id === category);
  if (!cat) notFound();

  const items = getDreamsByCategory(cat.id as CategoryId);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '꿈 사전', path: '/dreams' },
          { name: cat.label, path: `/category/${cat.id}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: '홈', path: '/' },
          { name: '꿈 사전', path: '/dreams' },
          { name: cat.label, path: `/category/${cat.id}` },
        ]}
      />

      <div className="mt-4">
        <SectionTitle sub={`${cat.description} · 총 ${items.length}개`}>
          <span className="mr-1" aria-hidden="true">{cat.emoji}</span>
          {cat.label} 꿈
        </SectionTitle>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((d) => (
          <DreamCard key={d.slug} dream={d} />
        ))}
      </div>

      <AdSlot slot="middle" height={120} label="광고" />

      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold">다른 카테고리 둘러보기</h2>
        <CategoryNav />
      </section>

      <Disclaimer className="mt-10" />
    </div>
  );
}
