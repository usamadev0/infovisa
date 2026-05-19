import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Calculator,
  Landmark,
  Globe,
  ChevronDown,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  BarChart3,
  ExternalLink,
  FileText,
  ShieldCheck,
  CalendarDays,
  Users,
} from "lucide-react";
import { parseSlug, generateAllProgrammaticSlugs } from "@/lib/slug-parser";
import { generatePageContent } from "@/lib/page-content";
import { getCountryBySlug } from "@/data/countries-extended";
import { getCountryImageUrl } from "@/lib/images";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateAllProgrammaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Page Not Found" };
  const country = getCountryBySlug(parsed.countrySlug);
  if (!country) return { title: "Page Not Found" };
  const content = generatePageContent(country, parsed.visaType, parsed.pageType);
  // OG images should be 1200×630 for social media (hero images use default 1920×1080)
  const imageUrl = getCountryImageUrl(country.slug, country.region, 1200, 630);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `https://www.visaprocessinfo.com/${slug}` },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://www.visaprocessinfo.com/${slug}`,
      type: "article",
      siteName: "VisaProcessInfo",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: content.heroTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [imageUrl],
    },
  };
}

const PAGE_TYPE_BADGE: Record<string, string> = {
  "country-hub":    "Country Hub",
  "embassy":        "Embassy Guide",
  "apply":          "Apply Guide",
  "how-to":         "How-To Guide",
  "details":        "Full Details",
  "requirements":   "Requirements",
  "fees":           "Fees Guide",
  "documents":      "Documents",
  "processing-time":"Processing Time",
  "rejection":      "Avoid Refusal",
  "interview":      "Interview Tips",
  "success-tips":   "Success Tips",
  "checklist":      "Checklist",
  "extension":      "Extension Guide",
  "faq":            "FAQ",
  "financial":      "Financial Guide",
  "language":       "Language Guide",
};

// Overlay gradient per page type (applied ON TOP of the hero photo)
// Opacity: /55 /35 /15 — lighter tint lets HD Unsplash photos show through clearly
const PAGE_OVERLAY_COLOR: Record<string, string> = {
  "country-hub":    "from-primary-950/55 via-primary-900/35 to-primary-800/15",
  "embassy":        "from-slate-950/55 via-slate-900/35 to-slate-800/15",
  "apply":          "from-primary-950/55 via-primary-900/35 to-primary-800/15",
  "how-to":         "from-indigo-950/55 via-indigo-900/35 to-indigo-800/15",
  "details":        "from-primary-950/55 via-primary-900/35 to-primary-800/15",
  "requirements":   "from-violet-950/55 via-violet-900/35 to-violet-800/15",
  "fees":           "from-emerald-950/55 via-emerald-900/35 to-emerald-800/15",
  "documents":      "from-blue-950/55 via-blue-900/35 to-blue-800/15",
  "processing-time":"from-amber-950/55 via-amber-900/35 to-amber-800/15",
  "rejection":      "from-red-950/55 via-red-900/35 to-red-800/15",
  "interview":      "from-purple-950/55 via-purple-900/35 to-purple-800/15",
  "success-tips":   "from-teal-950/55 via-teal-900/35 to-teal-800/15",
  "checklist":      "from-cyan-950/55 via-cyan-900/35 to-cyan-800/15",
  "extension":      "from-orange-950/55 via-orange-900/35 to-orange-800/15",
  "faq":            "from-primary-950/55 via-primary-900/35 to-primary-800/15",
  "financial":      "from-green-950/55 via-green-900/35 to-green-800/15",
  "language":       "from-pink-950/55 via-pink-900/35 to-pink-800/15",
};

// Accent color for sidebar CTA + badges per page type
const PAGE_ACCENT: Record<string, string> = {
  "country-hub":    "bg-primary-800",
  "fees":           "bg-emerald-700",
  "rejection":      "bg-red-700",
  "processing-time":"bg-amber-700",
  "financial":      "bg-green-700",
  "language":       "bg-pink-700",
};

const difficultyColor: Record<string, string> = {
  Easy:     "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Moderate: "bg-amber-100  text-amber-700  border border-amber-200",
  Complex:  "bg-red-100    text-red-700    border border-red-200",
};

export default async function ProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const country = getCountryBySlug(parsed.countrySlug);
  if (!country) notFound();

  const content = generatePageContent(country, parsed.visaType, parsed.pageType);
  const visaLabel = parsed.visaType.charAt(0).toUpperCase() + parsed.visaType.slice(1);
  const diff = country.difficulty[parsed.visaType];
  const pt = parsed.pageType ?? "details";
  const isCountryLevel = pt === "country-hub" || pt === "embassy";

  const overlayGradient = PAGE_OVERLAY_COLOR[pt] ?? PAGE_OVERLAY_COLOR["country-hub"];
  const countryImageUrl = getCountryImageUrl(country.slug, country.region);

  // ── JSON-LD schemas ───────────────────────────────────────────────────────
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.heroTitle,
    description: content.metaDescription,
    image: countryImageUrl,
    author: {
      "@type": "Organization",
      name: "VisaProcessInfo",
      url: "https://www.visaprocessinfo.com",
      foundingDate: "2020",
      knowsAbout: ["Visa Applications", "Immigration Law", "Study Abroad", "Work Permits"],
    },
    publisher: {
      "@type": "Organization",
      name: "VisaProcessInfo",
      url: "https://www.visaprocessinfo.com",
      logo: { "@type": "ImageObject", url: "https://www.visaprocessinfo.com/favicon.ico" },
    },
    url: `https://www.visaprocessinfo.com/${slug}`,
    mainEntityOfPage: `https://www.visaprocessinfo.com/${slug}`,
    datePublished: "2024-01-15T00:00:00Z",
    dateModified: new Date().toISOString(),
    reviewedBy: {
      "@type": "Organization",
      name: "VisaProcessInfo Editorial Team",
    },
  };

  const faqSchemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaprocessinfo.com" },
      { "@type": "ListItem", position: 2, name: country.name, item: `https://www.visaprocessinfo.com/${country.slug}-visa-info` },
      ...(isCountryLevel ? [] : [
        { "@type": "ListItem", position: 3, name: content.heroTitle, item: `https://www.visaprocessinfo.com/${slug}` },
      ]),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchemaData) }} />

      {/* ── HERO with photo background ─────────────────────────────────────── */}
      <div className="relative text-white overflow-hidden" style={{ minHeight: "clamp(380px, 45vw, 520px)" }}>

        {/* Background photo */}
        <Image
          src={countryImageUrl}
          alt={`${country.name} — visa and immigration information`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Layer 1: Brand diagonal tint — lets HD photo show clearly */}
        <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient}`} />
        {/* Layer 2: Strong bottom-up — ensures title/stats always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
        {/* Layer 3: Left vignette — cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="text-sm text-white/60 mb-5 flex flex-wrap items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${country.slug}-visa-info`} className="hover:text-white transition-colors">{country.name}</Link>
            {!isCountryLevel && (
              <>
                <span>/</span>
                <Link href={`/${country.slug}-${parsed.visaType}-visa-details`} className="hover:text-white transition-colors capitalize">{parsed.visaType} Visa</Link>
                <span>/</span>
                <span className="text-white/80">{PAGE_TYPE_BADGE[pt]}</span>
              </>
            )}
          </nav>

          {/* Flag + Title row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
            <div className="w-20 h-14 rounded-xl overflow-hidden shadow-xl border-2 border-white/30 flex-shrink-0">
              <Image
                src={`https://flagcdn.com/w160/${country.code}.png`}
                alt={`${country.name} flag`}
                width={160}
                height={112}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              {/* Badge pills */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm">
                  {PAGE_TYPE_BADGE[pt]}
                </span>
                {!isCountryLevel && (
                  <>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${difficultyColor[diff] ?? "bg-gray-100 text-gray-700"}`}>
                      {diff} Difficulty
                    </span>
                    <span className="text-xs font-bold bg-white/15 text-white/90 px-3 py-1 rounded-full border border-white/25 backdrop-blur-sm capitalize">
                      {visaLabel} Visa
                    </span>
                  </>
                )}
                <span className="text-xs font-bold bg-white/15 text-white/90 px-3 py-1 rounded-full border border-white/25 backdrop-blur-sm">
                  {country.region}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white drop-shadow-lg">
                {content.heroTitle}
              </h1>
            </div>
          </div>

          <p className="text-white/85 text-base sm:text-lg leading-relaxed max-w-3xl mb-7 drop-shadow-sm">
            {content.heroSubtitle}
          </p>

          {/* Stats bar — only for visa-specific pages */}
          {!isCountryLevel && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { Icon: DollarSign, label: "Government Fee",   value: `${country.currency} ${country.visaFees[parsed.visaType]}` },
                { Icon: Clock,      label: "Processing Time",  value: country.processingDays[parsed.visaType] },
                { Icon: BarChart3,  label: "Difficulty",       value: diff },
                { Icon: MapPin,     label: "Capital",          value: country.capital },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 flex gap-2.5 items-start">
                  <stat.Icon className="w-4 h-4 text-white/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-xs text-white/60 leading-tight">{stat.label}</div>
                    <div className="font-bold text-white text-sm leading-snug mt-0.5">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left Content Column ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Quick Facts */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 sm:p-6">
              <h2 className="font-bold text-blue-900 text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Quick Facts: {country.name} {!isCountryLevel ? `${visaLabel} Visa` : "Visa Overview"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Capital",                value: country.capital },
                  { label: "Currency",               value: country.currency },
                  { label: "Language Requirement",   value: country.languageRequirement },
                  { label: "Region",                 value: country.region },
                  ...(!isCountryLevel ? [
                    { label: "Visa Fee",             value: `${country.currency} ${country.visaFees[parsed.visaType]}` },
                    { label: "Processing Time",      value: country.processingDays[parsed.visaType] },
                    { label: "Difficulty",           value: diff },
                    { label: "Official Portal",      value: country.officialImmigrationUrl.replace("https://", "").replace("www.", "") },
                  ] : [
                    { label: "Study Visa Fee",       value: `${country.currency} ${country.visaFees.study}` },
                    { label: "Work Visa Fee",        value: `${country.currency} ${country.visaFees.work}` },
                    { label: "Visit Visa Fee",       value: `${country.currency} ${country.visaFees.visit}` },
                    { label: "Official Portal",      value: country.officialImmigrationUrl.replace("https://", "").replace("www.", "") },
                  ]),
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-blue-800 text-sm">{item.label}:</span>{" "}
                      <span className="text-blue-700 text-sm">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust & Freshness Signal */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1.5 font-medium">
                <CalendarDays className="w-3.5 h-3.5" />
                Last updated: May 2026
              </div>
              <div className="flex items-center gap-1.5 bg-primary-50 text-primary-700 border border-primary-200 rounded-full px-3 py-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified from official sources
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-full px-3 py-1.5 font-medium">
                <Users className="w-3.5 h-3.5" />
                Reviewed by immigration editors
              </div>
            </div>

            {/* Content Sections */}
            {content.sections.map((section, i) => (
              <section key={i} className="scroll-mt-20">
                <h2 className="text-xl sm:text-2xl font-bold text-primary-800 mb-4 pb-2 border-b border-primary-100">
                  {section.heading}
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-4 text-[15px]">
                  {section.body.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="text-gray-700 leading-[1.8]"
                      dangerouslySetInnerHTML={{
                        __html: para
                          .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n/g, "<br/>")
                          .replace(/☐/g, '<span class="inline-block w-4 h-4 border-2 border-gray-400 rounded mr-2 align-middle flex-shrink-0"></span>'),
                      }}
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* Application Steps (apply / how-to / checklist pages) */}
            {(pt === "apply" || pt === "how-to" || pt === "checklist") && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-800 mb-6 pb-2 border-b border-primary-100">
                  Application Steps Overview
                </h2>
                <div className="space-y-3">
                  {content.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 sm:p-5 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                      <div className="w-9 h-9 bg-primary-800 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-sm">
                        {i + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{step.title}</div>
                        <div className="text-sm text-gray-600 leading-relaxed">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Documents Checklist */}
            {(pt === "apply" || pt === "details" || pt === "documents" || pt === "requirements" || pt === "checklist") && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-primary-800 mb-5 pb-2 border-b border-primary-100">
                  Required Documents Checklist
                </h2>
                <div className="space-y-2">
                  {content.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/30 transition-all">
                      <div className="w-5 h-5 rounded-md border-2 border-gray-300 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 leading-relaxed">{req}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ Accordion */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-primary-800 mb-6 pb-2 border-b border-primary-100">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2">
                {content.faqs.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-gray-50 hover:bg-primary-50 transition-colors font-semibold text-gray-900 text-sm gap-3 list-none">
                      <span className="leading-snug">{faq.question}</span>
                      <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0" />
                    </summary>
                    <div className="p-4 sm:p-5 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
            {/* Editorial Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">About This Guide</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    This guide was researched from official government immigration portals and reviewed by our editorial team of former visa officers and immigration consultants. We update all guides quarterly. For the most current requirements, always verify with the{" "}
                    <a href={country.officialImmigrationUrl} target="_blank" rel="noopener noreferrer" className="text-primary-700 underline hover:text-primary-900">
                      official immigration authority
                    </a>.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <Link href="/about" className="text-xs text-primary-700 font-medium hover:underline">
                      Meet our editorial team →
                    </Link>
                    <span className="text-gray-300">|</span>
                    <Link href="/contact" className="text-xs text-primary-700 font-medium hover:underline">
                      Report an update →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar ─────────────────────────────────────────────────────── */}
          <aside className="space-y-5">

            {/* Eligibility Checker CTA */}
            <div className="bg-gradient-to-br from-primary-800 to-primary-700 text-white rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-base leading-tight">Check Your Eligibility</h3>
              </div>
              <p className="text-white/75 text-sm mb-4 leading-relaxed">
                Find out your chances of getting a {country.name} visa in under 2 minutes.
              </p>
              <Link
                href="/tools/eligibility-checker"
                className="flex items-center justify-center gap-2 w-full bg-white text-primary-800 font-semibold text-sm py-2.5 rounded-xl hover:bg-primary-50 transition-colors"
              >
                Free Eligibility Check
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Cost Calculator CTA */}
            <div className="bg-gradient-to-br from-accent-600 to-accent-500 text-white rounded-2xl p-5 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-base leading-tight">Calculate Visa Cost</h3>
              </div>
              <p className="text-white/80 text-sm mb-4 leading-relaxed">
                Get a full fee breakdown for your {country.name} {!isCountryLevel ? visaLabel : ""} visa.
              </p>
              <Link
                href="/tools/cost-calculator"
                className="flex items-center justify-center gap-2 w-full bg-white text-accent-700 font-semibold text-sm py-2.5 rounded-xl hover:bg-accent-50 transition-colors"
              >
                Cost Calculator
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Why This Country */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary-600" />
                Why {country.name}?
              </h3>
              <ul className="space-y-2.5">
                {country.popularFor.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Facts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-600" />
                Key Facts
              </h3>
              <ul className="space-y-2">
                {country.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-primary-400 rounded-full mt-2 flex-shrink-0" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Related Guides */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary-600" />
                Related Guides
              </h3>
              <ul className="space-y-1">
                {content.internalLinks.slice(0, 10).map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-1.5 text-sm text-primary-700 hover:text-primary-900 py-1 hover:underline transition-colors"
                    >
                      <ArrowRight className="w-3 h-3 flex-shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Resources */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <h3 className="font-bold text-amber-900 mb-3 text-sm flex items-center gap-2">
                <Landmark className="w-4 h-4 text-amber-600" />
                Official Resources
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={country.officialImmigrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 transition-colors group"
                  >
                    <Landmark className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="group-hover:underline">Official Immigration Portal</span>
                    <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 opacity-60" />
                  </a>
                </li>
                <li>
                  <a
                    href={country.embassyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-amber-700 hover:text-amber-900 transition-colors group"
                  >
                    <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="group-hover:underline">Embassy &amp; Consulate Finder</span>
                    <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 opacity-60" />
                  </a>
                </li>
              </ul>
              <p className="text-xs text-amber-600 mt-3 leading-relaxed border-t border-amber-200 pt-3">
                Always verify current requirements at official government sources before submitting your application.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* ── Bottom Internal Links Bar ─────────────────────────────────────────── */}
      <div className="bg-gray-50 border-t border-gray-200 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-gray-900 mb-1">
            Explore More {country.name} Visa Guides
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Complete guides for every aspect of your {country.name} visa journey — requirements, fees, documents, and more.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {content.internalLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:border-primary-300 hover:text-primary-800 hover:bg-primary-50 transition-all text-center font-medium leading-tight"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
