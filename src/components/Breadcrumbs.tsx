import Link from 'next/link';

export interface Crumb {
  name: string;
  path: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="이동 경로" className="text-xs text-[var(--text-muted)]">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((c, i) => (
          <li key={c.path} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true">›</span>}
            {i < items.length - 1 ? (
              <Link href={c.path} className="hover:text-[var(--accent-ink)]">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-[var(--text)]">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
