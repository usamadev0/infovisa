"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArticleMeta } from "@/lib/articles";

const CATEGORIES = [
  "All",
  "Study Visa Guides",
  "Work Visa Guides",
  "Tourist Visa Guides",
  "Immigration Guides",
  "Country-Specific Guides",
];

const VISA_ICONS: Record<string, string> = {
  study: "🎓",
  work: "💼",
  tourist: "✈️",
  immigration: "🏠",
  country: "🌍",
};

const PAGE_SIZE = 24;

export default function BlogList({ articles }: { articles: ArticleMeta[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return articles.filter((a) => {
      const matchesCat = category === "All" || a.category === category;
      const matchesSearch =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.countryName.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [articles, search, category]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
  };
  const handleSearch = (q: string) => {
    setSearch(q);
    setPage(1);
  };

  return (
    <div>
      {/* Search */}
      <div className="relative max-w-lg mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search visa guides, countries, topics..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              category === cat
                ? "bg-primary-800 text-white border-primary-800 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:border-primary-400 hover:text-primary-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-5">
        {filtered.length} guide{filtered.length !== 1 ? "s" : ""} found
        {search ? ` for "${search}"` : ""}
        {category !== "All" ? ` in ${category}` : ""}
      </p>

      {/* Article grid */}
      {paginated.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg font-medium">No guides found</p>
          <p className="text-sm mt-1">Try a different search term or category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="group flex flex-col bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              <div className="p-5 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{VISA_ICONS[a.visaType] ?? "📄"}</span>
                  <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
                    {a.countryName}
                  </span>
                </div>
                <h2 className="font-semibold text-gray-900 group-hover:text-primary-800 transition-colors text-sm leading-snug line-clamp-3">
                  {a.title}
                </h2>
                <p className="text-xs text-gray-500 mt-3 line-clamp-2 leading-relaxed">
                  {a.metaDescription}
                </p>
              </div>
              <div className="px-5 pb-4 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>{a.category.split(" ").slice(0, 2).join(" ")}</span>
                <span>{a.readingTimeMinutes} min read</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
            const pageNum = page <= 4
              ? i + 1
              : page >= totalPages - 3
              ? totalPages - 6 + i
              : page - 3 + i;
            if (pageNum < 1 || pageNum > totalPages) return null;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  pageNum === page
                    ? "bg-primary-800 text-white"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
