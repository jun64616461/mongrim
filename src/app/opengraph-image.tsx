import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = site.fullName;

export default function OpengraphImage() {
  const stars = Array.from({ length: 60 }, (_, i) => {
    const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const y = (Math.sin(i * 78.233) * 43758.5453) % 1;
    const left = Math.abs(x) * 1200;
    const top = Math.abs(y) * 460;
    const s = 1 + (Math.abs(x) * 3);
    return (
      <div
        key={i}
        style={{
          position: 'absolute',
          left,
          top,
          width: s,
          height: s,
          borderRadius: 999,
          background: '#C4BFF0',
          opacity: 0.6,
        }}
      />
    );
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
          background:
            'radial-gradient(120% 90% at 50% 0%, #232149 0%, #0a0e27 55%, #070a1c 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {stars}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 32 32" fill="none">
            <path d="M22 4a12 12 0 1 0 6 21.5A9.5 9.5 0 0 1 22 4z" fill="#EBCB6B" />
            <circle cx="9" cy="8" r="1.8" fill="#F4E4B8" />
            <circle cx="7" cy="16" r="1.3" fill="#F4E4B8" />
          </svg>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
              color: '#EBCB6B',
              fontSize: 40,
              fontWeight: 800,
            }}
          >
            <span>{site.name}</span>
            <span style={{ color: '#9A96C4', fontSize: 28 }}>{site.hanja}</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            flexDirection: 'column',
            color: '#ECEAFD',
            fontSize: 68,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: -1,
          }}
        >
          <span>꿈이 모이는 숲,</span>
          <span>상징을 읽는 꿈해몽 사전</span>
        </div>
        <div style={{ marginTop: 28, color: '#C4BFF0', fontSize: 30 }}>
          뱀 · 이빨 · 물 · 불 … 내 꿈의 의미를 검색해 보세요
        </div>
      </div>
    ),
    { ...size },
  );
}
