import { DISCLAIMER } from '@/lib/site';

export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <p
      role="note"
      className={`rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-xs leading-relaxed text-[var(--text-muted)] ${className}`}
    >
      ⓘ {DISCLAIMER}
    </p>
  );
}
