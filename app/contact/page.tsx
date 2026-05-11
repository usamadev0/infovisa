import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us | Global Visa Guide Hub",
  description:
    "Contact the Global Visa Guide Hub team for content corrections, partnership inquiries, advertising, or general questions about our visa and immigration guides.",
  alternates: { canonical: "https://www.visaprocessinfo.com/contact" },
};

const TOPICS = [
  { icon: "✏️", title: "Content Correction", description: "Found an inaccuracy in one of our guides? Let us know so we can update it promptly." },
  { icon: "🤝", title: "Partnership & Guest Post", description: "Immigration professionals and legal firms interested in contributing content are welcome to reach out." },
  { icon: "📢", title: "Advertising", description: "For advertising, sponsored content, or media kit requests, contact our partnerships team." },
  { icon: "❓", title: "General Enquiries", description: "Questions about our website, how we work, or how to find a specific guide." },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} />
          <h1 className="text-4xl font-extrabold mt-4 mb-3">Contact Us</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Have a question, found an error in one of our guides, or want to work with us?
            We&apos;d love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="topic">
                    Topic
                  </label>
                  <select
                    id="topic"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="correction">Content Correction</option>
                    <option value="partnership">Partnership / Guest Post</option>
                    <option value="advertising">Advertising</option>
                    <option value="general">General Enquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="subject">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Incorrect fee information on Canada study visa guide"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="Please describe your question or request in detail. If reporting a content error, include the page URL and what the correct information should be."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary-800 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
                >
                  Send Message
                </button>
              </form>
              <p className="text-xs text-gray-400 mt-4">
                ⚠ We do not provide personalised immigration advice. For advice specific to your situation,
                please consult a licensed immigration consultant or lawyer. We typically respond within 3–5 business days.
              </p>
            </div>
          </div>

          {/* Sidebar info */}
          <aside className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">📧</span>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">contact@www.visaprocessinfo.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">🕐</span>
                  <div>
                    <p className="font-medium text-gray-900">Response Time</p>
                    <p className="text-gray-600">3–5 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0">🌍</span>
                  <div>
                    <p className="font-medium text-gray-900">Coverage</p>
                    <p className="text-gray-600">15+ countries, 500+ guides</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h3 className="font-bold text-gray-900 mb-4">Reason for Contact</h3>
              <div className="space-y-3">
                {TOPICS.map((t) => (
                  <div key={t.title} className="flex items-start gap-2.5">
                    <span className="text-lg shrink-0 mt-0.5">{t.icon}</span>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{t.title}</p>
                      <p className="text-xs text-gray-500">{t.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl border border-primary-100 p-5">
              <h3 className="font-bold text-primary-900 mb-2 text-sm">Looking for visa information?</h3>
              <p className="text-xs text-primary-800 mb-3">
                Browse our free guides instead of contacting us — we cover 500+ visa topics.
              </p>
              <div className="space-y-1.5 text-sm">
                <Link href="/blog" className="flex items-center gap-1.5 text-primary-700 hover:text-primary-900">
                  📚 Browse all guides
                </Link>
                <Link href="/visa/study" className="flex items-center gap-1.5 text-primary-700 hover:text-primary-900">
                  🎓 Study visa guides
                </Link>
                <Link href="/visa/work" className="flex items-center gap-1.5 text-primary-700 hover:text-primary-900">
                  💼 Work visa guides
                </Link>
                <Link href="/process/study-visa-application" className="flex items-center gap-1.5 text-primary-700 hover:text-primary-900">
                  📋 Apply process guides
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Extended content sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">

        {/* What to expect */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What to Expect When You Contact Us</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              We receive hundreds of messages each week from readers around the world, and we want to be transparent about what you can expect when you reach out. Understanding what we can and cannot help with will ensure you get the right support as quickly as possible.
            </p>
            <p>
              <strong>Content Corrections:</strong> This is the type of message we most want to receive. If you have found information in one of our guides that is outdated, incorrect, or missing important nuance, please tell us. We review every correction report within 48 hours. If we can verify the issue against official sources, we update the guide immediately and add a note confirming the update date. We take content accuracy extremely seriously — inaccurate immigration information can have life-changing consequences for applicants.
            </p>
            <p>
              <strong>Partnership and Guest Posts:</strong> We welcome contributions from licensed immigration lawyers, regulated immigration consultants, university international student advisors, and other verified immigration professionals. A quality guest post should be factual, sourced from official government publications, and offer genuine insight beyond what a reader could easily find on an official website. We do not publish advertorial content disguised as editorial, and we do not charge contributors for guest post placement. If your contribution is accepted, it will be reviewed by one of our editors and published with your professional credentials clearly stated.
            </p>
            <p>
              <strong>Advertising Enquiries:</strong> Global Visa Guide Hub accepts display advertising from organisations whose services are genuinely relevant and beneficial to our readers — language test preparation providers, international student health insurance, reputable immigration advisory services, international money transfer services, and similar. We do not accept advertising from services we consider misleading or exploitative towards visa applicants. Our media kit is available on request and outlines our audience demographics, monthly traffic, and available ad placements.
            </p>
            <p>
              <strong>What We Cannot Help With:</strong> We are an information resource, not an immigration advisory service. We cannot assess your personal eligibility for any visa category, review your specific application documents, advise on how to handle a refusal, or represent you in any immigration proceedings. Our guides provide general information based on official requirements — they are not personalised advice. For advice specific to your circumstances, please consult a licensed immigration lawyer or registered immigration consultant in your country.
            </p>
            <p>
              <strong>Response Times:</strong> We aim to respond to all messages within 3–5 business days. Content correction reports receive priority and are typically reviewed within 24–48 hours. Partnership and advertising enquiries may take longer during busy periods. We are a small team and read every message personally — we appreciate your patience and will always respond to substantive, good-faith enquiries.
            </p>
          </div>
        </section>

        {/* Finding the right guide */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Finding the Right Guide Before You Contact Us</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Many questions we receive are already answered in our guides. Before sending us a message, we encourage you to search our site — you may find exactly what you need without waiting for a response. Here is a guide to navigating our content:
            </p>
            <p>
              <strong>Study Visa Questions:</strong> Our study visa guides are among our most comprehensive. We cover student visa requirements for the USA (F-1 visa), UK (Student Visa), Canada (Study Permit), Australia (Student Visa subclass 500), Germany (Student Visa and Residence Permit), Netherlands (MVV and residence permit), France (Visa de long séjour), and several other European destinations. Each country guide covers eligibility criteria, required documents, financial proof requirements, English language requirements, application process step-by-step, biometric appointment, visa decision timelines, and post-study work rights.
            </p>
            <p>
              <strong>Work Visa Questions:</strong> Work visa requirements vary enormously between countries and even between visa categories within the same country. We cover the UK Skilled Worker Visa (including the points system, eligible occupations, and salary thresholds), Canada Express Entry and Provincial Nominee Programs, USA H-1B visa and alternatives, Australia Temporary Skill Shortage (TSS) visa, Germany EU Blue Card and Skilled Worker Visa, and UAE employment visa and Golden Visa. If you have a specific employer, occupation, or salary situation you need guidance on, our country-specific work visa guides are the right place to start.
            </p>
            <p>
              <strong>Tourist and Visitor Visa Questions:</strong> For short-stay travel, our tourist visa guides cover the Schengen Area process in detail, USA B-2 visitor visa, UK Standard Visitor Visa, Canada Visitor Visa (TRV) and eTA, Australia Visitor Visa (subclass 600), and UAE, Saudi Arabia, and Turkey tourist visas. We also have guides covering common reasons for tourist visa rejections and how to write a strong purpose-of-travel statement.
            </p>
            <p>
              <strong>Permanent Residency Questions:</strong> PR pathways are complex and our guides reflect this complexity. We cover Canada PR through Express Entry (Federal Skilled Worker, Canadian Experience Class, Federal Skilled Trades), Australia PR through the SkillSelect points system (Skilled Independent, Skilled Nominated, Employer Sponsored), UK Indefinite Leave to Remain (ILR) through various routes, Germany Niederlassungserlaubnis (settlement permit), and Netherlands permanent residence permit. Each guide includes points calculation guidance, required years of residency, language requirements, and citizenship eligibility after PR.
            </p>
            <p>
              <strong>Business Visa Questions:</strong> Our business visa guides cover short-term business travel visas for major destinations as well as investor visas, startup visas, and entrepreneur visa schemes. We cover the UK Innovator Founder Visa, Canada Start-up Visa, Germany Freelance Visa, Netherlands Highly Skilled Migrant programme, Portugal Golden Visa, and various investor visa programmes in the Gulf region.
            </p>
          </div>
        </section>

        {/* For immigration professionals */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Information for Immigration Professionals</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              We know that many immigration lawyers, consultants, education agents, and other professionals use our site as a reference resource for their clients. We welcome this and work to ensure our guides are accurate enough to be useful to professionals, not just to lay applicants.
            </p>
            <p>
              If you are an immigration professional and you have found an error in one of our guides that could mislead your clients, please do contact us — we particularly value corrections and updates from professionals who are processing current applications. Your ground-level knowledge of how consular officers are currently processing applications, what informal changes have occurred, and what practical documentation strategies are working is invaluable to us.
            </p>
            <p>
              We are open to a formal relationship with immigration professionals who want to contribute expert content to our site. This could take the form of co-authored guides, case study articles (anonymised to protect client privacy), or expert commentary sections within our existing country guides. We credit all contributors with their professional qualifications and provide a link to their professional profile or firm website. We do not charge for publishing contributions that meet our editorial standards.
            </p>
            <p>
              For professionals interested in advertising their services to our readership, we maintain a clear separation between editorial content and advertising. Display advertising appears in designated ad units that are visually distinct from editorial content. We do not integrate advertiser mentions into editorial guides. Our readers trust our content because they know it is not influenced by commercial relationships, and we intend to keep it that way.
            </p>
            <p>
              If you represent an official government body — an embassy, consulate, immigration ministry, or official tourism authority — and you have information to share with our readers about current requirements, application procedures, or policy updates, we welcome your contact. We are always happy to ensure our guides accurately reflect official information, and we will attribute official sources appropriately within our guides.
            </p>
          </div>
        </section>

        {/* For media and researchers */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">For Media and Researchers</h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <p>
              Global Visa Guide Hub has been cited as a reference in journalism about international migration, student mobility, skilled worker shortages, and visa policy changes. We are happy to provide background information, data on applicant information needs, and commentary from our editorial team for media enquiries, subject to our availability and editorial discretion.
            </p>
            <p>
              For journalists writing about international student numbers, visa processing delays, skilled worker visa policy changes, or immigration policy in any of our covered countries, our editors can provide on-background commentary based on our experience monitoring immigration policy and supporting applicants. We are particularly knowledgeable about the practical impact of policy changes on applicants — the gap between what policy says and what applicants actually experience in the application process.
            </p>
            <p>
              For academic researchers studying international migration, visa application behaviour, or immigration information ecosystems, we are willing to discuss our reader data and the types of questions applicants most commonly need answered. We maintain strict privacy policies and do not share individual user data, but aggregate insight into the most common information gaps facing visa applicants is something we can speak to from our experience.
            </p>
            <p>
              If you are a policy researcher or government adviser interested in understanding how applicants experience the visa information landscape, we would welcome the opportunity to contribute our perspective. We believe there is significant scope for immigration authorities to improve the accessibility and clarity of their official communications, and we have practical insight into where the most significant information gaps exist.
            </p>
          </div>
        </section>

        {/* Frequently asked contact questions */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Contacting Us</h2>
          <div className="space-y-6">
            {[
              {
                q: "Can you review my visa application documents?",
                a: "No. We are an information resource, not an immigration advisory service. We cannot review personal documents, assess your individual eligibility, or provide personalised advice about your application. For document review and personalised advice, please consult a licensed immigration lawyer or registered immigration consultant. In the UK, immigration advisers must be registered with the Office of the Immigration Services Commissioner (OISC). In Canada, use a Regulated Canadian Immigration Consultant (RCIC). In Australia, look for a Registered Migration Agent (RMA).",
              },
              {
                q: "I got a visa refusal. Can you help?",
                a: "We have guides covering common reasons for refusals in each of our covered countries and advice on how to address them in a reapplication. However, we cannot advise on your specific refusal or represent you in any appeal. Visa refusals — particularly those citing deception or previous refusals — can have serious long-term consequences, and we strongly recommend consulting a licensed immigration lawyer before submitting a reapplication or appeal.",
              },
              {
                q: "My information is out of date. When was this guide last updated?",
                a: "Every guide on our site carries a 'Last Updated' timestamp at the top or bottom of the page. If you believe information in a guide is out of date, please use our correction form to report it. We treat correction reports as a priority and typically verify and update within 24–48 hours. Please include the specific information you believe is incorrect and, if possible, a link to the official source that shows the current correct information.",
              },
              {
                q: "I want to contribute an article. How does this work?",
                a: "We welcome expert contributions from licensed immigration lawyers, registered consultants, and verified immigration professionals. Please contact us with your professional credentials, a summary of the topic you want to cover, and why you are qualified to write about it. We will review your proposal and respond within 5 business days. We do not charge for publishing quality contributions, and we do not accept payment for favourable coverage of any service or product.",
              },
              {
                q: "Do you offer personalised visa consultations?",
                a: "No. We are an information website, not a visa consultancy. We do not offer paid or free immigration consultations. Our guides are designed to be comprehensive enough that the majority of straightforward applications can be completed using the information we provide. For complex cases, we always recommend professional consultation.",
              },
              {
                q: "How can I stay updated when your guides change?",
                a: "We are developing a newsletter service that will notify subscribers of major policy changes affecting their chosen destination countries. Until this is available, we recommend bookmarking the specific guide pages you need and checking back periodically. Every guide shows its last updated date so you can quickly see if it has been reviewed recently.",
              },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-3">{item.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
