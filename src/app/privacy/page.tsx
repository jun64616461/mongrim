import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '개인정보처리방침',
  description: `${site.fullName}의 개인정보처리방침 및 Google AdSense 쿠키 사용 고지입니다.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs
        items={[{ name: '홈', path: '/' }, { name: '개인정보처리방침', path: '/privacy' }]}
      />
      <h1 className="mt-4 text-3xl font-extrabold">개인정보처리방침</h1>

      <div className="prose-dream mt-6">
        <p>
          {site.fullName}(&lsquo;사이트&rsquo;)은 이용자의 개인정보를 중요하게 생각하며, 관련 법령을
          준수합니다. 본 방침은 사이트가 어떤 정보를 수집·이용하는지 설명합니다.
        </p>

        <h2>1. 수집하는 정보</h2>
        <p>
          사이트는 회원가입 없이 이용할 수 있으며, 이름·연락처 등 개인정보를 직접 수집하지 않습니다.
          다만 다음의 정보가 자동으로 또는 이용자의 선택에 따라 처리될 수 있습니다.
        </p>
        <ul>
          <li>접속 로그, 브라우저 종류, 기기 정보 등 일반적인 통계 정보</li>
          <li>다크모드 설정 등 편의 기능을 위한 브라우저 로컬 저장소(localStorage) 값</li>
          <li>문의 시 이용자가 자발적으로 제공하는 이메일 주소</li>
        </ul>

        <h2>2. 쿠키 및 Google AdSense</h2>
        <p>
          본 사이트는 Google AdSense를 통해 광고를 게재할 수 있습니다. 이와 관련하여 다음 사항을
          고지합니다.
        </p>
        <ul>
          <li>
            Google을 포함한 제3자 광고 사업자는 쿠키를 사용하여 이용자의 이전 방문 기록을 바탕으로
            맞춤형 광고를 제공할 수 있습니다.
          </li>
          <li>
            Google이 광고 쿠키(DoubleClick 쿠키 등)를 사용함으로써, 이용자가 본 사이트나 다른
            사이트를 방문한 기록에 기반해 광고를 게재할 수 있습니다.
          </li>
          <li>
            이용자는{' '}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google 광고 설정
            </a>
            에서 맞춤 광고를 해제할 수 있으며,{' '}
            <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer">
              www.aboutads.info
            </a>
            에서 제3자 사업자의 쿠키를 관리할 수 있습니다.
          </li>
          <li>
            대부분의 브라우저는 설정을 통해 쿠키를 거부하거나 삭제할 수 있습니다. 다만 이 경우 일부
            기능 이용에 제한이 있을 수 있습니다.
          </li>
        </ul>

        <h2>3. 분석 도구</h2>
        <p>
          사이트는 서비스 개선을 위해 접속 통계 분석 도구를 사용할 수 있습니다. 이때 수집되는 정보는
          개인을 식별할 수 없는 형태의 통계로만 활용됩니다.
        </p>

        <h2>4. 개인정보의 제3자 제공</h2>
        <p>
          사이트는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만 법령에 근거가 있거나
          수사 목적의 적법한 요청이 있는 경우는 예외로 합니다.
        </p>

        <h2>5. 이용자의 권리</h2>
        <p>
          이용자는 언제든 자신의 브라우저 쿠키·로컬 저장소를 삭제할 수 있으며, 문의로 제공한 이메일
          정보의 삭제를 요청할 수 있습니다.
        </p>

        <h2>6. 문의</h2>
        <p>
          개인정보 관련 문의는 <a href={`mailto:${site.email}`}>{site.email}</a> 으로 연락해 주세요.
        </p>

        <h2>7. 방침의 변경</h2>
        <p>
          본 방침은 법령·서비스 변경에 따라 개정될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.
        </p>
      </div>
    </div>
  );
}
