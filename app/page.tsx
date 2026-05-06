import type { Metadata } from "next";
import Link from "next/link";
import SearchFilter from "@/components/SearchFilter";
import Button from "@/components/ui/Button";
import { VISA_TYPES } from "@/data/visa-types";
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

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(homeFaqs)) }}
      />

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="text-accent-400">●</span>
            Updated for 2026 — Free Visa Guides
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Your Complete Guide to{" "}
            <span className="text-accent-400">Visas & Immigration</span>{" "}
            Worldwide
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            Study abroad, work overseas, travel the world, or settle permanently — we cover every visa type for 15+ countries with step-by-step guides, requirements, and expert tips.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="#countries" variant="secondary" size="lg">
              Browse Countries
            </Button>
            <Button href="/blog" variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Read Visa Guides
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-14 max-w-3xl mx-auto">
            {[
              { label: "Countries Covered", value: "15+" },
              { label: "Visa Guides", value: "500+" },
              { label: "Visa Categories", value: "4" },
              { label: "Updated", value: "2026" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl font-extrabold text-accent-400">{s.value}</div>
                <div className="text-sm text-blue-200 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Visa Type Highlights ─────────────────────────────────────────── */}
      <section id="visa-types" className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Explore by Visa Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you want to study, work, travel, or immigrate permanently — find the right visa pathway for your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISA_TYPES.map((v) => (
              <Link
                key={v.slug}
                href={`/visa/${v.slug}`}
                className="group relative overflow-hidden bg-gradient-to-br from-primary-50 to-white border border-primary-100 rounded-2xl p-6 hover:shadow-lg hover:border-primary-300 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-800 mb-2">
                  {v.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                  {v.shortDescription}
                </p>
                <div className="text-xs text-primary-700 font-semibold flex items-center gap-1">
                  Full Guide
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Country Search & Grid ────────────────────────────────────────── */}
      <section id="countries" className="py-14 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Find Visa Information by Country
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Search 15 destination countries and filter by visa type to quickly find the guides most relevant to your plans.
            </p>
          </div>
          <SearchFilter />
        </div>
      </section>

      {/* ─── Featured Guides CTA ─────────────────────────────────────────── */}
      <section className="py-12 bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            500+ Free Visa Guides Updated for 2026
          </h2>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            From step-by-step application walkthroughs to country-specific requirements and fee structures — our blog covers every scenario.
          </p>
          <Button href="/blog" variant="secondary" size="lg">
            Browse All Guides
          </Button>
        </div>
      </section>

      {/* ─── SEO Long-Form Content ────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose-article">
            <h2>Complete Visa and Immigration Guide: Everything You Need to Know in 2026</h2>

            <p>
              Applying for a visa is often the most stressful part of any international journey — whether you are planning to study at a world-class university, pursue a career abroad, take a long-awaited holiday, or start a new chapter as a permanent resident in a new country. The global immigration landscape changes constantly, with governments updating policies, introducing digital systems, and adjusting fee structures every year. That is why <strong>Global Visa Guide Hub</strong> exists — to provide you with accurate, up-to-date, and easy-to-understand visa information for the world's most popular destination countries.
            </p>

            <p>
              This guide covers the four major visa categories — <strong>study visas</strong>, <strong>work visas</strong>, <strong>tourist visas</strong>, and <strong>immigration and permanent residency</strong> — for 15 countries including the United States, United Kingdom, Canada, Germany, Australia, UAE, Saudi Arabia, Turkey, Italy, Spain, France, Netherlands, Sweden, Norway, and Switzerland.
            </p>

            <h2>Understanding the Major Visa Categories</h2>

            <h3>1. Study Visa (Student Visa)</h3>
            <p>
              A study visa allows international students to live and study in a foreign country for the duration of their academic program. It is typically tied to enrollment at an accredited educational institution and requires proof of admission, financial capability, and in many cases, language proficiency.
            </p>
            <p>
              Countries like <strong>Canada, Australia, and the United Kingdom</strong> are among the top destinations for international students. Canada issues a Study Permit through the IRCC (Immigration, Refugees and Citizenship Canada). Australia issues the Student Visa (Subclass 500) through the Department of Home Affairs. The UK issues a Student Visa through the Home Office, requiring a Confirmation of Acceptance for Studies (CAS) from a licensed sponsor institution.
            </p>
            <p>
              <strong>Germany</strong> is increasingly popular due to its tuition-free public universities. International students need a national student visa (D-Visa), and after arrival, must apply for a residence permit. Germany's student visa process requires proof of admission, blocked account (€11,208 for 2026), health insurance, and language proficiency depending on the program language.
            </p>

            <h3>2. Work Visa (Employment Visa)</h3>
            <p>
              A work visa authorizes foreign nationals to be employed by a company in another country. The requirements differ significantly by country — from employer-sponsored visas (USA H-1B, UK Skilled Worker Visa) to points-based immigration systems (Canada Express Entry, Australia SkillSelect).
            </p>
            <p>
              The <strong>USA H-1B visa</strong> is among the most competitive work visas globally, capped at 65,000 per year (plus 20,000 for US master's graduates) with an annual lottery system. In contrast, <strong>Canada's Express Entry</strong> system allows skilled workers to apply without a prior job offer, though having an LMIA-supported job offer adds significant points. The <strong>UK Skilled Worker Visa</strong> replaced the Tier 2 visa in 2021 and requires a job offer from a Home Office-approved sponsor with a salary meeting occupation-specific thresholds.
            </p>
            <p>
              <strong>Germany's Skilled Immigration Act (Fachkräfteeinwanderungsgesetz)</strong>, significantly expanded in 2024 and 2025, now allows skilled workers with vocational qualifications (not just university degrees) to obtain work visas. The EU Blue Card remains a top option for university graduates with a qualifying job offer meeting minimum salary thresholds.
            </p>

            <h3>3. Tourist Visa (Visitor Visa)</h3>
            <p>
              Tourist visas allow temporary entry for leisure, sightseeing, visiting family and friends, or attending short events. Visa requirements vary enormously based on bilateral agreements between countries.
            </p>
            <p>
              Citizens of many developed nations enjoy <strong>visa-free or visa-on-arrival access</strong> to most countries. Travelers from countries with stronger passports (USA, UK, Germany, UAE) often face fewer barriers. However, citizens of Pakistan, India, Bangladesh, and many African nations typically require prior visa approval for most destinations.
            </p>
            <p>
              The <strong>Schengen Area</strong>, covering 27 European countries, operates on a single visa system. A Schengen visa allows entry to all member states for up to 90 days within a 180-day period. Since 2022, the EU has been rolling out the <strong>EES (Entry/Exit System)</strong> and <strong>ETIAS (European Travel Information and Authorisation System)</strong> for visa-exempt travelers, adding a digital layer to border management.
            </p>

            <h3>4. Immigration and Permanent Residency (PR)</h3>
            <p>
              Permanent residency gives foreign nationals the right to live and work in a country indefinitely without a time-limited visa. It is the final step before citizenship for most immigrants.
            </p>
            <p>
              <strong>Canada's Express Entry</strong> system uses a Comprehensive Ranking System (CRS) that scores candidates on age, education, work experience, language skills, and adaptability. The highest-scoring candidates receive Invitations to Apply (ITA) in regular draws. Canada also has Provincial Nominee Programs (PNPs) that allow provinces to nominate candidates with specific skills.
            </p>
            <p>
              <strong>Australia's SkillSelect</strong> points-tested system includes the Skilled Independent Visa (Subclass 189), the Skilled Nominated Visa (Subclass 190), and the Skilled Work Regional Visa (Subclass 491). Points are awarded for age, English proficiency, skilled employment, educational qualifications, and other factors.
            </p>
            <p>
              <strong>Germany's settlement permit (Niederlassungserlaubnis)</strong> can be obtained after 4–5 years of qualifying residence, with German language proficiency at B1 level, stable employment, and sufficient pension contributions as key requirements.
            </p>

            <h2>How to Choose the Right Country for Your Visa Goals</h2>

            <p>
              Choosing the right destination country is as important as the visa application itself. Consider these factors:
            </p>
            <ul>
              <li><strong>Purpose:</strong> Are you studying, working, traveling, or settling permanently? Each purpose requires a specific visa type, and countries vary in how welcoming they are to each category.</li>
              <li><strong>Processing time:</strong> Some countries (UAE, Turkey) process visas in days. Others (USA, UK) can take weeks to months, especially for complex categories.</li>
              <li><strong>Cost of living:</strong> Germany and Turkey offer relatively affordable living standards. Switzerland, Norway, and the UAE have high costs. This affects how much financial proof you need.</li>
              <li><strong>PR pathway:</strong> If long-term settlement is your goal, prioritize countries with transparent and accessible PR pathways — Canada, Australia, and Germany lead here.</li>
              <li><strong>English-language environment:</strong> USA, UK, Canada, and Australia are predominantly English-speaking. Germany, France, Italy, and Spain require language integration, though many programs are taught in English.</li>
            </ul>

            <h2>The Visa Application Process: A Universal Framework</h2>

            <p>
              While every country has its own specific procedures, most visa applications follow a similar framework:
            </p>
            <ol>
              <li><strong>Determine your visa category</strong> — study, work, tourist, or immigration</li>
              <li><strong>Check eligibility</strong> using the official government immigration portal</li>
              <li><strong>Gather required documents</strong> — passport, photos, financial evidence, purpose documentation</li>
              <li><strong>Complete the application form</strong> accurately and completely</li>
              <li><strong>Pay the visa fee</strong> through the official portal or bank</li>
              <li><strong>Submit biometrics</strong> at an approved visa application center</li>
              <li><strong>Attend an interview</strong> if required (common for US visas)</li>
              <li><strong>Track your application</strong> and respond to any requests for additional documents</li>
              <li><strong>Collect your visa</strong> and verify all details before traveling</li>
            </ol>

            <h2>Top Countries for International Students in 2026</h2>

            <p>
              The global student visa landscape in 2026 is shaped by post-pandemic recovery, rising tuition costs in English-speaking countries, and growing demand for STEM programs. Here are the top destinations:
            </p>
            <ul>
              <li><strong>Canada</strong> — Strong post-study work rights (PGWP up to 3 years), PR pathways, and multicultural cities make it the top choice for many.</li>
              <li><strong>Germany</strong> — Tuition-free at public universities, globally ranked technical universities (TU Munich, KIT), and a growing tech economy.</li>
              <li><strong>Australia</strong> — World-class universities (Group of Eight), strong labor market, and post-study work visa options.</li>
              <li><strong>UK</strong> — Prestigious institutions, 2-year Graduate Route visa for post-study work, and a global research environment.</li>
              <li><strong>Netherlands</strong> — High English-language instruction availability, innovative startup ecosystem, and EU residency rights.</li>
            </ul>

            <h2>Common Visa Mistakes and How to Avoid Them</h2>

            <p>
              Visa refusals are largely preventable. The most common reasons for rejection include:
            </p>
            <ul>
              <li>Incomplete or inconsistent application forms</li>
              <li>Insufficient financial proof or unexplained bank deposits</li>
              <li>Lack of clear purpose or intent to return to home country</li>
              <li>Photographs that do not meet specifications</li>
              <li>Expired or invalid supporting documents</li>
              <li>Missing travel insurance (required for many Schengen applications)</li>
              <li>Previous overstays or immigration violations</li>
            </ul>
            <p>
              Always apply through official embassy portals or accredited visa application centers. Avoid third-party agents who make unrealistic promises, as visa decisions rest solely with government authorities.
            </p>

            <h2>Digital Transformation in Visa Processing: What&apos;s New in 2026</h2>

            <p>
              Immigration systems worldwide are rapidly digitalizing. Key developments in 2026 include:
            </p>
            <ul>
              <li><strong>UK Digital Entry Requirements:</strong> The UK has fully rolled out its Electronic Travel Authorization (ETA) for visa-exempt visitors arriving from 2024.</li>
              <li><strong>EU ETIAS:</strong> The European Travel Information and Authorisation System (ETIAS) launches for visa-exempt travelers to the Schengen zone, requiring online pre-registration and a €7 fee.</li>
              <li><strong>Canada IRCC Digital Portal:</strong> Canada has transitioned most applications to the fully digital IRCC portal, with biometrics captured at VACs worldwide.</li>
              <li><strong>Australia ImmiAccount:</strong> Australia's online system allows complete digital management of student and skilled worker visas.</li>
              <li><strong>UAE ICA Smart Services:</strong> The UAE's Identity and Citizenship Authority (ICA) offers fully digital visa and residence permit services.</li>
            </ul>

            <h2>FAQs About Visa Applications in 2026</h2>
          </article>

          {/* FAQ with schema */}
          <div className="mt-6">
            {homeFaqs.map((faq, i) => (
              <details key={i} className="mb-3 border border-gray-200 rounded-xl overflow-hidden group">
                <summary className="px-5 py-4 font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between hover:bg-primary-50 transition-colors">
                  {faq.question}
                  <svg className="w-5 h-5 text-primary-700 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-5 py-4 text-sm text-gray-700 bg-primary-50 border-t border-gray-200 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          <div className="prose-article mt-8">
            <h2>Start Your Visa Journey Today</h2>
            <p>
              Whether you are a first-time applicant or navigating a complex immigration case, Global Visa Guide Hub is your trusted companion. Use the country cards above to find detailed, country-specific guides. Browse our blog for the most up-to-date articles covering every visa scenario. And if you are unsure where to start, our visa type guides for <Link href="/visa/study">study</Link>, <Link href="/visa/work">work</Link>, <Link href="/visa/tourist">tourist</Link>, and <Link href="/visa/immigration">immigration</Link> visas will point you in the right direction.
            </p>
            <p>
              The information on this website is regularly updated from official government immigration portals, embassy websites, and reputable immigration law sources. Always verify the latest requirements directly with the relevant embassy or consulate before submitting your application.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
