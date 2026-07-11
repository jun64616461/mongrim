'use client';

import { useEffect, useRef } from 'react';
import { adsense } from '@/lib/site';

type SlotKey = keyof typeof adsense.slots;

interface AdSlotProps {
  slot: SlotKey;
  /** 예약 높이(px). CLS 방지를 위해 항상 고정 공간을 차지합니다. */
  height?: number;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  label?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  slot,
  height = 280,
  format = 'auto',
  label = '광고',
  className = '',
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const client = adsense.client;
  const slotId = adsense.slots[slot];
  const enabled = Boolean(client && slotId);

  useEffect(() => {
    if (!enabled) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* 광고 로드 실패 시 예약 공간 유지 */
    }
  }, [enabled]);

  return (
    <div
      className={`my-6 flex flex-col items-center ${className}`}
      // 예약 공간: 광고 유무와 무관하게 항상 동일한 높이를 차지 → 레이아웃 이동(CLS) 없음
      style={{ minHeight: height }}
      aria-label={label}
    >
      <span className="mb-1 text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        {label}
      </span>
      {enabled ? (
        <ins
          ref={ref}
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height }}
          data-ad-client={client}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <div
          className="flex w-full items-center justify-center rounded-xl border border-dashed border-[var(--border)] bg-[var(--bg-soft)] text-xs text-[var(--text-muted)]"
          style={{ height }}
        >
          광고 자리 (환경변수 설정 시 노출)
        </div>
      )}
    </div>
  );
}
