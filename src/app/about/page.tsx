import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Disclaimer } from '@/components/Disclaimer';
import { site } from '@/lib/site';
import { dreams } from '@/lib/dreams';
import { getAllPostMeta } from '@/lib/posts';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '소개',
  description: `${site.fullName}은 꿈과 상징을 다루는 정보 콘텐츠 사이트입니다. 전통적 해석과 심리학적 관점을 균형 있게 정리합니다.`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ name: '홈', path: '/' }, { name: '소개', path: '/about' }]} />
      <h1 className="mt-4 text-3xl font-extrabold">{site.fullName} 소개</h1>

      <div className="prose-dream mt-6">
        <p>
          <strong>{site.name}({site.hanja})</strong>은 &lsquo;꿈이 모이는 숲&rsquo;이라는 뜻으로,
          사람들이 꾼 꿈의 상징적 의미를 쉽고 균형 있게 찾아볼 수 있도록 만든 꿈해몽 정보
          사이트입니다.
        </p>

        <h2>우리가 지향하는 것</h2>
        <p>
          {site.name}은 꿈을 단순한 미신으로 나열하지 않습니다. 각 꿈에 대해 오래 전해 내려온
          <strong> 전통적 해석</strong>과 함께, 프로이트·융으로 대표되는 <strong>심리학적 관점</strong>을
          나란히 정리합니다. 그리고 언제나 다음 원칙을 지킵니다.
        </p>
        <ul>
          <li>같은 꿈이라도 개인의 경험·감정·상황에 따라 다르게 해석될 수 있음을 분명히 합니다.</li>
          <li>불안을 조장하거나 특정 결과를 단정하지 않습니다.</li>
          <li>꿈 해석은 재미로 참고하는 정보임을 곳곳에 안내합니다.</li>
        </ul>

        <h2>제공하는 콘텐츠</h2>
        <p>
          현재 {dreams.length}개의 대표 꿈 키워드에 대한 상세 해몽과, 꿈과 잠에 대한 이해를 돕는
          {getAllPostMeta().length}편의 가이드 글을 제공합니다. 뱀·이빨·물·불처럼 자주 꾸는 꿈부터
          가위눌림·자각몽 같은 주제까지 폭넓게 다룹니다.
        </p>

        <h2>앞으로의 계획</h2>
        <p>
          여러 요소가 섞인 꿈을 문장으로 입력하면 AI가 상징을 분석해 해석을 정리해 주는
          &lsquo;AI 꿈 해석&rsquo; 기능을 준비하고 있습니다. 출시 소식은 홈 화면과 가이드에서
          안내하겠습니다.
        </p>

        <h2>면책 안내</h2>
        <p>
          {site.name}이 제공하는 모든 해석은 문화적 상징과 심리학적 견해를 정리한 정보이며, 의학적
          진단이나 미래 예측이 아닙니다. 수면이나 정신 건강에 어려움이 있다면 전문가와 상담하시길
          권합니다.
        </p>
      </div>

      <Disclaimer className="mt-8" />
    </div>
  );
}
