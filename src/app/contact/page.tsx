import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: '문의',
  description: `${site.fullName}에 대한 문의, 콘텐츠 오류 제보, 제휴 제안을 받습니다.`,
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Breadcrumbs items={[{ name: '홈', path: '/' }, { name: '문의', path: '/contact' }]} />
      <h1 className="mt-4 text-3xl font-extrabold">문의하기</h1>

      <div className="prose-dream mt-6">
        <p>
          {site.name}을 이용해 주셔서 감사합니다. 아래와 같은 내용을 언제든 이메일로 보내 주세요.
        </p>
        <ul>
          <li>콘텐츠 오류·오탈자 제보</li>
          <li>추가로 다뤘으면 하는 꿈 키워드 제안</li>
          <li>제휴·광고 관련 문의</li>
          <li>&lsquo;AI 꿈 해석&rsquo; 출시 알림 신청</li>
        </ul>
      </div>

      <div className="card mt-6 p-6">
        <p className="text-sm text-[var(--text-muted)]">이메일</p>
        <a
          href={`mailto:${site.email}`}
          className="mt-1 inline-block text-lg font-bold text-[var(--accent-ink)] hover:underline"
        >
          {site.email}
        </a>
        <p className="mt-4 text-xs leading-relaxed text-[var(--text-muted)]">
          보내주신 문의는 순차적으로 확인하며, 콘텐츠 제보는 검토 후 반영합니다. 개인정보(이메일 등)는
          문의 처리 목적으로만 사용되며 처리 후 파기됩니다. 자세한 내용은{' '}
          <a href="/privacy" className="underline">개인정보처리방침</a>을 참고하세요.
        </p>
      </div>
    </div>
  );
}
