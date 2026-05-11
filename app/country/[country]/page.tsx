import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";
import { getCountryDetail } from "@/data/country-details";
import { getArticlesByCountry } from "@/lib/articles";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import FAQSection from "@/components/FAQSection";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";

interface Props {
  params: Promise<{ country: string }>;
}

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);
  if (!country) return {};
  return {
    title: `${country.name} Visa Guide ${new Date().getFullYear()} — Study, Work, Tourist & Immigration`,
    description: `Complete ${country.name} visa guide for ${new Date().getFullYear()}. Requirements, fees, processing times, embassy information, and step-by-step guides for all visa types.`,
    alternates: { canonical: `https://globalvisaguidehub.com/country/${country.slug}` },
  };
}

const countryFaqs = (name: string, detail?: ReturnType<typeof getCountryDetail>) => [
  {
    question: `What are the main visa types available for ${name}?`,
    answer: `${name} offers study visas for international students, work visas for skilled professionals, tourist/visitor visas for short stays, and permanent residency pathways for long-term settlement.`,
  },
  {
    question: `How much does a ${name} tourist visa cost?`,
    answer: detail
      ? `A ${name} tourist visa costs approximately ${detail.fees.tourist}. Additional service charges from visa application centers may apply. Fees are non-refundable.`
      : `Visa fees vary by nationality and visa type. Check the official embassy website for the current fee schedule.`,
  },
  {
    question: `How long does a ${name} visa take to process?`,
    answer: detail
      ? `Processing times: Tourist visa ${detail.timeline.tourist} · Study visa ${detail.timeline.study} · Work permit ${detail.timeline.work} · PR/Immigration ${detail.timeline.pr}.`
      : `Processing times vary by visa type and nationality. Tourist visas typically take 1–4 weeks; work and study visas can take 4–12 weeks.`,
  },
  {
    question: `Can I work while on a ${name} student visa?`,
    answer: `Many countries allow limited part-time work (typically 20 hours/week during term time) on a student visa. ${detail?.studyInfo.postStudyWork ? `After graduation, ${detail.studyInfo.postStudyWork}.` : "Check the specific work rights associated with the student visa."} `,
  },
  {
    question: `Can a ${name} visa lead to permanent residency?`,
    answer: detail
      ? `Yes. ${detail.immigrationInfo.mainProgram}. Citizenship is available after ${detail.immigrationInfo.citizenshipAfter}.`
      : `Yes. Many countries have structured PR pathways for study and work visa holders. Requirements typically include minimum years of residence, language proficiency, and employment history.`,
  },
];

const requirements: Record<string, string[]> = {
  study: [
    "Acceptance letter from a recognised institution",
    "Proof of tuition payment or scholarship award",
    "Bank statements showing sufficient funds",
    "English/language proficiency test results",
    "Valid passport (6+ months validity)",
    "Health insurance coverage",
    "Medical examination (if required)",
  ],
  work: [
    "Formal job offer from an approved employer",
    "Employer sponsorship / work permit approval",
    "Educational qualifications and credentials",
    "Work experience documentation",
    "Police clearance certificate",
    "Medical examination",
    "Valid passport",
  ],
  tourist: [
    "Valid passport",
    "Completed visa application form",
    "Bank statements (last 3–6 months)",
    "Return flight tickets",
    "Hotel reservation or invitation letter",
    "Travel insurance",
    "Purpose of visit documentation",
  ],
  immigration: [
    "Points-based eligibility assessment",
    "Language test results (IELTS / equivalent)",
    "Educational credential assessment",
    "Employment reference letters",
    "Police clearance certificate",
    "Medical examination",
    "Proof of settlement funds",
  ],
};

export default async function CountryPage({ params }: Props) {
  const { country: countrySlug } = await params;
  const country = getCountryBySlug(countrySlug);
  if (!country) notFound();

  const detail = getCountryDetail(country.slug);
  const relatedArticles = getArticlesByCountry(country.slug);
  const faqs = countryFaqs(country.name, detail);

  const faqLd = faqSchema(faqs);
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "https://globalvisaguidehub.com" },
    { name: "Countries", url: "https://globalvisaguidehub.com/#countries" },
    { name: country.name, url: `https://globalvisaguidehub.com/country/${country.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white pt-24 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Countries", href: "/#countries" }, { label: country.name }]} />
          <div className="flex items-center gap-5 mb-4 mt-2">
            <span className="text-6xl sm:text-7xl">{country.flag}</span>
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold">{country.name} Visa Guide</h1>
              {detail && (
                <p className="text-blue-200 mt-1 text-sm">{detail.capital} · {detail.currency} · {detail.language}</p>
              )}
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl leading-relaxed mb-6">{country.description}</p>

          {/* Quick stat pills */}
          <div className="flex flex-wrap gap-3">
            <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
              country.difficulty === "Easy" ? "bg-green-500/20 text-green-300" :
              country.difficulty === "Moderate" ? "bg-yellow-500/20 text-yellow-300" :
              "bg-red-500/20 text-red-300"
            }`}>
              {country.difficulty} Process
            </span>
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white">⏱ {country.processingTime}</span>
            {detail && <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white">💰 {detail.costOfLiving} Cost of Living</span>}
            <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white">🌐 {country.region}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Highlights */}
            {detail && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Choose {country.name}?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200">
                      <span className="text-accent-500 mt-0.5 shrink-0 text-lg">✓</span>
                      <span className="text-sm text-gray-700">{h}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Visa Types Grid */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Visa Types for {country.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VISA_TYPES.filter((v) => country.visaTypes.includes(v.slug)).map((v) => (
                  <Link
                    key={v.slug}
                    href={`/visa/${v.slug}`}
                    className="group flex gap-4 p-5 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
                  >
                    <span className="text-3xl shrink-0">{v.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-primary-800 mb-1 transition-colors">{v.name}</h3>
                      <p className="text-xs text-gray-500 leading-snug mb-2">{v.shortDescription}</p>
                      {detail && (
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-gray-400">Fee: </span>
                            <span className="font-semibold text-gray-700">
                              {v.slug === "study" ? detail.fees.study :
                               v.slug === "work" ? detail.fees.work :
                               v.slug === "tourist" ? detail.fees.tourist : detail.fees.pr}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400">Time: </span>
                            <span className="font-semibold text-gray-700">
                              {v.slug === "study" ? detail.timeline.study :
                               v.slug === "work" ? detail.timeline.work :
                               v.slug === "tourist" ? detail.timeline.tourist : detail.timeline.pr}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Country-specific info panels */}
            {detail && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">Detailed Information</h2>
                <div className="space-y-4">

                  {/* Study */}
                  <details className="group border border-gray-200 rounded-2xl overflow-hidden" open>
                    <summary className="px-5 py-4 flex items-center gap-3 cursor-pointer list-none bg-white hover:bg-blue-50 transition-colors">
                      <span className="text-2xl">🎓</span>
                      <span className="font-bold text-gray-900">Study in {country.name}</span>
                      <svg className="w-4 h-4 text-gray-400 ml-auto transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </summary>
                    <div className="px-5 pb-5 pt-2 bg-blue-50 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Universities</p><p className="text-gray-800 font-medium">{detail.studyInfo.universities}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Average Tuition</p><p className="text-gray-800 font-medium">{detail.studyInfo.avgTuition}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Post-Study Work</p><p className="text-gray-800 font-medium">{detail.studyInfo.postStudyWork}</p></div>
                    </div>
                  </details>

                  {/* Work */}
                  <details className="group border border-gray-200 rounded-2xl overflow-hidden">
                    <summary className="px-5 py-4 flex items-center gap-3 cursor-pointer list-none bg-white hover:bg-violet-50 transition-colors">
                      <span className="text-2xl">💼</span>
                      <span className="font-bold text-gray-900">Work in {country.name}</span>
                      <svg className="w-4 h-4 text-gray-400 ml-auto transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </summary>
                    <div className="px-5 pb-5 pt-2 bg-violet-50 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Top Sectors</p><p className="text-gray-800 font-medium">{detail.workInfo.topSectors.slice(0,3).join(", ")}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Average Salary</p><p className="text-gray-800 font-medium">{detail.workInfo.avgSalary}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">PR Pathway</p><p className="text-gray-800 font-medium">{detail.workInfo.prPathway.split("—")[0]}</p></div>
                    </div>
                  </details>

                  {/* Tourism */}
                  <details className="group border border-gray-200 rounded-2xl overflow-hidden">
                    <summary className="px-5 py-4 flex items-center gap-3 cursor-pointer list-none bg-white hover:bg-sky-50 transition-colors">
                      <span className="text-2xl">✈️</span>
                      <span className="font-bold text-gray-900">Visit {country.name}</span>
                      <svg className="w-4 h-4 text-gray-400 ml-auto transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </summary>
                    <div className="px-5 pb-5 pt-2 bg-sky-50 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Best Time</p><p className="text-gray-800 font-medium">{detail.touristInfo.bestTime}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Top Cities</p><p className="text-gray-800 font-medium">{detail.touristInfo.topCities.slice(0,3).join(", ")}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Visa on Arrival</p><p className={`font-bold ${detail.touristInfo.visaOnArrival ? "text-green-600" : "text-red-500"}`}>{detail.touristInfo.visaOnArrival ? "Available (some nationalities)" : "Not available — pre-apply"}</p></div>
                    </div>
                  </details>

                  {/* Immigration */}
                  <details className="group border border-gray-200 rounded-2xl overflow-hidden">
                    <summary className="px-5 py-4 flex items-center gap-3 cursor-pointer list-none bg-white hover:bg-emerald-50 transition-colors">
                      <span className="text-2xl">🏠</span>
                      <span className="font-bold text-gray-900">Immigrate to {country.name}</span>
                      <svg className="w-4 h-4 text-gray-400 ml-auto transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </summary>
                    <div className="px-5 pb-5 pt-2 bg-emerald-50 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Main Program</p><p className="text-gray-800 font-medium">{detail.immigrationInfo.mainProgram.split(",")[0]}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Min. Residence</p><p className="text-gray-800 font-medium">{detail.immigrationInfo.minResidence}</p></div>
                      <div><p className="text-gray-400 text-xs uppercase font-semibold mb-1">Citizenship After</p><p className="text-gray-800 font-medium">{detail.immigrationInfo.citizenshipAfter}</p></div>
                    </div>
                  </details>
                </div>
              </section>
            )}

            {/* Requirements by visa type */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Document Requirements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {country.visaTypes.map((type) => {
                  const visaType = VISA_TYPES.find((v) => v.slug === type);
                  if (!visaType) return null;
                  return (
                    <div key={type} className="bg-white rounded-xl border border-gray-200 p-5">
                      <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <span>{visaType.icon}</span> {visaType.name}
                      </h3>
                      <ul className="space-y-2">
                        {(requirements[type] ?? []).map((req, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                            <span className="text-accent-500 mt-0.5 shrink-0">✓</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                      <Link href={`/visa/${type}`} className="mt-3 pt-3 border-t border-gray-100 block text-xs text-primary-700 font-semibold hover:text-primary-900 transition-colors">
                        Full {visaType.name} Guide →
                      </Link>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Process links */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Application Process Guides</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: `${country.name} Study Visa Process`, href: "/process/study-visa-application", icon: "🎓" },
                  { label: `${country.name} Work Permit Process`, href: "/process/work-permit-application", icon: "💼" },
                  { label: `${country.name} Tourist Visa Process`, href: "/process/tourist-visa-application", icon: "✈️" },
                  { label: "Document Preparation Guide", href: "/process/document-preparation-guide", icon: "📋" },
                ].map((item) => (
                  <Link key={item.href} href={item.href}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all text-sm font-medium text-gray-800 hover:text-primary-800">
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* In-content ad */}
            <AdSlot slot="in-content" />

            {/* Step-by-step */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step Visa Application Guide</h2>
              <ol className="space-y-4">
                {[
                  { title: "Determine your visa category", desc: `Choose from study, work, tourist, or immigration based on your purpose. Each has different requirements for ${country.name}.` },
                  { title: "Check eligibility and requirements", desc: `Visit ${detail ? detail.embassyWebsite : "the official " + country.name + " immigration website"} to confirm you meet all criteria.` },
                  { title: "Gather your documents", desc: "Collect all required documents: passport, photographs, financial statements, and category-specific supporting materials." },
                  { title: "Complete the application form", desc: `Fill out the official ${country.name} visa application form. Ensure all details exactly match your passport.` },
                  { title: "Pay the visa fee", desc: detail ? `Fees range from ${detail.fees.tourist} (tourist) to ${detail.fees.pr} (PR). Pay through the official portal only.` : "Submit the required fee through the official payment portal." },
                  { title: "Submit biometrics", desc: "Attend your biometrics appointment at the designated visa application center. Bring all original documents." },
                  { title: "Track and receive your decision", desc: `Processing takes ${country.processingTime}. Respond promptly to any requests for additional information.` },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center font-bold text-sm">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Interesting facts */}
            {detail && detail.interestingFacts.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Key Facts About {country.name} Immigration</h2>
                <div className="bg-primary-50 border border-primary-100 rounded-2xl p-5 space-y-3">
                  {detail.interestingFacts.map((fact, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-primary-500 font-bold shrink-0 mt-0.5">💡</span>
                      <p className="text-sm text-gray-700 leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently Asked Questions — {country.name} Visa</h2>
              <FAQSection faqs={faqs} />
            </section>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">{country.name} Visa Guides & Articles</h2>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link key={a.slug} href={`/blog/${a.slug}`}
                      className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all">
                      <span className="text-2xl shrink-0 mt-0.5">
                        {a.visaType === "study" ? "🎓" : a.visaType === "work" ? "💼" : a.visaType === "tourist" ? "✈️" : "🏠"}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-primary-800 text-sm leading-snug">{a.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{a.category} · {a.readingTimeMinutes} min read</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Rich long-form content */}
            {detail?.richSections && detail.richSections.length > 0 && (
              <section className="space-y-10">
                <h2 className="text-2xl font-bold text-gray-900">Complete {country.name} Guide 2026</h2>
                {detail.richSections.map((section, i) => (
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
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6">
            {/* Quick facts */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>{country.flag}</span> Quick Facts
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-gray-500">Region</dt><dd className="font-medium text-gray-900">{country.region}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Processing</dt><dd className="font-medium text-gray-900">{country.processingTime}</dd></div>
                <div className="flex justify-between"><dt className="text-gray-500">Difficulty</dt>
                  <dd className={`font-bold ${country.difficulty === "Easy" ? "text-green-600" : country.difficulty === "Moderate" ? "text-yellow-600" : "text-red-600"}`}>{country.difficulty}</dd>
                </div>
                {detail && (
                  <>
                    <div className="flex justify-between"><dt className="text-gray-500">Currency</dt><dd className="font-medium text-gray-900">{detail.currency}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Language</dt><dd className="font-medium text-gray-900 text-right max-w-[120px]">{detail.language}</dd></div>
                    <div className="flex justify-between"><dt className="text-gray-500">Cost of Living</dt>
                      <dd className={`font-bold ${detail.costOfLiving === "Low" ? "text-green-600" : detail.costOfLiving === "Medium" ? "text-yellow-600" : "text-red-600"}`}>{detail.costOfLiving}</dd>
                    </div>
                  </>
                )}
              </dl>
              {detail && (
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <a href={detail.embassyWebsite} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-primary-700 hover:text-primary-900 font-medium transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    Official Embassy Website
                  </a>
                  <a href={detail.visaPortal} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-primary-700 hover:text-primary-900 font-medium transition-colors">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    Visa Application Portal
                  </a>
                </div>
              )}
            </div>

            {/* Fee table */}
            {detail && (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                <h3 className="font-bold text-gray-900 mb-4">Visa Fees Overview</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    { label: "🎓 Study Visa", fee: detail.fees.study },
                    { label: "💼 Work Permit", fee: detail.fees.work },
                    { label: "✈️ Tourist Visa", fee: detail.fees.tourist },
                    { label: "🏠 PR / Immigration", fee: detail.fees.pr },
                  ].map((f) => (
                    <div key={f.label} className="flex justify-between items-center py-1 border-b border-gray-50 last:border-0">
                      <dt className="text-gray-600">{f.label}</dt>
                      <dd className="font-semibold text-primary-800">{f.fee}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-xs text-gray-400 mt-3">* Fees are approximate. Service charges and biometrics may be additional.</p>
              </div>
            )}

            {/* Other countries */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Other Destinations</h3>
              <div className="space-y-1.5">
                {COUNTRIES.filter((c) => c.slug !== country.slug).slice(0, 8).map((c) => (
                  <Link key={c.slug} href={`/country/${c.slug}`}
                    className="flex items-center gap-3 py-2 px-2 rounded-xl text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 transition-colors">
                    <span className="text-xl">{c.flag}</span>
                    <span>{c.name}</span>
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
