import Link from 'next/link';
import type { Dream } from '@/lib/dreams';
import { FortuneBadge } from './FortuneBadge';

export function RelatedDreams({ dreams }: { dreams: Dream[] }) {
  if (dreams.length === 0) return null;
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {dreams.map((d) => (
        <li key={d.slug}>
          <Link
            href={`/dreams/${d.slug}`}
            className="card flex items-center justify-between gap-2 p-4 transition hover:border-[var(--accent)]"
          >
            <span className="font-semibold">{d.keyword}</span>
            <FortuneBadge fortune={d.fortune} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SectionTitle({
  children,
  sub,
}: {
  children: React.ReactNode;
  sub?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="flex items-center gap-2 text-xl font-extrabold sm:text-2xl">
        <span aria-hidden="true" className="text-[var(--moon)]">✦</span>
        {children}
      </h2>
      {sub && <p className="mt-1 text-sm text-[var(--text-muted)]">{sub}</p>}
    </div>
  );
}
