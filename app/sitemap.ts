import { MetadataRoute } from "next";
import { COUNTRIES } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";
import { getAllSlugs } from "@/lib/articles";
import { getAllProcessSlugs } from "@/data/processes";

const BASE = "https://www.visaprocessinfo.com";

/* ------------------------------------------------------------------ */
/*  Next.js Sitemap Index                                              */
/*  Creates multiple sub-sitemaps split by category:                   */
/*    /sitemap/0.xml  → static + country pages                        */
/*    /sitemap/1.xml  → visa type + process pages                     */
/*    /sitemap/2.xml  → blog articles (batch 1, up to 250)            */
/*    /sitemap/3.xml  → blog articles (batch 2, 250+)                 */
/* ------------------------------------------------------------------ */

const BLOG_BATCH_SIZE = 250;

export async function generateSitemaps() {
  const totalArticles = getAllSlugs().length;
  const blogBatches = Math.ceil(totalArticles / BLOG_BATCH_SIZE);
  // id 0 = static + countries, id 1 = visa + process, id 2+ = blog batches
  const ids = [{ id: 0 }, { id: 1 }];
  for (let i = 0; i < blogBatches; i++) {
    ids.push({ id: 2 + i });
  }
  return ids;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  // ── Sitemap 0: Static + Country pages ──
  if (id === 0) {
    const staticPages: MetadataRoute.Sitemap = [
      { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
      { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
      { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
      { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
      { url: `${BASE}/disclaimer`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
      { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    ];
    const countryPages: MetadataRoute.Sitemap = COUNTRIES.map((c) => ({
      url: `${BASE}/country/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
    return [...staticPages, ...countryPages];
  }

  // ── Sitemap 1: Visa Type + Process pages ──
  if (id === 1) {
    const visaTypePages: MetadataRoute.Sitemap = VISA_TYPES.map((v) => ({
      url: `${BASE}/visa/${v.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    }));
    const processPages: MetadataRoute.Sitemap = getAllProcessSlugs().map((slug) => ({
      url: `${BASE}/process/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    }));
    return [...visaTypePages, ...processPages];
  }

  // ── Sitemap 2+: Blog articles in batches ──
  const batchIndex = id - 2;
  const allSlugs = getAllSlugs();
  const start = batchIndex * BLOG_BATCH_SIZE;
  const batch = allSlugs.slice(start, start + BLOG_BATCH_SIZE);

  return batch.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
}
