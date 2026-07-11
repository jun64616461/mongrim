'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  searchDreams,
  isCompound,
  type SearchIndexItem,
} from '@/lib/search';
import { fortuneStyle } from '@/lib/dreams';

function ResultRow({ item }: { item: SearchIndexItem }) {
  const s = fortuneStyle[item.fortune as keyof typeof fortuneStyle];
  return (
    <Link
      href={`/dreams/${item.slug}`}
      className="card flex items-start gap-3 p-4 transition hover:border-[var(--accent)]"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="truncate font-bold">{item.keyword}</h3>
          {s && (
            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${s.className}`}>
              {s.label}
            </span>
          )}
        </div>
        <p className="mt-1 line-clamp-2 text-sm text-[var(--text-muted)]">{item.summary}</p>
      </div>
      <span aria-hidden="true" className="mt-1 text-[var(--text-muted)]">›</span>
    </Link>
  );
}

export function DreamSearchClient({ index }: { index: SearchIndexItem[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get('q') ?? '';
  const [query, setQuery] = useState(initial);

  useEffect(() => {
    setQuery(params.get('q') ?? '');
  }, [params]);

  const results = useMemo(() => searchDreams(index, query), [index, query]);
  const compound = useMemo(() => isCompound(results), [results]);
  const strong = results.filter((r) => r.score >= 20);
  const weak = results.filter((r) => r.score < 20).slice(0, 8);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.replace(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  }

  return (
    <div>
      <form onSubmit={onSubmit} role="search" aria-label="꿈 검색">
        <div className="flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-2 shadow-glow-soft">
          <svg className="ml-2 text-[var(--text-muted)]" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <label htmlFor="search-input" className="sr-only">꿈 키워드 검색</label>
          <input
            id="search-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="꾼 꿈을 입력하세요 (예: 고양이가 하늘에서 떨어지는 꿈)"
            className="flex-1 bg-transparent px-1 py-2 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none"
          />
          <button type="submit" className="rounded-xl bg-[var(--accent)] px-5 py-2.5 font-semibold text-white transition hover:brightness-110">
            검색
          </button>
        </div>
      </form>

      <div className="mt-6" aria-live="polite">
        {query.trim() === '' ? (
          <p className="text-sm text-[var(--text-muted)]">
            꾼 꿈의 키워드를 입력해 보세요. 부분 검색과 동의어도 지원합니다.
          </p>
        ) : results.length === 0 ? (
          <div className="card p-6 text-center">
            <p className="font-semibold">‘{query}’에 대한 해몽을 찾지 못했어요.</p>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              더 짧은 키워드로 검색하거나, <Link href="/dreams" className="text-[var(--accent-ink)] underline">전체 꿈 사전</Link>에서 찾아보세요.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {compound && (
              <div className="rounded-xl border border-[var(--accent)]/30 bg-[var(--bg-soft)] px-4 py-3 text-sm">
                <strong className="text-[var(--accent-ink)]">복합 꿈으로 보이네요.</strong>{' '}
                입력하신 꿈에 포함된 여러 상징의 해몽을 각각 찾아드렸어요. 아래 결과를 조합해 함께 읽어보세요.
              </div>
            )}

            <p className="text-sm text-[var(--text-muted)]">
              연관도 높은 결과 {strong.length}건
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {strong.map((r) => (
                <ResultRow key={r.item.slug} item={r.item} />
              ))}
            </div>

            {weak.length > 0 && (
              <>
                <p className="pt-2 text-sm text-[var(--text-muted)]">그 밖에 관련된 꿈</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {weak.map((r) => (
                    <ResultRow key={r.item.slug} item={r.item} />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
