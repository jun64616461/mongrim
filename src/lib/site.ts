export const site = {
  name: '몽림',
  fullName: '몽림 · 꿈해몽 사전',
  hanja: '夢林',
  tagline: '꿈이 모이는 숲, 상징을 읽는 사전',
  description:
    '뱀·이빨·물·불부터 쫓기는 꿈까지, 자주 꾸는 꿈 키워드의 전통적 해석과 심리학적 관점을 균형 있게 정리한 꿈해몽 사전입니다. 검색으로 내 꿈의 의미를 찾아보세요.',
  locale: 'ko_KR',
  // 배포 시 .env 의 NEXT_PUBLIC_SITE_URL 로 덮어써집니다.
  url:
    (process.env.NEXT_PUBLIC_SITE_URL || 'https://mongrim.example.com').replace(
      /\/$/,
      '',
    ),
  author: '몽림 편집팀',
  email: 'hello@mongrim.example.com',
  twitter: '@mongrim',
  keywords: [
    '꿈해몽',
    '꿈 해석',
    '꿈 의미',
    '해몽 사전',
    '길몽',
    '흉몽',
    '태몽',
    '악몽',
    '꿈풀이',
  ],
} as const;

export const nav = [
  { href: '/dreams', label: '꿈 사전' },
  { href: '/guides', label: '가이드' },
  { href: '/search', label: '검색' },
  { href: '/faq', label: 'FAQ' },
] as const;

export const footerNav = [
  { href: '/about', label: '소개' },
  { href: '/contact', label: '문의' },
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
  { href: '/faq', label: '자주 묻는 질문' },
] as const;

/** AdSense 설정 — 미설정 시 광고 컴포넌트는 동일 크기의 예약 공간만 렌더(CLS 방지) */
export const adsense = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  slots: {
    top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || '',
    middle: process.env.NEXT_PUBLIC_ADSENSE_SLOT_MIDDLE || '',
    bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM || '',
    sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
    list: process.env.NEXT_PUBLIC_ADSENSE_SLOT_LIST || '',
  },
} as const;

export const DISCLAIMER =
  '꿈 해석은 재미로 참고하는 정보이며, 같은 꿈이라도 개인의 상황·경험·감정에 따라 다르게 해석될 수 있습니다.';
