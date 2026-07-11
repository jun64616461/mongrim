import { fortuneStyle, type Fortune } from '@/lib/dreams';

export function FortuneBadge({ fortune }: { fortune: Fortune }) {
  const s = fortuneStyle[fortune];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${s.className}`}
    >
      {s.label}
    </span>
  );
}
