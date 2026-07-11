import Link from 'next/link';

interface PaginationProps {
  basePath: string;
  current: number;
  total: number;
}

export function Pagination({ basePath, current, total }: PaginationProps) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const href = (p: number) => (p === 1 ? basePath : `${basePath}?page=${p}`);
  return (
    <nav aria-label="페이지 이동" className="mt-10 flex items-center justify-center gap-2">
      {current > 1 && (
        <Link href={href(current - 1)} className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--accent)]" aria-label="이전 페이지">
          이전
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={href(p)}
          aria-current={p === current ? 'page' : undefined}
          className={`rounded-lg px-3.5 py-2 text-sm ${
            p === current
              ? 'bg-[var(--accent)] font-semibold text-white'
              : 'border border-[var(--border)] hover:border-[var(--accent)]'
          }`}
        >
          {p}
        </Link>
      ))}
      {current < total && (
        <Link href={href(current + 1)} className="rounded-lg border border-[var(--border)] px-3 py-2 text-sm hover:border-[var(--accent)]" aria-label="다음 페이지">
          다음
        </Link>
      )}
    </nav>
  );
}
