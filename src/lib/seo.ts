import type { Metadata } from 'next';
import { site } from './site';
import type { Dream } from './dreams';
import { getCategory } from './dreams';
import type { PostMeta, Faq } from './posts';

interface PageSeoInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  publishedTime?: string;
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = 'website',
  publishedTime,
}: PageSeoInput): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = path === '/' ? `${site.fullName}` : `${title} | ${site.name}`;
  const ogImage = `${site.url}/opengraph-image`;

  return {
    title: fullTitle,
    description,
    keywords: keywords ?? [...site.keywords],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.fullName,
      locale: site.locale,
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: site.fullName }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.fullName,
    url: site.url,
    description: site.description,
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${site.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.fullName,
    url: site.url,
    logo: `${site.url}/icon`,
    email: site.email,
    description: site.description,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${site.url}${it.path}`,
    })),
  };
}

export function dreamArticleJsonLd(dream: Dream) {
  const cat = getCategory(dream.category);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${dream.keyword} 해몽 — 전통·심리학적 해석`,
    description: dream.summary,
    articleSection: cat.label,
    keywords: [dream.keyword, ...dream.tags, '꿈해몽', '해몽'].join(', '),
    inLanguage: 'ko-KR',
    mainEntityOfPage: `${site.url}/dreams/${dream.slug}`,
    author: { '@type': 'Organization', name: site.fullName },
    publisher: {
      '@type': 'Organization',
      name: site.fullName,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon` },
    },
  };
}

export function postArticleJsonLd(post: PostMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    inLanguage: 'ko-KR',
    mainEntityOfPage: `${site.url}/guides/${post.slug}`,
    author: { '@type': 'Organization', name: site.fullName },
    publisher: {
      '@type': 'Organization',
      name: site.fullName,
      logo: { '@type': 'ImageObject', url: `${site.url}/icon` },
    },
  };
}

export function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
