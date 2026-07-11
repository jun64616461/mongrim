import { CSSProperties } from 'react';

// 결정적(deterministic) 별 배치 — SSR/CSR 불일치 방지
function seeded(i: number, salt: number) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

interface StarFieldProps {
  count?: number;
  className?: string;
}

export function StarField({ count = 40, className = '' }: StarFieldProps) {
  const stars = Array.from({ length: count }, (_, i) => {
    const left = seeded(i, 1) * 100;
    const top = seeded(i, 2) * 100;
    const size = 1 + seeded(i, 3) * 2.2;
    const delay = seeded(i, 4) * 4;
    const dur = 3 + seeded(i, 5) * 3;
    const style: CSSProperties = {
      left: `${left}%`,
      top: `${top}%`,
      width: `${size}px`,
      height: `${size}px`,
      animationDelay: `${delay}s`,
      animationDuration: `${dur}s`,
    };
    return <span key={i} className="star" style={style} />;
  });
  return (
    <div className={`starfield ${className}`} aria-hidden="true">
      {stars}
    </div>
  );
}
