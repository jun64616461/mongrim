import Link from 'next/link';
import { categories, getDreamsByCategory } from '@/lib/dreams';

export function CategoryNav() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {categories.map((c) => {
        const count = getDreamsByCategory(c.id).length;
        return (
          <Link
            key={c.id}
            href={`/category/${c.id}`}
            className="card group flex items-center gap-3 p-4 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
          >
            <span className="text-2xl" aria-hidden="true">{c.emoji}</span>
            <span>
              <span className="block font-bold group-hover:text-[var(--accent-ink)]">
                {c.label}
              </span>
              <span className="block text-xs text-[var(--text-muted)]">{count}개</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
