import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";
import { getArticlesByCountry } from "@/lib/articles";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import FAQSection from "@/components/FAQSection";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import Button from "@/components/ui/Button";

interface Props {
  params: { country: string };
}

export function generateStaticParams() {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const country = getCountryBySlug(params.country);
  if (!country) return {};
  return {
    title: `${country.name} Visa Guide ${new Date().getFullYear()} — Study, Work, Tourist & Immigration`,
    description: `Complete ${country.name} visa guide for ${new Date().getFullYear()}. Study visa, work visa, tourist visa, and PR requirements, fees, processing times, and step-by-step guides.`,
    alternates: { canonical: `https://globalvisaguidehub.com/country/${country.slug}` },
  };
}

const countryFaqs = (name: string) => [
  {
    question: `What are the main visa types available for ${name}?`,
    answer: `${name} offers study visas for international students, work visas for skilled professionals, tourist/visitor visas for short stays, and permanent residency pathways for long-term settlement.`,
  },
  {
    question: `How long does a ${name} visa application take?`,
    answer: `Processing times vary by visa type and nationality. Tourist visas typically take 1–4 weeks; work and study visas can take 4–12 weeks. Always check the official government portal for current timelines.`,
  },
  {
    question: `Can I work while on a ${name} student visa?`,
    answer: `Many countries allow limited part-time work (typically 20 hours/week during term time) on a student visa. Check the specific work rights associated with ${name}'s student visa category.`,
  },
  {
    question: `What is the minimum bank balance required for a ${name} visa?`,
    answer: `Financial requirements vary by visa type, duration of stay, and applicant nationality. Refer to the official embassy guidelines for the exact minimum amount required for your specific application.`,
  },
  {
    question: `Can a ${name} visa lead to permanent residency?`,
    answer: `Yes. Many countries have structured PR pathways for study and work visa holders. Requirements typically include minimum years of residence, language proficiency, and employment history.`,
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

export default function CountryPage({ params }: Props) {
  const country = getCountryBySlug(params.country);
  if (!country) notFound();

  const relatedArticles = getArticlesByCountry(country.slug);
  const faqs = countryFaqs(country.name);

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
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: "Countries", href: "/#countries" },
              { label: country.name },
            ]}
          />
          <div className="flex items-center gap-4 mb-4">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold">{country.name} Visa Guide</h1>
              <p className="text-blue-200 mt-1">{country.region} · Processing: {country.processingTime}</p>
            </div>
          </div>
          <p className="text-lg text-blue-100 max-w-3xl leading-relaxed">{country.description}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              country.difficulty === "Easy" ? "bg-green-500/20 text-green-300" :
              country.difficulty === "Moderate" ? "bg-yellow-500/20 text-yellow-300" :
              "bg-red-500/20 text-red-300"
            }`}>
              {country.difficulty} Process
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white">
              ⏱ {country.processingTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Visa Types Available */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Visa Types Available for {country.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {VISA_TYPES.filter((v) => country.visaTypes.includes(v.slug)).map((v) => (
                  <Link
                    key={v.slug}
                    href={`/visa/${v.slug}`}
                    className="group flex gap-4 p-5 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="text-3xl shrink-0">{v.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary-800 mb-1">{v.name}</h3>
                      <p className="text-xs text-gray-500 leading-snug">{v.shortDescription}</p>
                      <p className="text-xs text-accent-600 font-medium mt-2">Duration: {v.typicalDuration}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Requirements by visa type */}
            {country.visaTypes.map((type) => {
              const visaType = VISA_TYPES.find((v) => v.slug === type);
              if (!visaType) return null;
              return (
                <section key={type}>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">
                    {visaType.icon} {country.name} {visaType.name} Requirements
                  </h2>
                  <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <ul className="space-y-2">
                      {(requirements[type] ?? []).map((req, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                          <span className="text-accent-500 mt-0.5 shrink-0">✓</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <Link
                        href={`/visa/${type}`}
                        className="text-sm text-primary-700 font-semibold hover:text-primary-900 transition-colors"
                      >
                        Full {visaType.name} Guide →
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}

            {/* In-content ad */}
            <AdSlot slot="in-content" />

            {/* Step-by-step general guide */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-Step: How to Apply for a {country.name} Visa</h2>
              <ol className="space-y-4">
                {[
                  { step: "Determine your visa category", desc: `Choose from study, work, tourist, or immigration based on your purpose. Each category has different requirements and processing times for ${country.name}.` },
                  { step: "Check eligibility and requirements", desc: `Visit the official ${country.name} immigration authority website to confirm you meet all eligibility criteria for your chosen visa type.` },
                  { step: "Gather your documents", desc: "Collect all required documents: passport, photographs, financial statements, purpose documentation, and any category-specific supporting materials." },
                  { step: "Complete the application form", desc: `Fill out the official ${country.name} visa application form accurately. Ensure all details match your passport exactly to avoid delays.` },
                  { step: "Pay the visa fee", desc: "Submit the required visa fee through the official payment portal or at the visa application center. Keep your payment receipt." },
                  { step: "Submit biometrics", desc: "Attend your biometrics appointment at the designated visa application center (VFS Global, BLS, or embassy). Bring all original documents." },
                  { step: "Track and receive your decision", desc: `Use the reference number to track your ${country.name} visa application online. Processing takes ${country.processingTime}. Respond promptly to any requests for additional information.` },
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.step}</h3>
                      <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Frequently Asked Questions — {country.name} Visa
              </h2>
              <FAQSection faqs={faqs} />
            </section>

            {/* Related articles */}
            {relatedArticles.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">
                  {country.name} Visa Guides & Articles
                </h2>
                <div className="grid gap-3">
                  {relatedArticles.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-2xl shrink-0 mt-0.5">
                        {a.visaType === "study" ? "🎓" : a.visaType === "work" ? "💼" : a.visaType === "tourist" ? "✈️" : "🏠"}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-primary-800 transition-colors text-sm leading-snug">
                          {a.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{a.category} · {a.readingTimeMinutes} min read</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-4">
                  <Button href={`/blog?country=${country.slug}`} variant="outline" size="sm">
                    View All {country.name} Guides
                  </Button>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick info card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span>{country.flag}</span> Quick Facts
              </h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Region</dt>
                  <dd className="font-medium text-gray-900">{country.region}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Processing Time</dt>
                  <dd className="font-medium text-gray-900">{country.processingTime}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Difficulty</dt>
                  <dd className={`font-medium ${
                    country.difficulty === "Easy" ? "text-green-700" :
                    country.difficulty === "Moderate" ? "text-yellow-700" :
                    "text-red-700"
                  }`}>{country.difficulty}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Visa Types</dt>
                  <dd className="font-medium text-gray-900">{country.visaTypes.length}</dd>
                </div>
              </dl>
            </div>

            {/* Other countries */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Other Popular Destinations</h3>
              <div className="space-y-2">
                {COUNTRIES.filter((c) => c.slug !== country.slug).slice(0, 8).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/country/${c.slug}`}
                    className="flex items-center gap-3 py-2 text-sm text-gray-700 hover:text-primary-800 transition-colors"
                  >
                    <span className="text-xl">{c.flag}</span>
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar ad */}
            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
