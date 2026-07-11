import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export interface Faq {
  q: string;
  a: string;
}

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  keywords: string[];
  popular?: number;
  faqs?: Faq[];
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface Post extends PostMeta {
  html: string;
  toc: TocItem[];
}

function slugifyText(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^가-힣a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

function extractToc(markdown: string): TocItem[] {
  const lines = markdown.split('\n');
  const toc: TocItem[] = [];
  let inCode = false;
  for (const line of lines) {
    if (line.trim().startsWith('```')) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(line);
    if (m) {
      const level = m[1].length as 2 | 3;
      const text = m[2].replace(/[*_`]/g, '').trim();
      toc.push({ id: slugifyText(text), text, level });
    }
  }
  return toc;
}

function readingMinutes(markdown: string): number {
  const chars = markdown.replace(/\s/g, '').length;
  return Math.max(1, Math.round(chars / 500));
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function parseFile(slug: string) {
  const full = path.join(POSTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return { fm, content };
}

export function getPostMeta(slug: string): PostMeta {
  const { fm, content } = parseFile(slug);
  return {
    slug,
    ...fm,
    tags: fm.tags ?? [],
    keywords: fm.keywords ?? [],
    readingMinutes: readingMinutes(content),
  };
}

export function getAllPostMeta(): PostMeta[] {
  return getPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const { fm, content } = parseFile(slug);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    // allowDangerousHtml 은 사용하지 않음 → 원시 HTML 미허용(XSS 방지)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  return {
    slug,
    ...fm,
    tags: fm.tags ?? [],
    keywords: fm.keywords ?? [],
    readingMinutes: readingMinutes(content),
    html: String(file),
    toc: extractToc(content),
  };
}

export function getPopularPosts(limit = 5): PostMeta[] {
  return getAllPostMeta()
    .filter((p) => typeof p.popular === 'number')
    .sort((a, b) => (a.popular! - b.popular!))
    .slice(0, limit);
}

export function getRelatedPosts(current: PostMeta, limit = 3): PostMeta[] {
  return getAllPostMeta()
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      p,
      score:
        (p.category === current.category ? 2 : 0) +
        p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
}

export function getAllPostTags(): string[] {
  const set = new Set<string>();
  for (const p of getAllPostMeta()) p.tags.forEach((t) => set.add(t));
  return [...set].sort((a, b) => a.localeCompare(b, 'ko'));
}
