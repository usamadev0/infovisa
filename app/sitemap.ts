import { MetadataRoute } from "next";
import { COUNTRIES } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";
import { getAllSlugs } from "@/lib/articles";
import { getAllProcessSlugs } from "@/data/processes";

const BASE = "https://www.visaprocessinfo.com";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const articlePages: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...countryPages, ...visaTypePages, ...processPages, ...articlePages];
}
