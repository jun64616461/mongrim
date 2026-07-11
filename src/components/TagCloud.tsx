import Link from 'next/link';

interface TagCloudProps {
  tags: { tag: string; count: number }[];
  max?: number;
}

export function TagCloud({ tags, max = 30 }: TagCloudProps) {
  const shown = tags.slice(0, max);
  const counts = shown.map((t) => t.count);
  const min = Math.min(...counts, 1);
  const maxC = Math.max(...counts, 1);
  const sizeFor = (c: number) => {
    if (maxC === min) return 'text-sm';
    const r = (c - min) / (maxC - min);
    if (r > 0.75) return 'text-lg font-bold';
    if (r > 0.5) return 'text-base font-semibold';
    if (r > 0.25) return 'text-sm font-medium';
    return 'text-xs';
  };
  return (
    <div className="flex flex-wrap items-center gap-2">
      {shown.map(({ tag, count }) => (
        <Link
          key={tag}
          href={`/tags/${encodeURIComponent(tag)}`}
          className={`rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-1 text-[var(--text-muted)] transition hover:border-[var(--accent)] hover:text-[var(--accent-ink)] ${sizeFor(count)}`}
        >
          #{tag}
          <span className="ml-1 text-[10px] opacity-60">{count}</span>
        </Link>
      ))}
    </div>
  );
}
