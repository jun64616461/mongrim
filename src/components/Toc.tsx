'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/posts';

export function Toc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="목차" className="text-sm">
      <p className="mb-2 font-bold">목차</p>
      <ul className="space-y-1.5 border-l border-[var(--border)]">
        {items.map((it) => (
          <li key={it.id} className={it.level === 3 ? 'pl-6' : 'pl-3'}>
            <a
              href={`#${it.id}`}
              className={`-ml-px block border-l-2 py-0.5 transition ${
                active === it.id
                  ? 'border-[var(--accent)] font-semibold text-[var(--accent-ink)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
