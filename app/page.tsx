import type { Metadata } from "next";
import Link from "next/link";
import SearchFilter from "@/components/SearchFilter";
import AdSlot from "@/components/ads/AdSlot";
import { VISA_TYPES } from "@/data/visa-types";
import { COUNTRIES } from "@/data/countries";
import { faqSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Global Visa Guide Hub — Visa & Immigration Guides for 15+ Countries",
  description:
    "Your ultimate resource for study visas, work visas, tourist visas, and immigration guides for USA, UK, Canada, Australia, Germany, and 10+ more countries. Updated for 2026.",
  alternates: { canonical: "https://globalvisaguidehub.com" },
};

const homeFaqs = [
  {
    question: "Which countries have the easiest visa process in 2026?",
    answer:
      "UAE, Turkey, and Saudi Arabia are among the easiest for tourist visas, with e-visa systems and fast processing. Netherlands also has streamlined skilled migrant pathways.",
  },
  {
    question: "How can I improve my chances of visa approval?",
    answer:
      "Submit a complete application with all required documents, ensure your financial statements show consistent balances, provide a clear cover letter explaining your purpose, and apply well in advance of your travel date.",
  },
  {
    question: "Do I need a visa consultant to apply?",
    answer:
      "Not necessarily. Many applicants successfully apply on their own using official embassy websites and comprehensive guides like those found on this website. However, for complex cases (previous refusals, PR applications), a licensed consultant can be helpful.",
  },
  {
    question: "Can a tourist visa lead to permanent residency?",
    answer:
      "In most cases, no. Tourist visas are strictly for temporary stays and do not create a pathway to PR. You would need to transition to a work or study permit and then apply for PR through the appropriate program.",
  },
  {
    question: "What is the difference between a visa and a permit?",
    answer:
      "A visa is an endorsement in your passport that allows you to enter a country. A permit (work permit, study permit, residence permit) authorizes you to stay, work, or study once inside the country. Some countries issue both separately.",
  },
];

const visaColors: Record<string, { from: string; to: string; badge: string; text: string }> = {
  study:       { from: "from-blue-600",   to: "to-indigo-700",  badge: "bg-blue-100 text-blue-800",      text: "text-blue-700" },
  work:        { from: "from-violet-600", to: "to-purple-700",  badge: "bg-violet-100 text-violet-800",   text: "text-violet-700" },
  tourist:     { from: "from-sky-500",    to: "to-cyan-600",    badge: "bg-sky-100 text-sky-800",         text: "text-sky-700" },
  immigration: { from: "from-emerald-600",to: "to-teal-700",    badge: "bg-emerald-100 text-emerald-800", text: "text-emerald-700" },
  business:    { from: "from-amber-500",  to: "to-orange-600",  badge: "bg-amber-100 text-amber-800",     text: "text-amber-700" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />

      {/* ─── FULL SCREEN COVER ──────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f5c] via-[#1E40AF] to-[#1d4ed8]" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glowing orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/10 rounded-full blur-3xl" />

        {/* Hero content */}
        <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-white mb-8">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
            Updated for 2026 · 500+ Free Visa Guides
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 max-w-4xl">
            Your Complete
            <br />
            <span className="text-accent-400">Visa &amp; Immigration</span>
            <br />
            Guide Worldwide
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Study abroad, work overseas, travel the world, or settle permanently. Step-by-step guides for{" "}
            <span className="text-white font-semibold">15+ countries</span> — 100% free.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link
              href="#countries"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 text-base"
            >
              Browse Countries
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-bold rounded-2xl backdrop-blur-sm transition-all duration-200 text-base"
            >
              Read Visa Guides
            </Link>
          </div>

          {/* Floating country flags strip */}
          <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            {COUNTRIES.map((c) => (
              <Link
                key={c.slug}
                href={`/country/${c.slug}`}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1.5 text-sm text-white/90 hover:text-white transition-all duration-150 backdrop-blur-sm"
              >
                <span className="text-base">{c.flag}</span>
                <span className="font-medium hidden sm:inline">{c.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats strip at bottom of cover */}
        <div className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { value: "16+", label: "Countries Covered" },
                { value: "500+", label: "Visa Guides" },
                { value: "5", label: "Visa Categories" },
                { value: "Free", label: "Always Free" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-extrabold text-accent-400">{s.value}</div>
                  <div className="text-xs text-blue-200 mt-1 font-medium tracking-wide">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── VISA CATEGORIES ────────────────────────────────────────────────── */}
      <section id="visa-types" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              Visa Categories
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Find the Right Visa for Your Goal
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Whether you want to study, work, travel, or settle — choose your category and get a complete guide.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {VISA_TYPES.map((v) => {
              const colors = visaColors[v.slug];
              return (
                <Link
                  key={v.slug}
                  href={`/visa/${v.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300"
                >
                  {/* Gradient top bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${colors.from} ${colors.to}`} />
                  <div className="p-6 bg-white group-hover:bg-gray-50 transition-colors">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 bg-gradient-to-br ${colors.from} ${colors.to} shadow-md`}>
                      {v.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{v.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                      {v.shortDescription}
                    </p>
                    <div className={`inline-flex items-center gap-1.5 text-xs font-bold ${colors.text} group-hover:gap-2.5 transition-all`}>
                      Full Guide
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── AD BANNER ──────────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-y border-gray-200 py-3">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot slot="banner" />
        </div>
      </div>

      {/* ─── COUNTRY SEARCH & GRID ──────────────────────────────────────────── */}
      <section id="countries" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-accent-50 text-accent-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              15 Destinations
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Find Visa Information by Country
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-base">
              Search and filter by destination country and visa type to find exactly what you need.
            </p>
          </div>
          <SearchFilter />
        </div>
      </section>

      {/* ─── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Apply for Any Visa in 4 Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", icon: "🔍", title: "Choose Country", desc: "Select your destination from 15 countries with detailed guides." },
              { step: "02", icon: "📋", title: "Check Requirements", desc: "Review the exact documents, fees, and eligibility for your visa type." },
              { step: "03", icon: "📝", title: "Prepare & Apply", desc: "Follow our step-by-step checklist and submit a complete application." },
              { step: "04", icon: "✈️", title: "Travel Confidently", desc: "Get your visa approved and travel with all the knowledge you need." },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                {/* Step connector line */}
                <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-100 hidden lg:block -z-0" />
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-primary-50 border-2 border-primary-100 flex items-center justify-center text-3xl mx-auto mb-4">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-primary-400 mb-1 tracking-widest">STEP {item.step}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-900 via-primary-800 to-indigo-800 py-16">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            500+ Free Visa Guides — Updated for 2026
          </h2>
          <p className="text-blue-200 text-base mb-8 max-w-xl mx-auto">
            From step-by-step application walkthroughs to country-specific fee breakdowns — we have every scenario covered.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Browse All Guides
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ─── SEO CONTENT ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              In-Depth Resource
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
              Complete Visa &amp; Immigration Guide 2026
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Everything you need to know about applying for visas and immigrating to the world&apos;s top destinations.
            </p>
          </div>

          <article className="prose-article space-y-8">
            <div className="bg-primary-50 border-l-4 border-primary-600 rounded-r-xl p-5">
              <p className="text-gray-700 leading-relaxed">
                Applying for a visa is often the most stressful part of any international journey. The global immigration landscape changes constantly — governments update policies, introduce digital systems, and adjust fee structures every year. <strong>Global Visa Guide Hub</strong> provides accurate, easy-to-understand visa information for the world&apos;s most popular destination countries, all in one place and completely free.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: "🎓", title: "Study Visa", desc: "A study visa allows international students to live and study abroad. Countries like Canada, Australia, and the UK offer post-study work rights that can lead to permanent residency.", href: "/visa/study" },
                { icon: "💼", title: "Work Visa", desc: "Work visas authorize foreign nationals to be employed in another country — from employer-sponsored visas (USA H-1B, UK Skilled Worker) to points-based systems (Canada Express Entry).", href: "/visa/work" },
                { icon: "✈️", title: "Tourist Visa", desc: "Tourist visas allow temporary entry for leisure, sightseeing, and visiting family. The Schengen visa covers 27 European countries in a single application.", href: "/visa/tourist" },
                { icon: "🏠", title: "Permanent Residency", desc: "PR gives foreign nationals the right to live and work indefinitely. Canada's Express Entry, Australia's SkillSelect, and Germany's settlement permit are popular pathways.", href: "/visa/immigration" },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group flex gap-4 p-5 bg-gray-50 hover:bg-primary-50 rounded-2xl border border-gray-100 hover:border-primary-200 transition-all duration-200">
                  <span className="text-3xl shrink-0">{item.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-800 mb-1 transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-primary-800">How to Choose the Right Country</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Purpose", desc: "Each visa type has different requirements. Define your goal — study, work, visit, or settle — before choosing a destination." },
                { title: "Processing Time", desc: "UAE and Turkey process visas in days. USA and UK can take months. Plan your timeline carefully." },
                { title: "Cost of Living", desc: "Germany and Turkey are affordable. Switzerland and Norway are expensive. Financial requirements reflect this." },
                { title: "PR Pathway", desc: "Canada, Australia, and Germany have transparent routes from work/study visas to permanent residency." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-accent-500 font-bold text-lg shrink-0 mt-0.5">✓</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-primary-800">Common Visa Mistakes to Avoid</h2>
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <ul className="space-y-3">
                {[
                  "Incomplete or unsigned application forms",
                  "Unexplained large bank deposits that raise fraud concerns",
                  "Photographs that do not meet official size or background specifications",
                  "Applying too late — always allow at least 4–8 weeks before your travel date",
                  "Missing travel insurance (mandatory for Schengen and many other destinations)",
                  "Misrepresenting information — discrepancies cause immediate rejection",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-red-400 shrink-0 mt-0.5">✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-primary-800">Frequently Asked Questions</h2>
          </article>

          {/* FAQ */}
          <div className="mt-5 space-y-3">
            {homeFaqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-2xl overflow-hidden"
              >
                <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:bg-primary-50 transition-colors">
                  <span>{faq.question}</span>
                  <svg className="w-5 h-5 text-primary-600 shrink-0 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 py-4 text-sm text-gray-700 bg-primary-50 border-t border-gray-200 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SEO CONTENT SECTIONS ────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* 2026 Visa Landscape */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">The 2026 International Visa Landscape</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  International migration and visa applications are at an all-time high in 2026. Post-pandemic
                  pent-up demand for international study, work, and travel has combined with long-term structural
                  trends — the global talent shortage, the rise of remote work, digital nomadism, and expanding
                  investment migration programmes — to create one of the most active visa application environments
                  in history. Millions of people worldwide are navigating visa processes this year, many for the
                  first time.
                </p>
                <p>
                  At the same time, the visa application landscape has become more complex. Most major destination
                  countries have reformed their immigration systems significantly in the past three years.
                  The UK introduced the Skilled Worker Visa in 2021 and has since revised salary thresholds
                  multiple times, most recently raising the general threshold to £38,700. Canada's Express Entry
                  system now draws candidates by occupation category in addition to general draws. Australia
                  has reformed its SkillSelect programme to address critical skills shortages. Germany enacted
                  the most comprehensive reform of its immigration law in decades, creating new pathways for
                  skilled workers without prior German recognition of their qualifications.
                </p>
                <p>
                  The Gulf region is undergoing a transformation. The UAE's Golden Visa, Green Visa, and
                  Freelance Permit are attracting hundreds of thousands of skilled professionals and entrepreneurs.
                  Saudi Arabia's Vision 2030 programme is opening the country to foreign workers and tourists
                  in unprecedented ways. Turkey has emerged as a popular destination for investors seeking
                  citizenship by investment, as well as for digital nomads drawn by low costs and favourable
                  e-visa access.
                </p>
                <p>
                  Navigating this environment requires more than basic checklist information. It requires
                  understanding the strategic landscape — which countries are prioritising which skill sets,
                  where processing times are fastest, which pathways lead to permanent residency, and how
                  different visa categories connect to long-term immigration goals. Our guides are designed
                  to provide exactly this level of strategic insight, not just lists of required documents.
                </p>
              </div>
            </div>

            {/* Country Difficulty Rankings */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">Visa Difficulty — Which Countries Are Easiest and Hardest?</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  One of the most common questions from visa applicants is: "Which country is easiest to get
                  a visa for?" The honest answer is that it depends on your nationality, your purpose of travel,
                  your income and assets, and your application history. But some general patterns hold across
                  applicant profiles.
                </p>
                <p>
                  <strong className="text-gray-800">Generally more straightforward for tourists:</strong> The UAE
                  and Turkey offer e-visas that are approved within minutes or hours for most nationalities. Many
                  European Schengen countries are accessible for well-documented tourist applications, though refusal
                  rates vary by consulate and applicant nationality. Canada's eTA for visa-exempt nationals is
                  almost automatic. Australia's Electronic Travel Authority (ETA) for eligible passport holders
                  is similarly straightforward.
                </p>
                <p>
                  <strong className="text-gray-800">More complex for workers and students:</strong> Work visas for
                  the UK, USA, Canada, and Australia require employer sponsorship, skills assessments, or
                  points-based eligibility that takes months to build. The US H-1B visa system runs a lottery
                  with a registration-to-cap ratio that has made it effectively inaccessible for many applicants.
                  Canada's Express Entry is meritocratic but competitive — Comprehensive Ranking System (CRS)
                  cut-off scores in recent years have ranged from 481 to 543 for general draws.
                </p>
                <p>
                  <strong className="text-gray-800">New emerging pathways:</strong> Germany's opportunity card
                  (Chancenkarte), launched under the 2024 Skilled Immigration Act reforms, allows skilled workers
                  to enter Germany to seek employment without a prior job offer — a significant change from
                  traditional work visa requirements. Portugal's D8 Digital Nomad Visa and the Netherlands'
                  Orientation Year permit for recent graduates are similarly innovative pathways attracting
                  significant interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Study vs Work comparison */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">Study Visa vs Work Visa — Choosing the Right Pathway</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  For many internationally mobile professionals, the choice between a study visa pathway and
                  a direct work visa pathway is one of the most consequential decisions in their immigration
                  journey. Each has distinct advantages, costs, timelines, and long-term implications.
                </p>
                <p>
                  <strong className="text-gray-800">The study visa pathway</strong> involves studying at a
                  recognised institution in the destination country, which typically grants access to part-time
                  work rights during study and post-study work rights after graduation. The UK Graduate Route
                  allows international graduates to stay and work for 2 years after graduation (3 for PhD
                  graduates). Canada's Post-Graduation Work Permit (PGWP) grants up to 3 years of open work
                  authorisation and generates Canadian work experience valuable for Express Entry. Australia's
                  Temporary Graduate visa (subclass 485) provides 2–4 years of post-study work rights depending
                  on the degree level and study location.
                </p>
                <p>
                  The study pathway is longer and more expensive in direct costs (tuition, living expenses),
                  but it builds local qualifications, local work experience, and local professional networks —
                  all of which significantly strengthen subsequent permanent residency applications. It is
                  particularly valuable for applicants whose overseas qualifications may not be directly
                  recognised or who lack the specific work experience required for skilled worker visas.
                </p>
                <p>
                  <strong className="text-gray-800">The direct work visa pathway</strong> requires an employer
                  willing to sponsor you (UK Skilled Worker, Australia TSS), meeting points thresholds through
                  existing skills and experience (Canada Express Entry, Australia SkillSelect), or self-employment
                  and business credentials (UK Innovator Founder, Canada Start-up Visa). This pathway is faster
                  for experienced professionals already working in high-demand fields, but requires more immediate
                  eligibility and typically more upfront employer engagement.
                </p>
                <p>
                  The best pathway depends heavily on your current qualifications, work experience, age, English
                  language proficiency, financial resources, and long-term goals. Our country-specific guides
                  walk through both pathways in detail for each destination so you can make an informed decision
                  based on your personal profile.
                </p>
              </div>
            </div>

            {/* Top 10 documents guide */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-900">The 10 Documents That Determine Most Visa Outcomes</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
                <p>
                  After analysing thousands of visa application outcomes, immigration officers consistently
                  report that a small set of core documents — and the quality with which they are prepared —
                  account for the majority of approval and refusal decisions. Understanding what these documents
                  are and how to prepare them correctly is the single most impactful thing any applicant can do
                  to improve their chances.
                </p>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">1.</span>
                    <div><strong className="text-gray-800">Bank statements (3–6 months):</strong> The most commonly requested financial document and the one most often submitted incorrectly. Officers look for consistent balances, income sources that match your stated employment, and funds that have been present for an adequate period — not recently deposited lump sums.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">2.</span>
                    <div><strong className="text-gray-800">Employment letter / employer confirmation:</strong> Must state your position, salary, employment start date, nature of the business, and — crucially for tourist and visitor visas — confirmation that you have approved leave to travel and your position will be held for you.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">3.</span>
                    <div><strong className="text-gray-800">Travel history and passport:</strong> Your history of international travel — where you've been, how long you stayed, whether you returned as required — is one of the strongest predictors of future compliance. A clean travel history demonstrating respect for visa conditions substantially strengthens applications.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">4.</span>
                    <div><strong className="text-gray-800">Accommodation proof:</strong> Hotel bookings, host invitation letters, or rental agreements. The key is that your planned accommodation matches your stated itinerary and the duration of your intended stay.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">5.</span>
                    <div><strong className="text-gray-800">Purpose of travel documentation:</strong> For business visas, this is a business invitation letter from the host organisation. For tourism, a credible itinerary. For study, an unconditional or conditional offer letter from a registered institution. The documentation must be consistent with and supportive of your stated purpose.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">6.</span>
                    <div><strong className="text-gray-800">Ties to home country:</strong> For visitor visas especially, officers assess the risk that you will overstay. Property ownership, immediate family remaining at home, stable long-term employment, and business ownership are all evidence of strong ties that make overstaying less likely.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">7.</span>
                    <div><strong className="text-gray-800">English language test results:</strong> Required for study and most work visa categories. IELTS and TOEFL are most widely accepted. Minimum scores vary by visa category and institution — always verify the exact requirements for your specific application.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">8.</span>
                    <div><strong className="text-gray-800">Educational credentials and skill assessments:</strong> Degree certificates, transcripts, and for countries with points-based systems, skills assessment outcomes from the relevant assessment authority. Overseas qualifications sometimes require formal recognition before they can be used in an immigration application.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">9.</span>
                    <div><strong className="text-gray-800">Health and character clearances:</strong> Many long-term visas require police clearance certificates from all countries where you have lived for an extended period, and a medical examination from an authorised physician. These take time to obtain and should be requested early in the application process.</div>
                  </li>
                  <li className="flex gap-3">
                    <span className="shrink-0 font-bold text-primary-700">10.</span>
                    <div><strong className="text-gray-800">Cover letter / personal statement:</strong> Often underestimated, a well-written cover letter that clearly explains your purpose, your ties to home, your financial situation, and your immigration history in coherent narrative form can significantly improve the impression your application makes — especially when individual documents are strong but the overall picture needs explanation.</div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Understanding the Global Immigration System in 2026</h2>
          <div className="grid lg:grid-cols-3 gap-8 text-sm text-gray-600 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Points-Based Systems</h3>
              <p>
                Points-based immigration systems have become the gold standard for skilled worker immigration
                in the English-speaking world and are spreading globally. Canada, Australia, and the UK all
                use points to rank applicants and issue invitations to apply, allowing countries to selectively
                attract the skills and profiles that best meet their labour market needs.
              </p>
              <p>
                Canada's Comprehensive Ranking System (CRS) scores applicants on age, education, language
                proficiency, work experience, and adaptability factors, with additional points available for
                job offers, Canadian qualifications, and provincial nominations. The system creates clear
                incentives for applicants to invest in their profile — improving language scores, gaining
                additional qualifications, or obtaining a provincial nomination can dramatically increase
                an applicant's CRS score.
              </p>
              <p>
                Australia's SkillSelect system operates similarly, with the added complexity of occupation-
                specific demand signals — certain occupations are invited at lower points thresholds because
                Australia has identified them as critical shortages. Understanding which occupations are in
                demand in each country is therefore a key strategic consideration for anyone planning a
                skilled migration pathway.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">The Rise of Digital Nomad and Remote Work Visas</h3>
              <p>
                One of the most significant visa policy developments of the past three years has been the
                proliferation of digital nomad and remote work visas. As remote work became normalised
                during and after the pandemic, dozens of countries introduced new visa categories designed
                to attract location-independent workers who earn income from employers or clients outside
                the host country.
              </p>
              <p>
                These visas vary enormously in their requirements and benefits. Some, like Germany's
                freelance visa (Freiberufler), are long-established. Others, like Portugal's D8 Digital
                Nomad Visa, Spain's Startups Act Digital Nomad Visa, and the UAE's Virtual Working
                Programme, are recent innovations. Most require proof of regular income above a specified
                threshold (typically 3–5 times the local minimum wage) and health insurance coverage.
              </p>
              <p>
                Digital nomad visas typically do not grant the right to work for local employers, only
                to continue working remotely for overseas employers or clients. They also generally do not
                count towards permanent residency accumulation in most countries, though some (like
                Portugal's) can serve as a stepping stone towards long-term residency.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900">Investor Visas and Citizenship by Investment</h3>
              <p>
                Citizenship by Investment (CBI) and Residency by Investment (RBI) programmes allow high-net-worth
                individuals to obtain citizenship or residency rights in exchange for qualifying investments —
                typically in government bonds, real estate, business creation, or direct government contributions.
                These programmes have grown significantly in both number and popularity.
              </p>
              <p>
                The Caribbean nations — St Kitts and Nevis, Antigua and Barbuda, Grenada, Dominica, St Lucia —
                offer the most established CBI programmes, with processing times as short as 45 days and
                investment thresholds starting at around $100,000. European CBI programmes have faced increasing
                scrutiny: the EU pressured Malta to reform its programme, and several countries that previously
                offered Golden Visas (including Portugal and Ireland) have made their programmes significantly
                more restrictive in response to concerns about their effect on local housing markets.
              </p>
              <p>
                Turkey's Citizenship by Investment programme, which requires a minimum $400,000 real estate
                purchase or $500,000 capital deposit, has attracted significant interest from investors in
                the Middle East, Central Asia, and South Asia. Turkish citizenship provides visa-free or
                visa-on-arrival access to 110+ countries, making it a popular second citizenship option.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POPULAR COUNTRIES STRIP ────────────────────────────────────────── */}
      <section className="py-14 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
            Explore All Destinations
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-3">
            {COUNTRIES.map((c) => (
              <Link
                key={c.slug}
                href={`/country/${c.slug}`}
                className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <span className="text-3xl">{c.flag}</span>
                <span className="text-xs font-semibold text-gray-700 group-hover:text-primary-800 transition-colors text-center leading-tight">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
