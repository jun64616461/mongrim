import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd } from '@/components/JsonLd';
import { site, adsense } from '@/lib/site';
import { websiteJsonLd, organizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: [...site.keywords],
  authors: [{ name: site.author }],
  creator: site.author,
  publisher: site.fullName,
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: { canonical: '/', types: { 'application/rss+xml': '/rss.xml' } },
  verification: {
    google: 'HEpoVyBocBHh1XPjRszPv98y5FDmiL-aI_NNbEX-kQY',
    other: {
      'naver-site-verification': '21a2160d55fca4794c013ba5b614548773249421',
    },
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5f4fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0e27' },
  ],
  width: 'device-width',
  initialScale: 1,
};

// FOUC 방지: 페인트 전에 테마 클래스 적용 (기본 다크)
const themeScript = `(function(){try{var t=localStorage.getItem('mongrim-theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adsEnabled = Boolean(adsense.client);
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {adsEnabled && (
          // AdSense 로더 (client 설정 시에만 삽입)
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsense.client}`}
            crossOrigin="anonymous"
          />
        )}
        <JsonLd data={[websiteJsonLd(), organizationJsonLd()]} />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <a href="#main" className="skip-link">
          본문으로 건너뛰기
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
