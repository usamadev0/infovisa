import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  GraduationCap,
  Briefcase,
  Plane,
  Home,
  Building2,
  Globe,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { VISA_TYPES, getVisaTypeBySlug } from "@/data/visa-types";
import { COUNTRIES_EXTENDED } from "@/data/countries-extended";
import { getArticlesByVisaType } from "@/lib/articles";
import { faqSchema, breadcrumbSchema, howToSchema } from "@/lib/jsonld";
import FAQSection from "@/components/FAQSection";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import Button from "@/components/ui/Button";
import { VISA_TYPE_KEYWORDS, HOMEPAGE_KEYWORDS, mergeKeywords } from "@/lib/seo-keywords";
import { getVisaTypeImageUrl } from "@/lib/images";
import { ShieldCheck, CalendarDays, Users } from "lucide-react";

interface Props {
  params: Promise<{ type: string }>;
}

const VISA_LUCIDE: Record<string, React.ElementType> = {
  study:       GraduationCap,
  work:        Briefcase,
  tourist:     Plane,
  immigration: Home,
  business:    Building2,
};

const VISA_HERO_GRADIENT: Record<string, string> = {
  study:       "from-blue-950/55 via-blue-900/35 to-blue-800/15",
  work:        "from-violet-950/55 via-violet-900/35 to-violet-800/15",
  tourist:     "from-sky-950/55 via-sky-900/35 to-sky-800/15",
  immigration: "from-emerald-950/55 via-emerald-900/35 to-emerald-800/15",
  business:    "from-amber-950/55 via-amber-900/35 to-amber-800/15",
};

export function generateStaticParams() {
  return VISA_TYPES.map((v) => ({ type: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const visa = getVisaTypeBySlug(type);
  if (!visa) return {};
  // OG images at 1200×630 for social media (hero images use default 1920×1080)
  const imageUrl = getVisaTypeImageUrl(visa.slug, 1200, 630);
  return {
    title: `${visa.name} Guide ${new Date().getFullYear()} — Requirements, Process & Countries`,
    description: `Complete ${visa.name.toLowerCase()} guide for ${new Date().getFullYear()}. Requirements, step-by-step process, fees, and country-specific information for 131 destinations worldwide.`,
    alternates: { canonical: `https://www.visaprocessinfo.com/visa/${visa.slug}` },
    keywords: mergeKeywords(VISA_TYPE_KEYWORDS[visa.slug] ?? [], HOMEPAGE_KEYWORDS.slice(0, 20)),
    openGraph: {
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${visa.name} guide` }],
    },
  };
}

export default async function VisaTypePage({ params }: Props) {
  const { type } = await params;
  const visa = getVisaTypeBySlug(type);
  if (!visa) notFound();

  // Use top 24 countries from COUNTRIES_EXTENDED for display
  const featuredCountries = COUNTRIES_EXTENDED.slice(0, 24);
  const sidebarCountries = COUNTRIES_EXTENDED.slice(0, 6);
  const relatedArticles = getArticlesByVisaType(visa.slug);

  const VisaIcon = VISA_LUCIDE[visa.slug] ?? Globe;
  const heroGradient = VISA_HERO_GRADIENT[visa.slug] ?? VISA_HERO_GRADIENT.study;
  const heroImageUrl = getVisaTypeImageUrl(visa.slug);

  const faqLd = faqSchema(visa.faqs);
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "https://www.visaprocessinfo.com" },
    { name: "Visa Types", url: "https://www.visaprocessinfo.com/#visa-types" },
    { name: visa.name, url: `https://www.visaprocessinfo.com/visa/${visa.slug}` },
  ]);
  const howToLd = howToSchema(
    `How to Apply for a ${visa.name}`,
    `Step-by-step guide to applying for a ${visa.name.toLowerCase()} in ${new Date().getFullYear()}.`,
    visa.steps,
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />

      {/* ── Hero with photo background ── */}
      <div className="relative text-white overflow-hidden" style={{ minHeight: "clamp(340px, 40vw, 460px)" }}>
        <Image
          src={heroImageUrl}
          alt={`${visa.name} — visa guide`}
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layer 1: Brand diagonal tint — lighter to let photo shine clearly */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroGradient}`} />
        {/* Layer 2: Bottom-up — ensures title is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* Layer 3: Left vignette — cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
          <Breadcrumb variant="light" items={[{ label: "Visa Types", href: "/#visa-types" }, { label: visa.name }]} />
          <div className="flex items-center gap-4 mb-4 mt-2">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 flex-shrink-0">
              <VisaIcon className="w-8 h-8 text-white" />
            </div>
            {/* CRITICAL: text-white must be explicit — global h1 { color } overrides inherited white */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white drop-shadow-lg">
              {visa.name}
            </h1>
          </div>
          <p className="text-base sm:text-lg text-white/85 max-w-3xl leading-relaxed mb-6 drop-shadow-sm">
            {visa.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-4 py-2 text-sm">
              <span className="text-white/60">Target: </span>
              <span className="text-white font-medium">{visa.targetAudience.split(",")[0]}</span>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-4 py-2 text-sm">
              <span className="text-white/60">Duration: </span>
              <span className="text-white font-medium">{visa.typicalDuration}</span>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-xl px-4 py-2 text-sm">
              <span className="text-white/60">Available in: </span>
              <span className="text-white font-medium">131 countries</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">

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

            {/* Common Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-5">Common {visa.name} Requirements</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-3">
                {visa.commonRequirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-accent-500 mt-0.5 shrink-0" />
                    {req}
                  </div>
                ))}
              </div>
            </section>

            {/* Step-by-step */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-5">
                How to Apply: Step-by-Step Process
              </h2>
              <ol className="space-y-3">
                {visa.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-primary-200 transition-colors">
                    <span className="shrink-0 w-8 h-8 bg-primary-800 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* In-content ad */}
            <AdSlot slot="in-content" />

            {/* Countries Offering */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-5">
                Countries Offering {visa.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {featuredCountries.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}-visa-info`}
                    className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <div className="w-8 h-6 rounded-sm overflow-hidden border border-gray-100 flex-shrink-0">
                      <Image
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        alt={`${c.name} flag`}
                        width={40}
                        height={28}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 group-hover:text-primary-800 leading-snug">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.processingDays[visa.slug === "tourist" ? "visit" : visa.slug as keyof typeof c.processingDays] ?? c.processingDays.visit}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href="/#countries"
                  className="inline-flex items-center gap-2 text-sm text-primary-700 hover:text-primary-900 font-semibold transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  View all 131 countries
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </section>

            {/* Other Visa Types */}
            <section>
              <h2 className="text-xl font-bold text-primary-800 mb-4">Explore Other Visa Types</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VISA_TYPES.filter((v) => v.slug !== visa.slug).map((v) => {
                  const OtherIcon = VISA_LUCIDE[v.slug] ?? Globe;
                  return (
                    <Link
                      key={v.slug}
                      href={`/visa/${v.slug}`}
                      className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                    >
                      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center flex-shrink-0">
                        <OtherIcon className="w-5 h-5 text-primary-700" />
                      </div>
                      <span className="font-medium text-sm text-gray-900 group-hover:text-primary-800">{v.name}</span>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary-600 ml-auto transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Long-form content */}
            {visa.longFormContent && visa.longFormContent.length > 0 && (
              <section className="space-y-10">
                <h2 className="text-2xl font-bold text-primary-800">Complete {visa.name} Guide {new Date().getFullYear()}</h2>
                {visa.longFormContent.map((section, i) => (
                  <div key={i} className="border-t border-gray-100 pt-8 first:border-0 first:pt-0">
                    <h3 className="text-xl font-bold text-primary-800 mb-4">{section.heading}</h3>
                    <div className="space-y-4">
                      {section.body.split("\n\n").map((para, j) => (
                        <p
                          key={j}
                          className="text-sm text-gray-700 leading-[1.8]"
                          dangerouslySetInnerHTML={{
                            __html: para
                              .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                              .replace(/\*([^*]+)\*/g, "<em>$1</em>")
                              .replace(/\n/g, "<br/>"),
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-5">
                Frequently Asked Questions — {visa.name}
              </h2>
              <FAQSection faqs={visa.faqs} />
            </section>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-primary-800 mb-5">{visa.name} Articles &amp; Guides</h2>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                    >
                      <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-primary-800 text-sm leading-snug">{a.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{a.countryName} &middot; {a.readingTimeMinutes} min read</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Button href={`/blog?type=${visa.slug}`} variant="outline" size="sm">
                    View All {visa.name} Guides
                  </Button>
                </div>
              </section>
            )}
            {/* Editorial Disclaimer */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">About This Guide</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    This guide was researched from official government immigration portals and reviewed by our editorial team of former visa officers and immigration consultants. We update all guides quarterly. Always verify current requirements at official government sources before submitting your application.
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

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-primary-800 mb-4">Quick Reference</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Target Audience</dt>
                  <dd className="text-gray-900 leading-relaxed">{visa.targetAudience}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Typical Duration</dt>
                  <dd className="font-medium text-gray-900">{visa.typicalDuration}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Countries Available</dt>
                  <dd className="font-medium text-gray-900">131 countries worldwide</dd>
                </div>
              </dl>
            </div>

            <div className="bg-primary-50 rounded-2xl border border-primary-100 p-5">
              <h3 className="font-bold text-primary-900 mb-2">Need a specific country?</h3>
              <p className="text-sm text-primary-700 mb-4 leading-relaxed">
                Find country-specific {visa.name.toLowerCase()} requirements and fees.
              </p>
              <div className="space-y-2">
                {sidebarCountries.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${c.slug}-visa-info`}
                    className="flex items-center gap-2 text-sm text-primary-700 hover:text-primary-900 py-1 transition-colors"
                  >
                    <span className="w-5 h-3.5 rounded-sm overflow-hidden inline-block flex-shrink-0 border border-primary-200">
                      <Image
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        alt={`${c.name} flag`}
                        width={20}
                        height={14}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </span>
                    <span className="hover:underline">{c.name}</span>
                    <ArrowRight className="w-3 h-3 ml-auto text-primary-400" />
                  </Link>
                ))}
                <Link
                  href="/#countries"
                  className="flex items-center gap-1.5 text-sm text-accent-700 font-semibold hover:text-accent-800 pt-1 transition-colors"
                >
                  <Globe className="w-3.5 h-3.5" />
                  View all 131 countries
                </Link>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
