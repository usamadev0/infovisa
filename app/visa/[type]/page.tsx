import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { VISA_TYPES, getVisaTypeBySlug } from "@/data/visa-types";
import { COUNTRIES } from "@/data/countries";
import { getArticlesByVisaType } from "@/lib/articles";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import FAQSection from "@/components/FAQSection";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ type: string }>;
}

export function generateStaticParams() {
  return VISA_TYPES.map((v) => ({ type: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const visa = getVisaTypeBySlug(type);
  if (!visa) return {};
  return {
    title: `${visa.name} Guide ${new Date().getFullYear()} — Requirements, Process & Countries`,
    description: `Complete ${visa.name.toLowerCase()} guide for ${new Date().getFullYear()}. Requirements, step-by-step process, fees, and country-specific information for 15+ destinations.`,
    alternates: { canonical: `https://www.visaprocessinfo.com/visa/${visa.slug}` },
  };
}

export default async function VisaTypePage({ params }: Props) {
  const { type } = await params;
  const visa = getVisaTypeBySlug(type);
  if (!visa) notFound();

  const eligibleCountries = COUNTRIES.filter((c) => c.visaTypes.includes(visa.slug));
  const relatedArticles = getArticlesByVisaType(visa.slug);

  const faqLd = faqSchema(visa.faqs);
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "https://www.visaprocessinfo.com" },
    { name: "Visa Types", url: "https://www.visaprocessinfo.com/#visa-types" },
    { name: visa.name, url: `https://www.visaprocessinfo.com/visa/${visa.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Visa Types", href: "/#visa-types" }, { label: visa.name }]} />
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{visa.icon}</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold">{visa.name}</h1>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl leading-relaxed">{visa.description}</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              <span className="text-blue-300">Target: </span>
              <span className="text-white">{visa.targetAudience.split(",")[0]}</span>
            </div>
            <div className="bg-white/10 rounded-lg px-4 py-2 text-sm">
              <span className="text-blue-300">Duration: </span>
              <span className="text-white">{visa.typicalDuration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-10">

            {/* Common Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Common {visa.name} Requirements</h2>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <ul className="space-y-3">
                  {visa.commonRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-accent-500 mt-0.5 shrink-0 text-base">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Step-by-step */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                How to Apply: Step-by-Step Process
              </h2>
              <ol className="space-y-4">
                {visa.steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* In-content ad */}
            <AdSlot slot="in-content" />

            {/* Countries */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Countries Offering {visa.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {eligibleCountries.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/country/${c.slug}`}
                    className="group flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <span className="text-2xl">{c.flag}</span>
                    <div>
                      <p className="font-medium text-sm text-gray-900 group-hover:text-primary-800">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.processingTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Other visa types */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Explore Other Visa Types</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {VISA_TYPES.filter((v) => v.slug !== visa.slug).map((v) => (
                  <Link
                    key={v.slug}
                    href={`/visa/${v.slug}`}
                    className="group flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                  >
                    <span className="text-2xl">{v.icon}</span>
                    <span className="font-medium text-sm text-gray-900 group-hover:text-primary-800">{v.name}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Long-form content */}
            {visa.longFormContent && visa.longFormContent.length > 0 && (
              <section className="space-y-10">
                <h2 className="text-2xl font-bold text-gray-900">Complete {visa.name} Guide 2026</h2>
                {visa.longFormContent.map((section, i) => (
                  <div key={i} className="border-t border-gray-100 pt-8 first:border-0 first:pt-0">
                    <h3 className="text-xl font-bold text-primary-800 mb-4">{section.heading}</h3>
                    <div className="space-y-4">
                      {section.body.split("\n\n").map((para, j) => (
                        <p
                          key={j}
                          className="text-sm text-gray-700 leading-relaxed"
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
              <h2 className="text-2xl font-bold text-gray-900 mb-5">
                Frequently Asked Questions — {visa.name}
              </h2>
              <FAQSection faqs={visa.faqs} />
            </section>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">{visa.name} Articles & Guides</h2>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{visa.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-primary-800 text-sm leading-snug">{a.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{a.countryName} · {a.readingTimeMinutes} min read</p>
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
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Quick Reference</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Target Audience</dt>
                  <dd className="text-gray-900">{visa.targetAudience}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Typical Duration</dt>
                  <dd className="font-medium text-gray-900">{visa.typicalDuration}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Countries Available</dt>
                  <dd className="font-medium text-gray-900">{eligibleCountries.length} countries</dd>
                </div>
              </dl>
            </div>

            <div className="bg-primary-50 rounded-2xl border border-primary-100 p-5">
              <h3 className="font-bold text-primary-900 mb-3">Need a specific country guide?</h3>
              <p className="text-sm text-primary-800 mb-4">
                Find country-specific {visa.name.toLowerCase()} requirements and fees.
              </p>
              <div className="space-y-2">
                {eligibleCountries.slice(0, 5).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/country/${c.slug}`}
                    className="flex items-center gap-2 text-sm text-primary-700 hover:text-primary-900 transition-colors"
                  >
                    <span>{c.flag}</span> {c.name}
                  </Link>
                ))}
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
