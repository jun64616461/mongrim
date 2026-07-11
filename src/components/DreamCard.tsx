import Link from 'next/link';
import type { Dream } from '@/lib/dreams';
import { getCategory } from '@/lib/dreams';
import { FortuneBadge } from './FortuneBadge';

export function DreamCard({ dream }: { dream: Dream }) {
  const cat = getCategory(dream.category);
  return (
    <Link
      href={`/dreams/${dream.slug}`}
      className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-muted)]">
          <span aria-hidden="true">{cat.emoji}</span>
          {cat.label}
        </span>
        <FortuneBadge fortune={dream.fortune} />
      </div>
      <h3 className="mt-2 text-lg font-bold group-hover:text-[var(--accent-ink)]">
        {dream.keyword}
      </h3>
      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-[var(--text-muted)]">
        {dream.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {dream.tags.slice(0, 3).map((t) => (
          <span
            key={t}
            className="rounded-full bg-[var(--bg-soft)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
          >
            #{t}
          </span>
        ))}
      </div>
    </Link>
  );
}
