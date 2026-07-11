import Link from 'next/link';
import { MoonLogo } from './MoonLogo';
import { footerNav, site, DISCLAIMER } from '@/lib/site';
import { categories } from '@/lib/dreams';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-[var(--border)] bg-[var(--bg-elev)]">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-extrabold">
              <MoonLogo />
              <span className="text-lg">
                {site.name} <span className="text-sm text-[var(--text-muted)]">{site.hanja}</span>
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)]">
              {site.tagline}. {site.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold">둘러보기</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              <li><Link href="/dreams" className="hover:text-[var(--accent-ink)]">꿈 사전</Link></li>
              <li><Link href="/guides" className="hover:text-[var(--accent-ink)]">가이드</Link></li>
              <li><Link href="/search" className="hover:text-[var(--accent-ink)]">꿈 검색</Link></li>
              {categories.slice(0, 3).map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.id}`} className="hover:text-[var(--accent-ink)]">
                    {c.label} 꿈
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold">사이트 정보</h2>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)]">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-[var(--accent-ink)]">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--bg-soft)] px-4 py-3 text-xs leading-relaxed text-[var(--text-muted)]">
          ⓘ {DISCLAIMER}
        </div>

        <p className="mt-6 text-xs text-[var(--text-muted)]">
          © {year} {site.fullName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
