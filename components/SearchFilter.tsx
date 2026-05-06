"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";

export default function SearchFilter() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<string>("all");

  const filteredCountries = useMemo(() => {
    const q = query.toLowerCase();
    return COUNTRIES.filter((c) => {
      const matchesQuery =
        !q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q);
      const matchesType =
        activeType === "all" || c.visaTypes.includes(activeType);
      return matchesQuery && matchesType;
    });
  }, [query, activeType]);

  return (
    <div>
      {/* Search input */}
      <div className="relative max-w-xl mx-auto mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="search"
          placeholder="Search by country or region..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
        />
      </div>

      {/* Visa type filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {[{ slug: "all", name: "All Countries", icon: "🌍" }, ...VISA_TYPES].map((v) => (
          <button
            key={v.slug}
            onClick={() => setActiveType(v.slug)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
              activeType === v.slug
                ? "bg-primary-800 text-white border-primary-800 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:border-primary-400 hover:text-primary-800"
            }`}
          >
            {"icon" in v ? v.icon : ""} {v.name}
          </button>
        ))}
      </div>

      {/* Country grid */}
      {filteredCountries.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No countries match your search. Try a different keyword.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredCountries.map((c) => (
            <Link
              key={c.slug}
              href={`/country/${c.slug}`}
              className="group flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-300 transition-all duration-200 text-center"
            >
              <span className="text-4xl">{c.flag}</span>
              <span className="font-semibold text-gray-900 group-hover:text-primary-800 transition-colors text-sm">
                {c.name}
              </span>
              <span className="text-xs text-gray-500">{c.region}</span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  c.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : c.difficulty === "Moderate"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {c.difficulty}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
