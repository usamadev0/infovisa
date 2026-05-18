import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { parseSlug, generateAllProgrammaticSlugs } from "@/lib/slug-parser";
import { generatePageContent } from "@/lib/page-content";
import { getCountryBySlug } from "@/data/countries-extended";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateAllProgrammaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};
  const country = getCountryBySlug(parsed.countrySlug);
  if (!country) return {};
  const content = generatePageContent(country, parsed.visaType, parsed.pageType);
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `https://www.visaprocessinfo.com/${slug}` },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://www.visaprocessinfo.com/${slug}`,
      type: "article",
    },
  };
}

export default async function ProgrammaticPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const country = getCountryBySlug(parsed.countrySlug);
  if (!country) notFound();

  const content = generatePageContent(country, parsed.visaType, parsed.pageType);
  const visaLabel = parsed.visaType.charAt(0).toUpperCase() + parsed.visaType.slice(1);

  const difficultyColor: Record<string, string> = {
    Easy: "bg-emerald-100 text-emerald-700 border border-emerald-200",
    Moderate: "bg-amber-100 text-amber-700 border border-amber-200",
    Complex: "bg-red-100 text-red-700 border border-red-200",
  };

  const pageTypeBadge: Record<string, string> = {
    "country-hub": "Country Hub",
    apply: "Apply Guide",
    "how-to": "How-To Guide",
    details: "Full Details",
  };

  const diff = country.difficulty[parsed.visaType];

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.heroTitle,
    description: content.metaDescription,
    author: { "@type": "Organization", name: "VisaProcessInfo" },
    publisher: { "@type": "Organization", name: "VisaProcessInfo", url: "https://www.visaprocessinfo.com" },
    url: `https://www.visaprocessinfo.com/${slug}`,
    mainEntityOfPage: `https://www.visaprocessinfo.com/${slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-sm text-white/60 mb-6 flex flex-wrap items-center gap-1.5">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${country.slug}-visa-info`} className="hover:text-white transition-colors">{country.name}</Link>
            {parsed.pageType !== "country-hub" && (
              <>
                <span>/</span>
                <span className="text-white/80 capitalize">{parsed.visaType} Visa</span>
              </>
            )}
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
            <div className="w-20 h-14 rounded-xl overflow-hidden shadow-lg border-2 border-white/20 flex-shrink-0">
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
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-bold bg-white/20 text-white px-3 py-1 rounded-full border border-white/30">
                  {pageTypeBadge[parsed.pageType || "details"]}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${difficultyColor[diff] || "bg-gray-100 text-gray-700"}`}>
                  {diff} Difficulty
                </span>
                {parsed.pageType !== "country-hub" && (
                  <span className="text-xs font-bold bg-accent-500/20 text-accent-300 px-3 py-1 rounded-full border border-accent-400/30">
                    {visaLabel} Visa
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
                {content.heroTitle}
              </h1>
            </div>
          </div>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-3xl mb-6">
            {content.heroSubtitle}
          </p>

          {/* Key stats */}
          {parsed.pageType !== "country-hub" && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Government Fee", value: `${country.currency} ${country.visaFees[parsed.visaType]}` },
                { label: "Processing Time", value: country.processingDays[parsed.visaType] },
                { label: "Difficulty", value: diff },
                { label: "Region", value: country.region },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/10 backdrop-blur rounded-xl p-3 border border-white/20">
                  <div className="text-xs text-white/60 mb-1">{stat.label}</div>
                  <div className="font-bold text-white text-sm">{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Quick Facts Box */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h2 className="font-bold text-blue-900 text-lg mb-4">Quick Facts: {country.name} {parsed.pageType !== "country-hub" ? `${visaLabel} Visa` : "Visa Overview"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">&#x2713;</span>
                  <div><span className="font-semibold text-blue-800">Capital:</span> <span className="text-blue-700">{country.capital}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">&#x2713;</span>
                  <div><span className="font-semibold text-blue-800">Currency:</span> <span className="text-blue-700">{country.currency}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">&#x2713;</span>
                  <div><span className="font-semibold text-blue-800">Language:</span> <span className="text-blue-700">{country.languageRequirement}</span></div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">&#x2713;</span>
                  <div><span className="font-semibold text-blue-800">Region:</span> <span className="text-blue-700">{country.region}</span></div>
                </div>
                {parsed.pageType !== "country-hub" && (
                  <>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">&#x2713;</span>
                      <div><span className="font-semibold text-blue-800">Fee:</span> <span className="text-blue-700">{country.currency} {country.visaFees[parsed.visaType]}</span></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-blue-500 mt-0.5">&#x2713;</span>
                      <div><span className="font-semibold text-blue-800">Processing:</span> <span className="text-blue-700">{country.processingDays[parsed.visaType]}</span></div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Main sections */}
            {content.sections.map((section, i) => (
              <section key={i} className="prose prose-gray prose-headings:font-bold prose-headings:text-gray-900 max-w-none">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">{section.heading}</h2>
                <div className="text-gray-700 leading-relaxed space-y-3 whitespace-pre-line text-[15px]">
                  {section.body.split("\n\n").map((para, j) => (
                    <p key={j} className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: para
                          .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
                          .replace(/\n/g, "<br/>"),
                      }}
                    />
                  ))}
                </div>
              </section>
            ))}

            {/* Steps (for apply/how-to pages) */}
            {(parsed.pageType === "apply" || parsed.pageType === "how-to") && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                  Application Steps Overview
                </h2>
                <div className="space-y-4">
                  {content.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-9 h-9 bg-primary-800 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
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

            {/* Requirements list */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                Required Documents Checklist
              </h2>
              <div className="space-y-2">
                {content.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-primary-200 transition-colors">
                    <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5"></div>
                    <span className="text-sm text-gray-700">{req}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {content.faqs.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 hover:bg-primary-50 transition-colors font-semibold text-gray-900 text-sm gap-3">
                      <span>{faq.question}</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg flex-shrink-0">&#x25BE;</span>
                    </summary>
                    <div className="p-4 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            {/* CTA Tools */}
            <div className="bg-gradient-to-br from-primary-800 to-primary-700 text-white rounded-2xl p-5">
              <h3 className="font-bold text-lg mb-1">Check Your Eligibility</h3>
              <p className="text-white/70 text-sm mb-4">Find out your chances of getting a {country.name} visa.</p>
              <Link href="/tools/eligibility-checker"
                className="block w-full bg-white text-primary-800 font-semibold text-sm py-2.5 rounded-xl text-center hover:bg-primary-50 transition-colors">
                Free Eligibility Check
              </Link>
            </div>

            <div className="bg-accent-500 text-white rounded-2xl p-5">
              <h3 className="font-bold text-lg mb-1">Calculate Visa Cost</h3>
              <p className="text-white/80 text-sm mb-4">Get an accurate cost estimate for your {country.name} {visaLabel} visa.</p>
              <Link href="/tools/cost-calculator"
                className="block w-full bg-white text-accent-700 font-semibold text-sm py-2.5 rounded-xl text-center hover:bg-accent-50 transition-colors">
                Cost Calculator
              </Link>
            </div>

            {/* Key Facts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Why {country.name}?</h3>
              <ul className="space-y-2">
                {country.popularFor.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-emerald-500 mt-0.5 flex-shrink-0">&#x2713;</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Facts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Key Facts</h3>
              <ul className="space-y-2">
                {country.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-primary-600 mt-0.5 flex-shrink-0">&#x25CF;</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            {/* Internal Links */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Related Guides</h3>
              <ul className="space-y-1.5">
                {content.internalLinks.slice(0, 8).map((link, i) => (
                  <li key={i}>
                    <Link href={link.href}
                      className="text-sm text-primary-700 hover:text-primary-900 hover:underline transition-colors block py-0.5">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Links */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <h3 className="font-bold text-amber-900 mb-3 text-sm">Official Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href={country.officialImmigrationUrl} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-amber-700 hover:text-amber-900 hover:underline">
                    Official Immigration Portal
                  </a>
                </li>
                <li>
                  <a href={country.embassyUrl} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-amber-700 hover:text-amber-900 hover:underline">
                    Embassy & Consulate Finder
                  </a>
                </li>
              </ul>
              <p className="text-xs text-amber-600 mt-3">Always verify requirements at official sources before applying.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Internal Linking Bar */}
      <div className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Explore More {country.name} Visa Guides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {content.internalLinks.map((link, i) => (
              <Link key={i} href={link.href}
                className="bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 hover:border-primary-300 hover:text-primary-800 transition-all text-center font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
