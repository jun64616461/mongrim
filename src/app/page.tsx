import Link from 'next/link';
import { StarField } from '@/components/StarField';
import { MoonLogo } from '@/components/MoonLogo';
import { SearchBar } from '@/components/SearchBar';
import { AiTeaser } from '@/components/AiTeaser';
import { CategoryNav } from '@/components/CategoryNav';
import { DreamCard } from '@/components/DreamCard';
import { TagCloud } from '@/components/TagCloud';
import { SectionTitle } from '@/components/RelatedDreams';
import { AdSlot } from '@/components/AdSlot';
import { Disclaimer } from '@/components/Disclaimer';
import { getPopularDreams, getAllTags, dreams } from '@/lib/dreams';
import { getPopularPosts } from '@/lib/posts';
import { site } from '@/lib/site';

export default function HomePage() {
  const popular = getPopularDreams(8);
  const tags = getAllTags();
  const posts = getPopularPosts(4);

  return (
    <div>
      {/* 히어로: 밤하늘 별밭 시그니처 */}
      <section className="relative overflow-hidden bg-night-gradient">
        <StarField count={48} />
        <div className="relative mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
          <div className="mb-5 flex justify-center animate-floatY">
            <div className="rounded-full border border-[var(--moon)]/30 bg-white/5 p-4 shadow-glow backdrop-blur-sm">
              <MoonLogo size={48} />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            <span className="text-gradient-moon">{site.name}</span>
            <span className="ml-2 align-middle text-xl font-medium text-lavender">
              {site.hanja}
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-lavender sm:text-lg">
            간밤에 꾼 꿈, 무슨 의미였을까요? 키워드를 검색하면 전통적 해석과
            심리학적 관점을 함께 정리해 드립니다.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar big />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* AI 준비 중 섹션 */}
        <div className="-mt-10 relative z-10">
          <AiTeaser />
        </div>

        <AdSlot slot="top" height={100} label="광고" />

        {/* 카테고리 탐색 */}
        <section className="mt-8">
          <SectionTitle sub="관심 있는 주제별로 꿈을 둘러보세요">
            카테고리로 찾기
          </SectionTitle>
          <CategoryNav />
        </section>

        {/* 인기 꿈 */}
        <section className="mt-16">
          <div className="flex items-end justify-between">
            <SectionTitle sub="사람들이 가장 많이 찾는 꿈 해몽">인기 꿈 키워드</SectionTitle>
            <Link href="/dreams" className="mb-5 text-sm font-semibold text-[var(--accent-ink)] hover:underline">
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((d) => (
              <DreamCard key={d.slug} dream={d} />
            ))}
          </div>
        </section>

        <AdSlot slot="middle" height={280} label="광고" />

        {/* 가이드 글 */}
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <SectionTitle sub="꿈과 잠에 대해 더 깊이 알아보기">꿈 이야기 가이드</SectionTitle>
            <Link href="/guides" className="mb-5 text-sm font-semibold text-[var(--accent-ink)] hover:underline">
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/guides/${p.slug}`}
                className="card group p-6 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
              >
                <span className="text-xs font-medium text-[var(--accent-ink)]">{p.category}</span>
                <h3 className="mt-1 text-lg font-bold group-hover:text-[var(--accent-ink)]">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-[var(--text-muted)]">
                  {p.description}
                </p>
                <span className="mt-3 inline-block text-xs text-[var(--text-muted)]">
                  약 {p.readingMinutes}분 읽기
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 태그 클라우드 */}
        <section className="mt-16">
          <SectionTitle sub="자주 등장하는 꿈의 상징 키워드">인기 태그</SectionTitle>
          <TagCloud tags={tags} max={24} />
        </section>

        <section className="mt-16">
          <div className="card flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h2 className="text-xl font-bold">지금 꾼 꿈이 궁금하신가요?</h2>
              <p className="mt-1 text-sm text-[var(--text-muted)]">
                {dreams.length}개의 꿈 해몽을 키워드로 바로 검색해 보세요.
              </p>
            </div>
            <Link
              href="/search"
              className="rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white transition hover:brightness-110"
            >
              꿈 검색하러 가기
            </Link>
          </div>
        </section>

        <Disclaimer className="mt-10" />
        <div className="h-10" />
      </div>
    </div>
  );
}
