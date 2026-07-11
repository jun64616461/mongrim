'use client';

import { useState } from 'react';

/**
 * AI 꿈 해석 (준비 중) 자리.
 *
 * ── 나중에 실제 AI 기능을 얹는 방법 ────────────────────────────
 * 1) 이 파일과 같은 폴더에 `AiInterpreter.tsx` 를 만들고,
 *    입력값(dreamText)을 받아 API를 호출하는 컴포넌트를 구현합니다.
 *      예) const res = await fetch('/api/interpret', {
 *            method: 'POST', body: JSON.stringify({ dream: dreamText }),
 *          });
 * 2) 아래 handleSubmit 안의 "TODO" 지점을 실제 호출로 교체하거나,
 *    이 컴포넌트를 <AiInterpreter /> 로 바꿔 끼우면 됩니다.
 * 3) API 라우트는 app/api/interpret/route.ts 에 추가하세요.
 * 현재 버전은 비용 0원·운영 리스크 0을 위해 호출을 하지 않습니다.
 * ───────────────────────────────────────────────────────────
 */
export function AiTeaser() {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO(AI): 준비 중. 향후 여기서 /api/interpret 를 호출하도록 연결합니다.
  }

  return (
    <section
      aria-labelledby="ai-teaser-title"
      className="card relative overflow-hidden p-6 sm:p-8"
    >
      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-[var(--moon)]/40 bg-[var(--moon)]/10 px-3 py-1 text-xs font-semibold text-[var(--moon)]">
        준비 중
      </div>
      <div className="flex items-center gap-2 text-[var(--accent-ink)]">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 2l1.9 4.7L18.7 8l-3.7 3.1L16 16l-4-2.6L8 16l1-4.9L5.3 8l4.8-1.3L12 2z"
            fill="currentColor"
          />
        </svg>
        <span className="text-sm font-semibold uppercase tracking-wider">AI 꿈 해석</span>
      </div>
      <h2 id="ai-teaser-title" className="mt-2 text-xl font-bold sm:text-2xl">
        곧, 당신의 꿈을 문장으로 풀어드립니다
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
        복잡하게 얽힌 꿈도 그대로 적으면, AI가 상징을 분석해 맞춤 해석을 정리해 주는
        기능을 준비하고 있어요. 지금은 아래 꿈 사전 검색으로 키워드별 해석을 확인해 보세요.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="ai-dream-input" className="sr-only">
            꿈 내용 입력 (준비 중)
          </label>
          <textarea
            id="ai-dream-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={2}
            disabled
            placeholder="예) 고양이가 하늘에서 떨어지는 꿈을 꿨어요… (기능 준비 중)"
            className="flex-1 resize-none rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled
            className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white opacity-60 disabled:cursor-not-allowed"
          >
            해석 받기
          </button>
        </div>
        <p className="mt-2 text-xs text-[var(--text-muted)]">
          출시 알림을 원하시면 <a href="/contact" className="underline">문의 페이지</a>로 알려주세요.
        </p>
      </form>
    </section>
  );
}
