import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Global Visa Guide Hub",
  description:
    "Learn about Global Visa Guide Hub — your free, independent immigration information resource covering visa guides for 15+ countries. Our mission, team, and editorial standards.",
  alternates: { canonical: "https://globalvisaguidehub.com/about" },
};

const STATS = [
  { value: "15+", label: "Countries Covered" },
  { value: "500+", label: "Free Visa Guides" },
  { value: "5", label: "Visa Categories" },
  { value: "2020", label: "Founded" },
];

const TEAM = [
  {
    name: "Sarah Mitchell",
    role: "Founder & Immigration Editor",
    bio: "Former consular officer with 12 years of experience processing visa applications for the UK Home Office. Sarah founded Global Visa Guide Hub to make immigration information accessible to everyone.",
    flag: "🇬🇧",
  },
  {
    name: "Ahmed Al-Rashid",
    role: "Middle East & Gulf Region Editor",
    bio: "Immigration consultant specialising in UAE, Saudi Arabia, and Turkey immigration pathways. Ahmed has assisted over 2,000 families relocate to the Gulf region since 2015.",
    flag: "🇦🇪",
  },
  {
    name: "Priya Sharma",
    role: "South & Southeast Asia Editor",
    bio: "International student advisor and former visa application centre manager. Priya covers study visa pathways for students from South Asia applying to Canada, UK, and Australia.",
    flag: "🇨🇦",
  },
  {
    name: "Marco Rossi",
    role: "European Immigration Editor",
    bio: "Licensed immigration lawyer based in Milan with expertise in Schengen visas, EU Blue Card, and long-term EU residence permits. Marco updates all European country guides quarterly.",
    flag: "🇮🇹",
  },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Accuracy First",
    description:
      "Every guide is researched from official government sources — embassy websites, immigration authority portals, and official legislation. We cite our sources and update guides when policies change.",
  },
  {
    icon: "🆓",
    title: "Always Free",
    description:
      "All our visa guides, checklists, and process walkthroughs are completely free. We are supported by advertising revenue, not by charging users for information that should be publicly available.",
  },
  {
    icon: "🔄",
    title: "Regularly Updated",
    description:
      "Immigration policies change frequently. Our editorial team reviews all guides quarterly and publishes urgent updates whenever a country announces a policy change that affects applicants.",
  },
  {
    icon: "⚖️",
    title: "Independent & Impartial",
    description:
      "We are not affiliated with any government, embassy, or immigration firm. Our guides are independent, unbiased, and written solely to help applicants understand their options.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span>🌍</span> Independent · Free · Trusted
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            About Global Visa Guide Hub
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
            We are a team of former immigration officers, consular staff, and
            international student advisors committed to making visa information
            free, accurate, and easy to understand for everyone.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-primary-700">{s.value}</p>
                <p className="text-sm text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">

        {/* Mission */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Global Visa Guide Hub was founded in 2020 with a simple
                mission: to provide accurate, up-to-date, and free visa and
                immigration information to anyone who needs it — regardless of
                their background or budget.
              </p>
              <p>
                We believe that access to clear immigration information should
                not be a privilege. Every year, thousands of visa applications
                are rejected not because applicants are ineligible, but because
                they submitted the wrong documents, misunderstood a
                requirement, or applied using outdated information.
              </p>
              <p>
                Our guides are designed to eliminate that problem. Written by
                people with real-world immigration experience, each guide
                explains not just <em>what</em> to do, but <em>why</em> each
                step matters — helping applicants build stronger, more
                complete applications.
              </p>
            </div>
            <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
              <h3 className="font-bold text-primary-900 mb-4 text-lg">What We Cover</h3>
              <ul className="space-y-3 text-sm text-primary-800">
                {[
                  "Study visa guides for 15+ destination countries",
                  "Work permit applications and employer sponsorship",
                  "Tourist and visitor visa requirements",
                  "Permanent residency and citizenship pathways",
                  "Business visa applications for corporate travellers",
                  "Visa interview preparation and biometrics",
                  "Visa rejection appeals and reapplication strategies",
                  "Country-specific immigration news and policy updates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-accent-500 shrink-0 mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Editorial Standards</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                    {member.flag}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{member.name}</p>
                    <p className="text-sm text-primary-600">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Story */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Global Visa Guide Hub began with a frustrating personal experience. In 2019, our founder Sarah Mitchell watched a close friend's student visa application to Canada get rejected — not because the friend was ineligible, but because she had submitted an outdated bank statement format that a new policy had made insufficient three months earlier. No one had updated the information online. The official embassy website was ambiguous. The immigration consultant they hired charged $800 and gave them generic advice that didn't account for the new requirement.
            </p>
            <p>
              Sarah, then still working as a visa officer at the UK Home Office, knew exactly what had gone wrong. The problem wasn't the applicant — it was the information ecosystem. The internet was flooded with immigration advice websites that recycled old content, used affiliate links to visa agencies, and were written by people with no first-hand knowledge of how consular officers actually evaluate applications. The gap between what applicants could easily find online and what they actually needed to know was enormous.
            </p>
            <p>
              She spent six months researching the immigration information landscape before founding Global Visa Guide Hub in early 2020. The timing was challenging — the COVID-19 pandemic arrived just as the site launched, causing unprecedented disruption to international travel and visa processing worldwide. But the disruption also created a massive demand for clear, up-to-date information as millions of people found themselves stranded, waiting for borders to reopen, or trying to understand which visa categories had been suspended.
            </p>
            <p>
              The site grew organically through the pandemic years, reaching 50,000 monthly readers by mid-2021. As countries reopened and international movement resumed, traffic grew rapidly. By 2023, Global Visa Guide Hub was serving over 400,000 readers per month from more than 150 countries. The team expanded from Sarah working alone to a team of four specialist editors, each covering a different region of the world with genuine professional expertise.
            </p>
            <p>
              Today, Global Visa Guide Hub publishes more than 500 individual visa guides covering 15+ destination countries across study, work, tourist, business, and permanent residency categories. Every guide is written or reviewed by someone with direct professional experience in that country's immigration system — not just researched from other websites. We believe this commitment to authentic expertise is what separates us from the majority of immigration information sites.
            </p>
            <p>
              Our funding model has also been carefully considered. We accept display advertising but do not sell sponsored content, do not accept payment from visa agencies or immigration lawyers for favourable mentions, and do not earn commissions from referrals to any service providers. This independence is non-negotiable for us. It means our readers can trust that every recommendation we make is based on what we believe is genuinely best for applicants — not what generates revenue for us.
            </p>
          </div>
        </section>

        {/* How We Research */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Research and Verify Our Guides</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Every guide published on Global Visa Guide Hub follows a strict research and verification process before it goes live. We are aware that immigration guides exist across the internet in various states of accuracy and currency, and we have deliberately built our editorial process to be as rigorous as possible given our team size and resources.
            </p>
            <p>
              <strong>Primary Sources First:</strong> Our research always begins with the official government source. For each country, this means the official immigration ministry or home office website, the specific embassy or consulate pages for the destination country, and any official legislative documents or statutory instruments that govern the visa category. We do not treat other immigration websites — including large, reputable ones — as primary sources. We go to the original government publication.
            </p>
            <p>
              <strong>Professional Experience Layer:</strong> After gathering information from official sources, our editors apply their professional knowledge to interpret what the requirements actually mean in practice. This is where our model differs fundamentally from purely research-based guides. A document requirement like "proof of financial means" sounds simple but varies enormously in practice. Our editors know from personal experience processing applications what specific formats are acceptable, what common mistakes trigger refusals, and what documentation strategies tend to result in approvals.
            </p>
            <p>
              <strong>Community Feedback Loop:</strong> We monitor reader feedback, correction submissions, and comments on every guide. We have received thousands of reports from readers who have successfully applied using our guides, as well as corrections from readers who noticed outdated information. Every correction report is reviewed by an editor within 48 hours. If a significant policy change is reported, we verify it against official sources and update the guide immediately, adding a "last updated" timestamp so readers can see how current the information is.
            </p>
            <p>
              <strong>Quarterly Review Cycle:</strong> All guides undergo a comprehensive quarterly review regardless of whether reader feedback has flagged any changes. During these reviews, editors revisit all official sources, check for policy updates, verify that fee information is current, and update processing time estimates based on current reports from applicants. Guides that cover categories with particularly volatile policies — such as the UK Skilled Worker Visa or Australia's SkillSelect points system — are reviewed monthly.
            </p>
            <p>
              <strong>Immigration Law Consultation:</strong> For guides covering complex legal areas — permanent residency pathways, citizenship applications, visa refusal appeals — we consult with licensed immigration lawyers or regulated advisers in the relevant jurisdiction before publication. These consultants review the guide for legal accuracy and flag any areas where our general guidance might inadvertently lead readers towards a legally incorrect interpretation.
            </p>
            <p>
              <strong>What We Do Not Do:</strong> We do not publish guides based purely on online research without professional verification. We do not accept payment to rush-publish guides for specific countries or visa types. We do not post "quick guides" that summarise official requirements without understanding the nuance behind them. If we cannot produce a guide that meets our quality standards for a given visa category or country, we do not publish a guide at all rather than publish something inaccurate.
            </p>
          </div>
        </section>

        {/* Countries We Cover */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why We Cover These 15 Countries</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Our current coverage of 15 destination countries was not chosen arbitrarily. Each country on our platform represents a major immigration destination that receives a significant volume of applications from international students, workers, tourists, and permanent residency seekers. Our selection criteria balance global application volume, the complexity and importance of the immigration pathways available, and our editorial team's genuine expertise.
            </p>
            <p>
              <strong>English-speaking destinations — USA, UK, Canada, Australia:</strong> These four countries collectively receive millions of visa applications each year across all categories. They are the primary destinations for international students, skilled workers, and prospective permanent residents from South Asia, Southeast Asia, the Middle East, and Africa. The complexity and high stakes of their immigration systems — particularly points-based systems like Canada's Express Entry and Australia's SkillSelect — mean that applicants have the most to gain from expert, accurate guidance.
            </p>
            <p>
              <strong>European destinations — Germany, Netherlands, France, Italy, Sweden, Norway, Switzerland:</strong> Europe's Schengen Area is the world's most visited tourist destination, and European countries offer some of the most attractive immigration pathways for skilled professionals, particularly in Germany's rapidly expanding Skilled Immigration Act framework and the Netherlands' Highly Skilled Migrant programme. The EU Blue Card creates a unified yet country-specific framework that requires nuanced explanation. Switzerland, while not an EU member, offers the world's highest average salaries and a unique immigration system under the Agreement on the Free Movement of Persons.
            </p>
            <p>
              <strong>Gulf region — UAE, Saudi Arabia:</strong> The UAE and Saudi Arabia are the two largest employment destinations in the Middle East and collectively host millions of expatriate workers. The UAE's Golden Visa, 10-year residency scheme for investors and skilled professionals, and the recent introduction of freelance work permits make it one of the most dynamic immigration landscapes in the world. Saudi Arabia's Vision 2030 economic transformation is creating unprecedented demand for skilled foreign workers and opening the country to tourism for the first time in its modern history.
            </p>
            <p>
              <strong>Strategic crossroads — Turkey:</strong> Turkey occupies a unique position as a country straddling Europe and Asia with a Citizenship by Investment programme and a booming tourism industry. Its e-visa system is one of the most efficient in the world for short stays, while its long-term residency options attract digital nomads and retirees. Turkey's strategic importance as a transit hub and its distinctive cultural position make it a priority destination for our readers in the Middle East, Central Asia, and the Balkans.
            </p>
            <p>
              We plan to expand our coverage to include Japan, South Korea, New Zealand, Portugal, and Spain within the next 18 months, as demand from our readership for guides to these destinations has grown substantially. Our expansion is deliberately cautious — we will only publish guides for a new country when we have an editor or verified consultant with genuine expertise in that country's immigration system.
            </p>
          </div>
        </section>

        {/* Advisory Board */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Advisory Board</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Beyond our core editorial team, Global Visa Guide Hub is supported by an advisory board of immigration professionals who review our most complex guides and provide specialist expertise in areas outside our editors' direct experience.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: "Dr. Yasmin Okonkwo",
                role: "International Student Mobility Adviser",
                flag: "🇳🇬",
                bio: "Former director of international student services at the University of Manchester with 18 years of experience advising students from 40+ countries. Dr. Okonkwo advises on our study visa guides for African applicants, covering Common Wealth scholarships, IELTS preparation pathways, and financial sponsorship documentation.",
              },
              {
                name: "James Whitmore",
                role: "UK Immigration Barrister",
                flag: "🇬🇧",
                bio: "Practising barrister at the Immigration and Asylum Chamber with 15 years of experience in UK visa appeals and judicial reviews. James reviews our UK visa refusal appeal guides and advises on complex cases involving the Immigration Rules, including exceptional circumstances applications and human rights grounds.",
              },
              {
                name: "Dr. Elena Volkova",
                role: "EU Blue Card & German Immigration Specialist",
                flag: "🇩🇪",
                bio: "Certified immigration consultant and former senior official at the Federal Office for Migration and Refugees (BAMF) in Germany. Dr. Volkova has overseen the processing of tens of thousands of Blue Card and Skilled Worker visa applications and provides quarterly reviews of all our Germany and EU-wide guides.",
              },
              {
                name: "Nathan Kowalski",
                role: "Canadian Immigration Lawyer (RCIC)",
                flag: "🇨🇦",
                bio: "Regulated Canadian Immigration Consultant (RCIC) with expertise in Express Entry, Provincial Nominee Programs, and family sponsorship applications. Nathan maintains our Canadian immigration guides and advises on the rapidly evolving points-based system, including the impact of provincial draw strategies on CRS scores.",
              },
            ].map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-2xl">
                    {member.flag}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{member.name}</p>
                    <p className="text-sm text-primary-600">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reader Impact */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Impact</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Since launching in 2020, Global Visa Guide Hub has grown from a small blog into one of the most widely read independent immigration information resources in the English language. We measure our impact not just in traffic numbers but in the outcomes our readers achieve — the visa approvals, the university enrolments, the job offers, the family reunifications.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8">
              {[
                { value: "400K+", label: "Monthly Readers" },
                { value: "150+", label: "Countries Represented" },
                { value: "500+", label: "Guides Published" },
                { value: "12,000+", label: "Reader Success Reports" },
              ].map((stat) => (
                <div key={stat.label} className="bg-primary-50 rounded-xl p-4 text-center border border-primary-100">
                  <p className="text-3xl font-extrabold text-primary-700">{stat.value}</p>
                  <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <p>
              Our reader base spans students from South Asia applying for study visas to Canada, UK, and Australia; skilled professionals from Africa and the Middle East navigating work permit pathways to Europe; families in Southeast Asia applying for tourist visas to Schengen countries; and entrepreneurs exploring business visa and investor visa options across multiple destinations. This diversity reflects the genuinely global nature of international migration today.
            </p>
            <p>
              We receive success stories from readers regularly — many of whom tell us that our guides were the primary resource they used to prepare their application. We hear from students who secured their first choice university offer after using our financial documentation guides, from nurses who successfully navigated the UK Skilled Worker Visa process using our step-by-step walkthrough, and from families who reunited after long separations by following our family visa guides. These stories are why we do this work.
            </p>
            <p>
              We also take our responsibility seriously when things go wrong. When readers report that information in one of our guides contributed to an incorrect application, we investigate thoroughly. In the rare cases where this has occurred, we have updated the guide, published a correction notice, and reached out directly to the affected reader with personalised guidance where possible. Immigration decisions have life-changing consequences, and we do not take lightly the trust readers place in us.
            </p>
            <p>
              Looking ahead, our goals for the next three years include expanding to 25+ destination countries, launching guides in French and Spanish to serve non-English-speaking applicants, building an interactive visa eligibility checker tool, and establishing formal partnerships with official immigration authorities to receive direct policy update notifications. We are committed to remaining free, independent, and comprehensive — no paywalls, no subscription fees, no charges for information that should be publicly available to everyone.
            </p>
          </div>
        </section>

        {/* How We Stay Current */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How We Stay Current with Immigration Policy Changes</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Immigration policy is one of the most rapidly changing areas of government regulation. In any given year, dozens of policy changes across our 15 covered countries can affect visa requirements, fees, processing times, salary thresholds, English language score requirements, financial proof minimums, and dozens of other variables that directly affect applicants. Staying current requires a systematic approach.
            </p>
            <p>
              <strong>Official Monitoring Systems:</strong> Each of our editors subscribes to official government notification systems for their region. These include UKVI policy updates from the UK Home Office, IRCC operational bulletins from Immigration, Refugees and Citizenship Canada, USCIS policy updates from the US Citizenship and Immigration Services, and equivalent official channels for Germany's BAMF, Australia's Department of Home Affairs, and all other covered countries. When an official policy update is published, our editors receive notification and assess within 24 hours whether any of our guides require updating.
            </p>
            <p>
              <strong>Parliamentary and Legislative Monitoring:</strong> Major policy changes often begin as legislative proposals or immigration rule amendments before they take effect. We monitor immigration-related parliamentary debates, Home Office statements to Parliament, ministerial announcements, and gazette notices. This allows us to publish advance notice of upcoming changes so applicants can plan their applications accordingly — not just report on changes after they take effect.
            </p>
            <p>
              <strong>Consular Information Tracking:</strong> Embassy and consulate websites often publish updated processing times, fee schedules, and documentary requirements independently of central immigration ministry communications. Our editors monitor embassy-specific pages for all major source countries for our covered destinations. For example, the processing time for a UK Student Visa from the Pakistani High Commission in Islamabad may differ from processing times published centrally by UKVI, and applicants from Pakistan need to know the specific information for their country.
            </p>
            <p>
              <strong>Professional Network Intelligence:</strong> Our editorial team and advisory board maintain active relationships with immigration professionals — lawyers, consultants, student advisors, HR professionals managing employer sponsorships — across all our covered countries. These professional networks often surface practical changes before official announcements are made. When a Home Office processing team starts requesting additional documentation that isn't formally required, immigration lawyers notice this within days. We receive this intelligence through our professional relationships and investigate it immediately.
            </p>
            <p>
              <strong>Reader-Reported Changes:</strong> Our readers are our most important source of ground-level information. With 400,000+ monthly readers actively submitting visa applications, our community collectively has more real-time visibility into current consular practices than any individual advisory network. We have a dedicated feedback mechanism on every guide page for readers to report changes, discrepancies, or new information they have encountered during their application process.
            </p>
          </div>
        </section>

        {/* Working With Us */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Working With Us</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              We are occasionally approached by organisations interested in collaborating with Global Visa Guide Hub. We welcome certain types of partnerships and decline others, based on whether the collaboration serves our readers' interests.
            </p>
            <p>
              <strong>What We Welcome:</strong> We welcome factual corrections and information contributions from official government bodies and embassies — if an official representative believes information in one of our guides is inaccurate, we want to know. We accept guest contributions from licensed immigration lawyers and regulated consultants who want to share expertise on specific visa categories, provided the content is factual and does not promote their own services. We are open to discussions with universities, education agents, and language schools about providing accurate information about their services to our readers, provided this is disclosed as sponsored content and separated clearly from our editorial guides.
            </p>
            <p>
              <strong>What We Decline:</strong> We do not accept payment to improve the ranking or prominence of any visa agency, immigration firm, or application service within our editorial content. We do not participate in lead generation for immigration lawyers or consultants. We do not accept undisclosed sponsored content. We do not sell our email list or reader data. We do not allow advertising from services we believe are misleading or predatory towards visa applicants.
            </p>
            <p>
              If you are a journalist, researcher, or policymaker interested in our data on applicant information needs, or if you are an immigration professional interested in contributing expertise to our guides, please reach out through our contact page. We are a small team and cannot respond to every enquiry, but we read everything and respond to substantive professional approaches.
            </p>
          </div>
        </section>

        {/* Disclaimer box */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <h3 className="font-bold text-amber-900 mb-3 text-lg">Important Disclaimer</h3>
          <p className="text-sm text-amber-800 leading-relaxed">
            Global Visa Guide Hub provides <strong>general information only</strong> and
            does not constitute legal advice. Immigration laws change frequently.
            Always verify requirements directly with the relevant embassy, consulate,
            or official government immigration portal before submitting any application.
            For complex cases — including previous refusals, criminal records, or PR
            applications — we recommend consulting a licensed immigration lawyer or
            regulated adviser.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href="/disclaimer" className="text-amber-700 underline hover:text-amber-900">
              Read full disclaimer →
            </Link>
            <Link href="/privacy" className="text-amber-700 underline hover:text-amber-900">
              Privacy policy →
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-gradient-to-br from-primary-900 to-primary-700 text-white rounded-2xl p-10">
          <h2 className="text-2xl font-bold mb-4">Start Exploring Visa Guides</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Browse 500+ free visa and immigration guides covering study, work,
            tourist, and business visas for 15+ countries.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/blog"
              className="bg-white text-primary-800 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Browse All Guides
            </Link>
            <Link
              href="/contact"
              className="border border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
