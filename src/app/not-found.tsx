import Link from 'next/link';
import { StarField } from '@/components/StarField';
import { MoonLogo } from '@/components/MoonLogo';

export default function NotFound() {
  return (
    <div className="relative overflow-hidden bg-night-gradient">
      <StarField count={40} />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
        <MoonLogo size={48} />
        <h1 className="mt-6 text-5xl font-extrabold text-white">404</h1>
        <p className="mt-3 text-lg text-lavender">
          찾으시는 꿈을 발견하지 못했어요. 길을 잃은 꿈처럼요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-xl bg-[var(--moon)] px-6 py-3 font-semibold text-night-800 transition hover:brightness-110"
          >
            홈으로 가기
          </Link>
          <Link
            href="/search"
            className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            꿈 검색하기
          </Link>
        </div>
      </div>
    </div>
  );
}
