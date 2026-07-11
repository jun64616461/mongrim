'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SUGGESTIONS = ['뱀', '이빨 빠지는 꿈', '돈 줍는 꿈', '쫓기는 꿈', '전 애인', '똥'];

export function SearchBar({ big = false }: { big?: boolean }) {
  const router = useRouter();
  const [q, setQ] = useState('');

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    if (query) router.push(`/search?q=${encodeURIComponent(query)}`);
    else router.push('/search');
  }

  return (
    <div className="w-full">
      <form onSubmit={submit} role="search" aria-label="꿈 검색">
        <div
          className={`flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] shadow-glow-soft ${
            big ? 'p-2' : 'p-1.5'
          }`}
        >
          <svg
            className="ml-2 text-[var(--text-muted)]"
            width={big ? 22 : 18}
            height={big ? 22 : 18}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <label htmlFor="hero-search" className="sr-only">
            꾼 꿈의 키워드를 입력하세요
          </label>
          <input
            id="hero-search"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="꾼 꿈을 입력하세요 (예: 뱀, 이빨 빠지는 꿈)"
            className={`flex-1 bg-transparent px-1 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none ${
              big ? 'py-2 text-base' : 'py-1.5 text-sm'
            }`}
          />
          <button
            type="submit"
            className={`rounded-xl bg-[var(--accent)] font-semibold text-white transition hover:brightness-110 ${
              big ? 'px-6 py-2.5 text-base' : 'px-4 py-2 text-sm'
            }`}
          >
            검색
          </button>
        </div>
      </form>

      {big && (
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-[var(--text-muted)]">인기:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => router.push(`/search?q=${encodeURIComponent(s)}`)}
              className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1 text-xs text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent-ink)]"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
