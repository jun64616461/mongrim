import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '이용약관',
  description: `${site.fullName} 서비스 이용약관입니다.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ name: '홈', path: '/' }, { name: '이용약관', path: '/terms' }]} />
      <h1 className="mt-4 text-3xl font-extrabold">이용약관</h1>

      <div className="prose-dream mt-6">
        <h2>제1조 (목적)</h2>
        <p>
          본 약관은 {site.fullName}(&lsquo;사이트&rsquo;)이 제공하는 꿈해몽 정보 서비스의 이용 조건과
          절차, 이용자와 사이트의 권리·의무를 규정함을 목적으로 합니다.
        </p>

        <h2>제2조 (콘텐츠의 성격)</h2>
        <p>
          사이트가 제공하는 꿈 해석은 전통적 상징과 심리학적 견해를 정리한 <strong>참고용 정보</strong>
          입니다. 이는 의학적·심리학적 진단이나 미래에 대한 예측이 아니며, 같은 꿈이라도 개인의 상황에
          따라 다르게 해석될 수 있습니다.
        </p>

        <h2>제3조 (면책)</h2>
        <ul>
          <li>사이트는 제공된 정보를 신뢰하여 내린 이용자의 판단·결정에 대해 법적 책임을 지지 않습니다.</li>
          <li>사이트는 정보의 정확성·완전성을 위해 노력하나, 이를 보증하지는 않습니다.</li>
          <li>수면·정신 건강에 어려움이 있는 경우, 반드시 전문가의 도움을 받으시기 바랍니다.</li>
        </ul>

        <h2>제4조 (지식재산권)</h2>
        <p>
          사이트에 게시된 글·데이터·디자인 등의 저작권은 사이트 또는 정당한 권리자에게 있습니다.
          이용자는 사전 동의 없이 이를 복제·배포·상업적으로 이용할 수 없습니다.
        </p>

        <h2>제5조 (이용자의 의무)</h2>
        <p>
          이용자는 관련 법령과 본 약관을 준수해야 하며, 사이트의 정상적인 운영을 방해하는 행위를 해서는
          안 됩니다.
        </p>

        <h2>제6조 (광고 게재)</h2>
        <p>
          사이트는 Google AdSense 등 제3자 광고를 게재할 수 있습니다. 광고를 통한 외부 사이트 이용은
          해당 사이트의 정책을 따릅니다.
        </p>

        <h2>제7조 (약관의 변경)</h2>
        <p>
          본 약관은 필요에 따라 변경될 수 있으며, 변경 시 사이트를 통해 공지합니다. 변경 후 서비스를
          계속 이용하면 변경된 약관에 동의한 것으로 봅니다.
        </p>
      </div>
    </div>
  );
}
