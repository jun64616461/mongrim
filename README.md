# 몽림(夢林) — 꿈해몽 사전

꿈이 모이는 숲. 뱀·이빨·물·불 등 대표적인 꿈 54종에 대한 **전통적 해석 + 심리학적 관점**과, 꿈·잠에 관한 **가이드 글 10편**을 담은 한국어 꿈해몽 사전입니다. SEO와 Google AdSense 수익화에 최적화된 **Next.js 15 정적 사이트**입니다.

## 주요 특징

- **Next.js 15 (App Router) + TypeScript + Tailwind CSS** — 외부 폰트 없이 시스템 폰트만 사용
- **54개 꿈 해몽** — 키워드/카테고리/태그/요약/전통·심리·상황별 해석/관련 꿈 연결
- **똑똑한 검색** — 부분 일치·동의어 지원, "고양이가 하늘에서 떨어지는 꿈" 같은 **복합 꿈**을 상징별로 분해해 안내
- **가이드 10편** — 마크다운(`content/posts`) 기반, H2/H3·표·내부 링크·FAQ 포함
- **완비된 SEO** — 페이지별 메타/캐노니컬/OG/트위터, JSON-LD(WebSite·Organization·Article·FAQPage·BreadcrumbList), 자동 `sitemap.xml`·`robots.txt`·`rss.xml`
- **AdSense (CLS 방지)** — 환경변수로 제어, 미설정 시 동일 크기의 예약 공간만 노출되어 레이아웃 이동 없음
- **다크 모드** — 클래스 기반, `localStorage` 저장, FOUC 방지 인라인 스크립트(기본 다크)
- **밤하늘 시그니처** — 초승달 로고 + 반짝이는 별밭(`prefers-reduced-motion` 존중)
- **AI 꿈 해석 (준비 중)** — 향후 API 연동만 끼우면 되도록 구조화된 자리 (`src/components/AiTeaser.tsx`)
- **정적 페이지** — 소개/문의/개인정보처리방침(AdSense 쿠키 고지)/이용약관/FAQ, 커스텀 404

## 빠른 시작

```bash
# 1) 의존성 설치
npm install

# 2) 환경변수 파일 생성 (아래 '환경변수' 참고)
cp .env.example .env.local

# 3) 개발 서버 실행 → http://localhost:3000
npm run dev
```

프로덕션 빌드/실행:

```bash
npm run build   # 정적 페이지 생성 (에러/경고 0)
npm run start   # 빌드 결과 실행
```

## 환경변수

`.env.local`에 설정합니다. 모두 `NEXT_PUBLIC_` 접두사라 클라이언트에서 사용됩니다.

| 변수 | 설명 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 배포 도메인 (예: `https://mongrim.com`). 끝 슬래시 없이. 캐노니컬·OG·사이트맵에 사용 |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense 게시자 ID (`ca-pub-XXXX`). **비워두면 광고 대신 예약 공간만 노출** |
| `NEXT_PUBLIC_ADSENSE_SLOT_TOP` 외 | 상단/중단/하단/사이드바/목록 광고 슬롯 ID |

> AdSense 값을 비워두어도 사이트는 정상 동작하며, 레이아웃 이동(CLS) 없이 광고 자리만 비워둡니다. 승인 후 값을 채우면 자동으로 광고가 노출됩니다.

## 콘텐츠 추가/수정

- **꿈 추가**: `src/lib/dreams-data.ts`에 항목을 추가하면 상세 페이지·사이트맵·검색·RSS에 자동 반영됩니다. `related`에는 존재하는 `slug`만 사용하세요.
- **가이드 추가**: `content/posts/`에 `.md` 파일을 만들고 frontmatter(title/description/date/category/tags/keywords/faqs)를 채우면 목록·상세·사이트맵·RSS에 자동 반영됩니다.

## AI 꿈 해석 연동(향후)

`src/components/AiTeaser.tsx` 상단 주석에 연동 방법이 정리되어 있습니다. 요약하면:

1. `app/api/interpret/route.ts` API 라우트 추가
2. `AiTeaser`의 `handleSubmit`에서 해당 API 호출로 교체(또는 별도 `AiInterpreter` 컴포넌트로 교체)

현재는 실제 호출을 하지 않아 운영 비용이 발생하지 않습니다.

## 기술 스택

Next.js 15 · React 19 · TypeScript 5 · Tailwind CSS 3 · unified/remark/rehype(마크다운, `rehype-sanitize`로 XSS 방지) · next/og(코드 생성 아이콘·OG 이미지)

## 배포 (GitHub → Vercel)

이 저장소를 GitHub에 올린 뒤 [Vercel](https://vercel.com)에서 New Project로 import하고, 환경변수(`NEXT_PUBLIC_SITE_URL` 등)를 입력한 후 Deploy를 누르면 끝입니다. (빌드 명령·출력 디렉터리는 Vercel이 자동 인식합니다.)

## 라이선스

콘텐츠와 코드의 저작권은 프로젝트 소유자에게 있습니다. 꿈 해석은 문화적·심리학적 참고 정보이며 의학적 진단이나 미래 예측이 아닙니다.
