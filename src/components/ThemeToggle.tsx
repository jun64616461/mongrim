'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
    setTheme(stored);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle('dark', next === 'dark');
    try {
      localStorage.setItem('mongrim-theme', next);
    } catch {
      /* localStorage 접근 불가 시 무시 */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
      title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-elev)] text-[var(--text)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
    >
      {mounted && theme === 'dark' ? (
        // 태양 (라이트 모드로 전환)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" fill="currentColor" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" />
          </g>
        </svg>
      ) : (
        // 달 (다크 모드로 전환)
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
