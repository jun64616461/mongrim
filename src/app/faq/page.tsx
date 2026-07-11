import Link from 'next/link';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { JsonLd } from '@/components/JsonLd';
import { Disclaimer } from '@/components/Disclaimer';
import { buildMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { site } from '@/lib/site';

const FAQS = [
  {
    q: '꿈 해석은 정말 맞나요?',
    a: '꿈 해석은 과학적으로 증명된 예언이 아니라, 오래 전해진 문화적 상징과 심리학적 견해를 정리한 참고 정보입니다. 같은 꿈이라도 개인의 상황·감정에 따라 다르게 해석될 수 있으니 재미로 참고하시길 권합니다.',
  },
  {
    q: '같은 꿈인데 왜 사이트마다 해석이 다른가요?',
    a: '해몽은 지역·시대·해석 전통에 따라 달라져 왔고, 심리학적 관점도 학파마다 다릅니다. 몽림은 특정 결론을 단정하기보다 전통적 해석과 심리학적 관점을 함께 제시해 균형을 맞춥니다.',
  },
  {
    q: '무서운 꿈(악몽)을 꾸면 나쁜 일이 생기나요?',
    a: '그렇지 않습니다. 전통적으로 악몽은 나쁜 기운을 미리 흘려보내는 액땜으로 보기도 하고, 심리학에서는 스트레스를 처리하는 자연스러운 과정으로 봅니다. 자세한 내용은 악몽 가이드를 참고하세요.',
  },
  {
    q: '복합적인 꿈은 어떻게 검색하나요?',
    a: '여러 요소가 섞인 꿈(예: 고양이가 하늘에서 떨어지는 꿈)을 그대로 입력하면, 포함된 키워드(고양이·떨어지는 등)의 해몽을 각각 찾아 함께 보여줍니다. 결과를 조합해 읽어보세요.',
  },
  {
    q: '태몽인지 어떻게 아나요?',
    a: '태몽은 유난히 생생하고 오래 기억에 남으며 특정 동물·과일 등이 선명하게 등장하는 특징이 있다고 전해집니다. 다만 이는 문화적 이야기이며, 임신과 무관한 경우도 많습니다.',
  },
  {
    q: 'AI 꿈 해석 기능은 언제 나오나요?',
    a: '문장으로 입력한 꿈을 AI가 분석해 해석을 정리해 주는 기능을 준비 중입니다. 출시 알림을 원하시면 문의 페이지로 알려주세요.',
  },
  {
    q: '광고는 왜 표시되나요?',
    a: '몽림은 무료로 콘텐츠를 제공하기 위해 Google AdSense 광고를 게재할 수 있습니다. 광고와 쿠키 사용에 대한 자세한 내용은 개인정보처리방침에서 확인할 수 있습니다.',
  },
];

export const metadata: Metadata = buildMetadata({
  title: '자주 묻는 질문(FAQ)',
  description: `${site.fullName} 이용과 꿈 해석에 대해 자주 묻는 질문을 모았습니다.`,
  path: '/faq',
});

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <JsonLd
        data={[
          faqJsonLd(FAQS),
          breadcrumbJsonLd([
            { name: '홈', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: '홈', path: '/' }, { name: 'FAQ', path: '/faq' }]} />
      <h1 className="mt-4 text-3xl font-extrabold">자주 묻는 질문</h1>
      <p className="mt-2 text-[var(--text-muted)]">
        몽림과 꿈 해석에 대해 자주 묻는 질문을 정리했습니다.
      </p>

      <div className="mt-6 space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="card p-5">
            <summary className="cursor-pointer text-base font-bold">{f.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-[var(--text-muted)]">{f.a}</p>
          </details>
        ))}
      </div>

      <div className="card mt-8 flex items-center justify-between gap-4 p-6">
        <p className="text-sm text-[var(--text-muted)]">더 궁금한 점이 있으신가요?</p>
        <Link
          href="/contact"
          className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          문의하기
        </Link>
      </div>

      <Disclaimer className="mt-8" />
    </div>
  );
}
