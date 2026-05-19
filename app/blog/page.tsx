import type { Metadata } from "next";
import { ALL_ARTICLES } from "@/lib/articles";
import BlogList from "./BlogList";
import { itemListSchema } from "@/lib/jsonld";
import { BLOG_KEYWORDS } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: "Visa & Immigration Blog — 10,000+ Guides for 2026",
  description:
    "Browse 10,000+ visa and immigration guides covering study visas, work permits, tourist visas, and PR pathways for 131 countries including USA, UK, Canada, Australia, and Germany.",
  alternates: { canonical: "https://www.visaprocessinfo.com/blog" },
  keywords: BLOG_KEYWORDS,
};

export default function BlogPage() {
  return (
    <>
      {/* Hero banner — positioned below fixed 64px navbar */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-5">
              <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
              Updated for {new Date().getFullYear()}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
              Visa &amp; Immigration Guides
            </h1>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed">
              {ALL_ARTICLES.length}+ free guides covering every visa type, country, and immigration scenario — always free, always current.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BlogList articles={ALL_ARTICLES} />
      </div>
    </>
  );
}
