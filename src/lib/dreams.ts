import { dreams as rawDreams } from './dreams-data';

export type Fortune = '길몽' | '흉몽' | '중립' | '복합';

export type CategoryId =
  | 'animal'
  | 'person'
  | 'nature'
  | 'action'
  | 'object'
  | 'body'
  | 'emotion';

export interface Situation {
  title: string;
  text: string;
}

export interface Dream {
  slug: string;
  keyword: string;
  /** 검색용 동의어·유사어 */
  aliases: string[];
  category: CategoryId;
  tags: string[];
  summary: string;
  fortune: Fortune;
  traditional: string;
  psychological: string;
  situations: Situation[];
  /** 관련 꿈 slug 목록 */
  related: string[];
  /** 인기 순위 (작을수록 인기) */
  popular?: number;
}

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'animal',
    label: '동물',
    emoji: '🐍',
    description: '뱀·개·고양이·호랑이 등 동물이 등장하는 꿈',
  },
  {
    id: 'person',
    label: '사람',
    emoji: '👤',
    description: '가족·연인·연예인 등 인물이 등장하는 꿈',
  },
  {
    id: 'nature',
    label: '자연',
    emoji: '🌊',
    description: '물·불·바다·지진 등 자연 현상이 나오는 꿈',
  },
  {
    id: 'action',
    label: '행동',
    emoji: '🏃',
    description: '쫓기고, 떨어지고, 시험 보는 등 행위가 중심인 꿈',
  },
  {
    id: 'object',
    label: '사물',
    emoji: '👟',
    description: '돈·신발·화장실 등 사물·장소가 나오는 꿈',
  },
  {
    id: 'body',
    label: '신체',
    emoji: '🦷',
    description: '이빨·머리카락·피 등 몸과 관련된 꿈',
  },
  {
    id: 'emotion',
    label: '감정',
    emoji: '💗',
    description: '기쁨·두려움·슬픔 등 감정이 강하게 남는 꿈',
  },
];

export const fortuneStyle: Record<Fortune, { label: string; className: string }> = {
  길몽: { label: '길몽', className: 'bg-moon/15 text-moon border-moon/30' },
  흉몽: { label: '흉몽', className: 'bg-rose-400/10 text-rose-300 border-rose-400/30' },
  중립: { label: '중립', className: 'bg-lavender/10 text-lavender border-lavender/30' },
  복합: { label: '복합', className: 'bg-aurora/10 text-aurora border-aurora/30' },
};

// 슬러그 중복·형식 검증을 거친 정렬된 목록
export const dreams: Dream[] = [...rawDreams].sort((a, b) =>
  a.keyword.localeCompare(b.keyword, 'ko'),
);

export function getCategory(id: CategoryId): Category {
  return categories.find((c) => c.id === id) ?? categories[0];
}

export function getDreamBySlug(slug: string): Dream | undefined {
  return dreams.find((d) => d.slug === slug);
}

export function getDreamsByCategory(id: CategoryId): Dream[] {
  return dreams.filter((d) => d.category === id);
}

export function getPopularDreams(limit = 12): Dream[] {
  return [...dreams]
    .filter((d) => typeof d.popular === 'number')
    .sort((a, b) => (a.popular! - b.popular!))
    .slice(0, limit);
}

export function getAllTags(): { tag: string; count: number }[] {
  const map = new Map<string, number>();
  for (const d of dreams) {
    for (const t of d.tags) map.set(t, (map.get(t) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'ko'));
}

export function getDreamsByTag(tag: string): Dream[] {
  return dreams.filter((d) => d.tags.includes(tag));
}

export function getRelatedDreams(dream: Dream, limit = 6): Dream[] {
  const explicit = dream.related
    .map((s) => getDreamBySlug(s))
    .filter((d): d is Dream => Boolean(d));
  if (explicit.length >= limit) return explicit.slice(0, limit);

  // 같은 카테고리·공유 태그로 보강
  const seen = new Set([dream.slug, ...explicit.map((d) => d.slug)]);
  const extra = dreams
    .filter((d) => !seen.has(d.slug))
    .map((d) => {
      const shared = d.tags.filter((t) => dream.tags.includes(t)).length;
      const sameCat = d.category === dream.category ? 1 : 0;
      return { d, score: shared * 2 + sameCat };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.d);

  return [...explicit, ...extra].slice(0, limit);
}
