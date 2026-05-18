"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Globe, GraduationCap, Briefcase, Building2, Plane, Home } from "lucide-react";
import { COUNTRIES_EXTENDED } from "@/data/countries-extended";

const REGIONS = [
  "All Regions",
  "North America",
  "Europe",
  "Asia",
  "South Asia",
  "Southeast Asia",
  "Middle East",
  "Africa",
  "South America",
  "Central America",
  "Oceania",
  "Pacific",
  "Caribbean",
];

const VISA_FILTERS = [
  { key: "all", label: "All Visas", icon: Globe },
  { key: "study", label: "Study", icon: GraduationCap },
  { key: "work", label: "Work", icon: Briefcase },
  { key: "business", label: "Business", icon: Building2 },
  { key: "visit", label: "Visit", icon: Plane },
  { key: "immigration", label: "Immigrate", icon: Home },
];

function getDifficultyConfig(diff: string) {
  switch (diff) {
    case "Easy":
      return { label: "Easy", className: "bg-emerald-100 text-emerald-700 border border-emerald-200" };
    case "Hard":
      return { label: "Complex", className: "bg-red-100 text-red-700 border border-red-200" };
    default:
      return { label: "Moderate", className: "bg-amber-100 text-amber-700 border border-amber-200" };
  }
}

export default function SearchFilter() {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All Regions");
  const [activeVisa, setActiveVisa] = useState("all");

  const filteredCountries = useMemo(() => {
    const q = query.toLowerCase().trim();
    return COUNTRIES_EXTENDED.filter((c) => {
      const matchesQuery =
        !q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q);
      const matchesRegion = activeRegion === "All Regions" || c.region === activeRegion;
      return matchesQuery && matchesRegion;
    });
  }, [query, activeRegion, activeVisa]);

  return (
    <div>
      {/* Search input */}
      <div className="relative max-w-2xl mx-auto mb-6">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          placeholder="Search country, region, or capital city…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 text-sm"
        />
      </div>

      {/* Visa type quick filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {VISA_FILTERS.map((v) => {
          const Icon = v.icon;
          return (
            <button
              key={v.key}
              onClick={() => setActiveVisa(v.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-150 ${
                activeVisa === v.key
                  ? "bg-primary-800 text-white border-primary-800 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary-400 hover:text-primary-800"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {v.label}
            </button>
          );
        })}
      </div>

      {/* Region filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {REGIONS.map((r) => (
          <button
            key={r}
            onClick={() => setActiveRegion(r)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              activeRegion === r
                ? "bg-accent-600 text-white border-accent-600 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-accent-400 hover:text-accent-700"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-gray-500 mb-6">
        Showing <span className="font-bold text-gray-900">{filteredCountries.length}</span> of{" "}
        <span className="font-bold text-gray-900">{COUNTRIES_EXTENDED.length}</span> countries
      </p>

      {/* Country grid */}
      {filteredCountries.length === 0 ? (
        <div className="text-center py-16">
          <Globe className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 font-medium">No countries match your search.</p>
          <button
            onClick={() => { setQuery(""); setActiveRegion("All Regions"); }}
            className="mt-3 text-sm text-primary-700 hover:text-primary-900 font-semibold"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredCountries.map((c) => {
            const diff = getDifficultyConfig(c.difficulty.visit);
            return (
              <Link
                key={c.slug}
                href={`/${c.slug}-visa-info`}
                className="group flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-primary-200 hover:-translate-y-0.5 transition-all duration-200 text-center"
              >
                {/* Flag image */}
                <div className="w-14 h-10 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                  <Image
                    src={`https://flagcdn.com/w80/${c.code}.png`}
                    alt={`${c.name} flag`}
                    width={80}
                    height={56}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                </div>
                {/* Name */}
                <span className="font-semibold text-gray-900 group-hover:text-primary-800 transition-colors text-xs sm:text-sm leading-tight line-clamp-2">
                  {c.name}
                </span>
                {/* Region */}
                <span className="text-xs text-gray-400 -mt-1 line-clamp-1">{c.region}</span>
                {/* Difficulty badge */}
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${diff.className}`}>
                  {diff.label}
                </span>
                {/* Fee */}
                <span className="text-xs text-gray-400">{c.currency} {c.visaFees.visit} visit</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
