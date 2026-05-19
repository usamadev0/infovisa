import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PROCESSES, getProcessBySlug, getAllProcessSlugs } from "@/data/processes";
import { faqSchema, breadcrumbSchema, howToSchema } from "@/lib/jsonld";
import FAQSection from "@/components/FAQSection";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import { PROCESS_KEYWORDS } from "@/lib/seo-keywords";
import { getProcessImageUrl } from "@/lib/images";

interface Props {
  params: Promise<{ type: string }>;
}

export function generateStaticParams() {
  return getAllProcessSlugs().map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const process = getProcessBySlug(type);
  if (!process) return {};
  return {
    title: process.title,
    description: process.metaDescription,
    alternates: { canonical: `https://www.visaprocessinfo.com/process/${process.slug}` },
    keywords: PROCESS_KEYWORDS,
  };
}

export default async function ProcessPage({ params }: Props) {
  const { type } = await params;
  const process = getProcessBySlug(type);
  if (!process) notFound();

  const related = PROCESSES.filter((p) =>
    process.relatedProcesses.includes(p.slug)
  );

  // Pick the best hero image for this process page
  const heroImageUrl = getProcessImageUrl(type);

  const faqLd = faqSchema(process.faqs);
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "https://www.visaprocessinfo.com" },
    { name: "Apply Process", url: "https://www.visaprocessinfo.com/process/study-visa-application" },
    { name: process.title, url: `https://www.visaprocessinfo.com/process/${process.slug}` },
  ]);
  const howToLd = howToSchema(
    process.title,
    process.metaDescription,
    process.steps,
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />

      {/* ── Hero with background photo ─────────────────────────────────────── */}
      <div className="relative text-white overflow-hidden" style={{ minHeight: "420px" }}>
        {/* Background photo */}
        <Image
          src={heroImageUrl}
          alt={process.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Layer 1: Subtle diagonal brand tint — lets photo show through */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/65 via-primary-800/40 to-transparent" />
        {/* Layer 2: Strong bottom-up gradient — ensures text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />
        {/* Layer 3: Left vignette — visual depth and cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-14">
          <Breadcrumb
            variant="light"
            items={[
              { label: "Apply Process", href: "/process/study-visa-application" },
              { label: process.title },
            ]}
          />
          <div className="flex items-start gap-4 mb-4 mt-2">
            <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/30 flex items-center justify-center shrink-0 text-3xl backdrop-blur-sm mt-1">
              {process.icon}
            </div>
            <div>
              {/* CRITICAL: text-white must be explicit — global h1 { color } overrides inherited white */}
              <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white drop-shadow-lg">
                {process.title}
              </h1>
            </div>
          </div>

          {/* Quick meta strip */}
          <div className="flex flex-wrap gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 text-sm border border-white/20">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide block mb-0.5">Time Required</span>
              <span className="text-white font-semibold">{process.timeRequired}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 text-sm border border-white/20">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide block mb-0.5">Cost Estimate</span>
              <span className="text-white font-semibold">{process.costEstimate}</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 text-sm border border-white/20">
              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wide block mb-0.5">Who It&apos;s For</span>
              <span className="text-white font-semibold">{process.targetAudience.split(",")[0]}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Introduction */}
            <section>
              <div className="bg-primary-50 border-l-4 border-primary-600 rounded-r-2xl p-6">
                <h2 className="text-xl font-bold text-primary-800 mb-3">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{process.introduction}</p>
              </div>
            </section>

            {/* Step-by-step */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">
                Step-by-Step Process ({process.steps.length} Steps)
              </h2>
              <ol className="space-y-6">
                {process.steps.map((step, i) => (
                  <li key={i} className="relative">
                    <div className="flex gap-5">
                      {/* Step number */}
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-10 h-10 rounded-full bg-primary-800 text-white flex items-center justify-center font-extrabold text-sm shadow-md">
                          {i + 1}
                        </div>
                        {i < process.steps.length - 1 && (
                          <div className="w-0.5 flex-1 bg-primary-100 my-2" />
                        )}
                      </div>
                      {/* Step content */}
                      <div className="flex-1 pb-2">
                        <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">{step.description}</p>
                        {step.tips && step.tips.length > 0 && (
                          <div className="bg-accent-50 border border-accent-100 rounded-xl p-4">
                            <p className="text-xs font-bold text-accent-700 uppercase tracking-wide mb-2">Tips</p>
                            <ul className="space-y-1.5">
                              {step.tips.map((tip, j) => (
                                <li key={j} className="flex items-start gap-2 text-xs text-gray-700">
                                  <span className="text-accent-500 mt-0.5 shrink-0">✓</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Required Documents */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-5">Required Documents Checklist</h2>
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <ul className="space-y-3">
                  {process.requiredDocuments.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded border-2 border-primary-300 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-sm text-gray-700">{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* In-content ad */}
            <AdSlot slot="in-content" />

            {/* Common Mistakes */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-5">Common Mistakes to Avoid</h2>
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <ul className="space-y-3">
                  {process.commonMistakes.map((mistake, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-red-500 mt-0.5 shrink-0 font-bold">✗</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-5">Frequently Asked Questions</h2>
              <FAQSection faqs={process.faqs} />
            </section>

            {/* Conclusion */}
            <section className="bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-primary-800 mb-3">Conclusion</h2>
              <p className="text-gray-700 leading-relaxed">{process.conclusion}</p>
            </section>

            {/* Related processes */}
            {related.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-primary-800 mb-4">Related Guides</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/process/${r.slug}`}
                      className="group flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                    >
                      <span className="text-2xl shrink-0">{r.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-900 group-hover:text-primary-800 transition-colors leading-snug">
                          {r.title.split(":")[0]}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">{r.timeRequired}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">

            {/* Quick summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Quick Summary</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Time Required</dt>
                  <dd className="font-semibold text-gray-900">{process.timeRequired}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Estimated Cost</dt>
                  <dd className="font-semibold text-gray-900">{process.costEstimate}</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Steps</dt>
                  <dd className="font-semibold text-gray-900">{process.steps.length} steps</dd>
                </div>
                <div>
                  <dt className="text-gray-400 text-xs uppercase tracking-wide mb-1">Documents Required</dt>
                  <dd className="font-semibold text-gray-900">{process.requiredDocuments.length} items</dd>
                </div>
              </dl>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <Link href="/blog" className="block w-full text-center bg-primary-800 text-white font-semibold py-2.5 rounded-xl hover:bg-primary-700 transition-colors text-sm">
                  Read Country Guides →
                </Link>
              </div>
            </div>

            {/* All processes */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">All Process Guides</h3>
              <div className="space-y-2">
                {PROCESSES.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/process/${p.slug}`}
                    className={`flex items-center gap-3 p-2.5 rounded-xl text-sm transition-colors ${
                      p.slug === process.slug
                        ? "bg-primary-50 text-primary-800 font-semibold"
                        : "text-gray-700 hover:bg-gray-50 hover:text-primary-800"
                    }`}
                  >
                    <span className="text-base">{p.icon}</span>
                    <span>{p.title.split(":")[0]}</span>
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
