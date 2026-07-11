import { dreams, type Dream } from './dreams';

export interface SearchIndexItem {
  slug: string;
  keyword: string;
  aliases: string[];
  category: string;
  tags: string[];
  summary: string;
  fortune: string;
}

/** 클라이언트로 넘길 가벼운 검색 인덱스 */
export function buildSearchIndex(): SearchIndexItem[] {
  return dreams.map((d) => ({
    slug: d.slug,
    keyword: d.keyword,
    aliases: d.aliases,
    category: d.category,
    tags: d.tags,
    summary: d.summary,
    fortune: d.fortune,
  }));
}

const NOISE = [
  '꿈',
  '꾸는',
  '꾸었',
  '봤',
  '보는',
  '나오는',
  '나온',
  '하는',
  '있는',
  '에서',
  '으로',
  '에게',
  '을',
  '를',
  '이',
  '가',
  '은',
  '는',
  '의',
  '도',
];

export function normalize(q: string): string {
  return q.replace(/\s+/g, ' ').trim().toLowerCase();
}

/** 검색어를 의미 있는 토큰들로 분해 (조사·"꿈" 등 제거) */
export function tokenize(q: string): string[] {
  const cleaned = normalize(q).replace(/[^가-힣a-z0-9\s]/g, ' ');
  const words = cleaned.split(/\s+/).filter(Boolean);
  const tokens = new Set<string>();
  for (const w of words) {
    let t = w;
    for (const n of NOISE) {
      if (t.length > 1 && t.endsWith(n)) t = t.slice(0, -n.length);
    }
    if (t.length >= 1 && !NOISE.includes(t)) tokens.add(t);
    if (w.length >= 2) tokens.add(w);
  }
  return [...tokens];
}

function scoreItem(item: SearchIndexItem, tokens: string[], raw: string): number {
  const hay = [item.keyword, ...item.aliases, ...item.tags, item.summary]
    .join(' ')
    .toLowerCase();
  const keyword = item.keyword.toLowerCase();
  let score = 0;

  if (keyword === raw || keyword.replace(/\s*꿈$/, '') === raw) score += 100;

  for (const t of tokens) {
    if (!t) continue;
    // 키워드/별칭 정확 포함
    if (item.aliases.some((a) => a.toLowerCase() === t)) score += 40;
    if (keyword.includes(t)) score += 30;
    if (item.aliases.some((a) => a.toLowerCase().includes(t))) score += 20;
    if (item.tags.some((tag) => tag.toLowerCase().includes(t))) score += 8;
    if (item.summary.toLowerCase().includes(t)) score += 3;
    // 역방향 부분 일치 (검색어가 더 길 때)
    if (t.length >= 2 && hay.includes(t)) score += 2;
  }
  return score;
}

export interface SearchResult {
  item: SearchIndexItem;
  score: number;
  matchedTokens: string[];
}

/**
 * 부분 일치·동의어·복합 꿈을 아우르는 검색.
 * 복합 꿈("고양이가 하늘에서 떨어지는 꿈")은 토큰별로 매칭되는 항목을 모두 반환합니다.
 */
export function searchDreams(
  index: SearchIndexItem[],
  query: string,
): SearchResult[] {
  const raw = normalize(query);
  if (!raw) return [];
  const tokens = tokenize(query);

  const results: SearchResult[] = [];
  for (const item of index) {
    const score = scoreItem(item, tokens, raw);
    if (score > 0) {
      const matched = tokens.filter(
        (t) =>
          item.keyword.toLowerCase().includes(t) ||
          item.aliases.some((a) => a.toLowerCase().includes(t)) ||
          item.tags.some((tag) => tag.toLowerCase().includes(t)),
      );
      results.push({ item, score, matchedTokens: matched });
    }
  }
  return results.sort((a, b) => b.score - a.score);
}

/** 복합 꿈 여부 판단: 서로 다른 꿈 항목이 2개 이상 매칭되면 복합으로 간주 */
export function isCompound(results: SearchResult[]): boolean {
  const strong = results.filter((r) => r.score >= 20);
  return strong.length >= 2;
}

export function getDreamForResult(slug: string): Dream | undefined {
  return dreams.find((d) => d.slug === slug);
}
