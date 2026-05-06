import manifestJson from "@/data/article-manifest.json";

export interface ArticleMeta {
  slug: string;
  title: string;
  metaDescription: string;
  primaryKeyword: string;
  tags: string[];
  category: string;
  visaType: string;
  country: string;
  countryName: string;
  publishedAt: string;
  readingTimeMinutes: number;
}

export const ALL_ARTICLES: ArticleMeta[] = manifestJson as ArticleMeta[];

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return ALL_ARTICLES.find((a) => a.slug === slug);
}

export function getArticlesByCountry(countrySlug: string): ArticleMeta[] {
  return ALL_ARTICLES.filter((a) => a.country === countrySlug).slice(0, 12);
}

export function getArticlesByVisaType(visaType: string): ArticleMeta[] {
  return ALL_ARTICLES.filter((a) => a.visaType === visaType).slice(0, 12);
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return ALL_ARTICLES.filter((a) => a.category === category);
}

export function getAllSlugs(): string[] {
  return ALL_ARTICLES.map((a) => a.slug);
}

/** Simple hash for deterministic content variation */
export function simpleHash(str: string): number {
  let hash = 0;
  for (const char of str) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0;
  }
  return Math.abs(hash);
}
