import { ALL_ARTICLES, ArticleMeta } from "./articles";

/**
 * Returns up to `limit` related articles.
 * Priority: same category + country > same category > same country > any.
 */
export function getRelatedArticles(
  slug: string,
  limit = 5
): ArticleMeta[] {
  const current = ALL_ARTICLES.find((a) => a.slug === slug);
  if (!current) return ALL_ARTICLES.slice(0, limit);

  const others = ALL_ARTICLES.filter((a) => a.slug !== slug);

  const sameAll = others.filter(
    (a) => a.category === current.category && a.country === current.country
  );
  const sameCat = others.filter(
    (a) => a.category === current.category && a.country !== current.country
  );
  const sameCountry = others.filter(
    (a) => a.country === current.country && a.category !== current.category
  );

  const pool = [...sameAll, ...sameCat, ...sameCountry, ...others];
  const seen = new Set<string>();
  const result: ArticleMeta[] = [];

  for (const a of pool) {
    if (!seen.has(a.slug)) {
      seen.add(a.slug);
      result.push(a);
      if (result.length === limit) break;
    }
  }

  return result;
}
