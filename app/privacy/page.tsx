import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy | Global Visa Guide Hub",
  description:
    "Privacy Policy for Global Visa Guide Hub. Learn how we collect, use, and protect your personal data in accordance with GDPR and applicable privacy law.",
  alternates: { canonical: "https://globalvisaguidehub.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />
          <h1 className="text-4xl font-extrabold mt-4 mb-3">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">Last updated: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">

          <p className="text-gray-700 leading-relaxed">
            Global Visa Guide Hub (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is
            committed to protecting your privacy. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our website. Please read
            this policy carefully. If you disagree with its terms, please discontinue use of the site.
          </p>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">1. Information We Collect</h2>
            <h3 className="font-semibold text-gray-800 mb-2">Automatically Collected Information</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              When you visit our website, we automatically collect certain information about your device
              and your visit, including your IP address (anonymised), browser type and version, operating
              system, referring URLs, pages visited, time and date of your visit, and time spent on pages.
              This information is collected through industry-standard analytics tools (such as Google
              Analytics) and does not personally identify you.
            </p>
            <h3 className="font-semibold text-gray-800 mb-2">Information You Provide</h3>
            <p className="text-gray-700 leading-relaxed">
              If you contact us via our contact form, we collect the information you voluntarily submit,
              including your name, email address, and message content. We use this information solely
              to respond to your enquiry.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="space-y-2 text-gray-700 text-sm">
              {[
                "Operate, maintain, and improve our website and content",
                "Analyse usage patterns to understand how visitors interact with our guides",
                "Respond to your enquiries and support requests",
                "Monitor and analyse trends, usage, and activities for editorial improvement",
                "Detect and prevent fraudulent or abusive activity",
                "Comply with legal obligations and enforce our Terms of Use",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-accent-500 shrink-0 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">3. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to enhance your browsing experience and
              to understand how visitors use our site. Cookies are small text files stored on your
              device by your browser. We use the following types of cookies:
            </p>
            <div className="space-y-3">
              {[
                { name: "Essential Cookies", desc: "Required for the website to function properly. These cannot be disabled." },
                { name: "Analytics Cookies", desc: "Help us understand how visitors interact with our website using tools such as Google Analytics (with IP anonymisation enabled)." },
                { name: "Advertising Cookies", desc: "Set by Google AdSense to display relevant advertisements. These may track your browsing across other websites." },
              ].map((c) => (
                <div key={c.name} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                  <p className="text-gray-600 text-sm mt-1">{c.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-700 text-sm mt-3">
              You can control cookies through your browser settings. Disabling certain cookies may
              affect the functionality of the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">4. Google AdSense and Advertising</h2>
            <p className="text-gray-700 leading-relaxed">
              We display advertisements through Google AdSense. Google, as a third-party vendor,
              uses cookies (including the DoubleClick cookie) to serve ads on our site based on your
              prior visits to our website and other sites on the internet. You may opt out of
              personalised advertising by visiting Google&apos;s{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 underline"
              >
                Ad Settings
              </a>{" "}
              page. Alternatively, you can opt out of third-party vendor cookies by visiting the{" "}
              <a
                href="https://www.networkadvertising.org/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-700 underline"
              >
                Network Advertising Initiative opt-out page
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website contains links to third-party websites, including official government
              immigration portals, embassy websites, and external resources. We are not responsible
              for the privacy practices of those external sites. We encourage you to review the
              privacy policies of any website you visit via a link from our pages.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention and Security</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We retain analytics data in anonymised, aggregated form. Contact form submissions are
              retained only for as long as necessary to respond to your enquiry, after which they
              are deleted. We implement appropriate technical and organisational security measures
              to protect your information against unauthorised access, alteration, disclosure, or
              destruction.
            </p>
            <p className="text-gray-700 leading-relaxed">
              However, no method of transmission over the internet or electronic storage is 100%
              secure. While we strive to protect your information, we cannot guarantee its absolute
              security. In the event of a data breach that affects your rights and freedoms, we will
              notify affected parties as required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights (GDPR / UK GDPR)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are located in the European Economic Area (EEA) or the United Kingdom, you have
              certain rights under the General Data Protection Regulation (GDPR) or UK GDPR, including:
            </p>
            <ul className="space-y-2 text-gray-700 text-sm">
              {[
                "The right to access personal data we hold about you",
                "The right to rectification of inaccurate personal data",
                "The right to erasure ('right to be forgotten')",
                "The right to restriction of processing",
                "The right to data portability",
                "The right to object to processing",
                "The right to withdraw consent at any time",
              ].map((right) => (
                <li key={right} className="flex items-start gap-2">
                  <span className="text-primary-500 shrink-0 mt-0.5">→</span>
                  {right}
                </li>
              ))}
            </ul>
            <p className="text-gray-700 text-sm mt-3">
              To exercise any of these rights, please contact us using the form on our{" "}
              <Link href="/contact" className="text-primary-700 underline">Contact page</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">8. Children&apos;s Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website is not directed at children under the age of 13. We do not knowingly
              collect personal information from children. If you believe we have inadvertently
              collected information from a child, please contact us immediately so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in law, our
              practices, or for other operational reasons. Changes will be posted on this page with
              an updated &ldquo;Last updated&rdquo; date. We encourage you to review this page periodically.
              Your continued use of the website after changes are posted constitutes your acceptance
              of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions, concerns, or requests regarding this Privacy Policy or your
              personal data, please contact us at:{" "}
              <Link href="/contact" className="text-primary-700 underline">Contact page</Link> or
              via email at privacy@globalvisaguidehub.com.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">11. Legal Basis for Processing (GDPR)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              For users in the European Economic Area and the United Kingdom, we process your personal data
              on the following legal bases as defined under the General Data Protection Regulation (GDPR)
              and the UK GDPR:
            </p>
            <div className="space-y-4 text-gray-700 text-sm">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Legitimate Interests (Article 6(1)(f) GDPR)</p>
                <p className="leading-relaxed">
                  We process anonymised analytics data to understand how our website is used and to improve
                  the quality and relevance of our content. This processing serves our legitimate interest in
                  providing a high-quality immigration information resource. We have assessed this legitimate
                  interest against your privacy rights and concluded that, given the anonymised and aggregated
                  nature of the data, our interests do not override your fundamental rights and freedoms.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Contract Performance (Article 6(1)(b) GDPR)</p>
                <p className="leading-relaxed">
                  When you contact us via our contact form, we process your name and email address to respond
                  to your enquiry. This processing is necessary to fulfil your request for a response from us.
                  Without processing this information, we would be unable to reply to your message.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Consent (Article 6(1)(a) GDPR)</p>
                <p className="leading-relaxed">
                  Where we use advertising cookies or marketing-related tracking technologies, we rely on your
                  consent as the legal basis for processing. You can withdraw your consent at any time by
                  adjusting your cookie preferences through our cookie consent mechanism or through your
                  browser settings. Withdrawal of consent does not affect the lawfulness of processing
                  carried out prior to withdrawal.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="font-semibold text-gray-900 mb-1">Legal Obligation (Article 6(1)(c) GDPR)</p>
                <p className="leading-relaxed">
                  In certain limited circumstances, we may be required to process personal data to comply
                  with a legal obligation — for example, to respond to a lawful request from a government
                  authority or court. We will only do so where we are legally required and will inform you
                  to the extent permitted by law.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">12. International Data Transfers</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We use certain third-party service providers (including Google Analytics and Google AdSense)
              whose servers are located in the United States. When personal data is transferred from the
              European Economic Area or the United Kingdom to the United States, we rely on appropriate
              safeguards to ensure that your data receives a level of protection equivalent to that in
              the EEA and UK.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Google participates in the EU-US Data Privacy Framework and provides appropriate safeguards
              for transatlantic data transfers. You can find more information about Google's data transfer
              mechanisms in their Privacy Policy. For other third-party providers, we ensure that
              appropriate Standard Contractual Clauses (SCCs) are in place where required.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our website is hosted on infrastructure that may involve data processing in multiple
              jurisdictions. We ensure that any hosting arrangements we use comply with applicable
              data protection law and include appropriate contractual protections.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">13. Data Minimisation and Purpose Limitation</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We apply data minimisation principles throughout our operations. This means we only collect
              personal data that is necessary for the specific purpose for which it is collected. We do not
              collect data speculatively or "just in case" it might be useful. We do not use data collected
              for one purpose for a different, incompatible purpose without your knowledge.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              Analytics data is anonymised at the point of collection to the extent technically possible.
              IP addresses are truncated before being stored. We do not create individual user profiles
              based on browsing behaviour. We use aggregate and statistical analysis of anonymised data
              to understand content performance and user needs.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Contact form data is used only to respond to the specific enquiry submitted and is not
              retained beyond the period necessary to fulfil that purpose. We do not add contact form
              submitters to any mailing list without explicit opt-in. We do not share contact form data
              with any third party except as required by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">14. Your Rights in Practice — How to Exercise Them</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are committed to making it straightforward for you to exercise your privacy rights. Here
              is practical guidance on how to exercise each right:
            </p>
            <div className="space-y-4 text-gray-700 text-sm">
              <div>
                <p className="font-semibold text-gray-900 mb-1">Right of Access</p>
                <p className="leading-relaxed">
                  You can request a copy of any personal data we hold about you. Given that we collect
                  very limited personal data (only contact form submissions, which are linked to your
                  email address), an access request typically results in us confirming whether we hold
                  any correspondence from you and providing a copy. Please submit access requests via
                  our Contact page with the subject line "Data Subject Access Request."
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Right to Erasure</p>
                <p className="leading-relaxed">
                  You can request that we delete personal data we hold about you. For contact form
                  submissions, this means requesting deletion of any correspondence we hold that can
                  be linked to your email address. Note that we retain analytics data in anonymised
                  form only — this data cannot be linked to you individually and therefore cannot be
                  subject to erasure requests.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Right to Object to Processing</p>
                <p className="leading-relaxed">
                  If you wish to object to our processing of your data on the basis of legitimate interests,
                  you can do so by contacting us. You can also object to the use of advertising cookies by
                  adjusting your browser settings or using Google's Ad Settings to opt out of personalised
                  advertising.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Right to Lodge a Complaint</p>
                <p className="leading-relaxed">
                  If you believe we have processed your personal data in a manner that violates GDPR or
                  UK GDPR, you have the right to lodge a complaint with your national supervisory authority.
                  In the UK, this is the Information Commissioner's Office (ICO) at ico.org.uk. In the EU,
                  it is the supervisory authority in your member state of residence or place of work.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">15. California Privacy Rights (CCPA)</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you are a California resident, the California Consumer Privacy Act (CCPA) provides you
              with specific rights regarding your personal information. This section describes your
              CCPA rights and explains how to exercise them.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Right to Know:</strong> You have the right to request that we disclose information
              about the categories and specific pieces of personal information we have collected about you,
              the categories of sources from which it was collected, the purpose for collecting it, and
              the categories of third parties with whom we share it.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Right to Delete:</strong> You have the right to request that we delete personal
              information we have collected from you, subject to certain exceptions where retention is
              required by law or necessary for our legitimate operations.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Right to Opt-Out of Sale:</strong> We do not sell your personal information to
              third parties. We do not share personal information with third parties for cross-context
              behavioural advertising in a manner that would constitute a "sale" under the CCPA.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Non-Discrimination:</strong> We will not discriminate against you for exercising
              any of your CCPA rights. We do not offer different levels of service based on whether
              you exercise privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">16. Security Measures in Detail</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We take the security of your information seriously and implement a range of technical and
              organisational security measures appropriate to the nature and volume of data we process.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Encryption:</strong> All data transmitted between your browser and our website is
              encrypted using Transport Layer Security (TLS). We maintain an A-grade TLS configuration
              and use HTTPS exclusively — all HTTP traffic is automatically redirected to HTTPS.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Access Controls:</strong> Access to our content management systems and any data
              we hold is restricted to authorised team members only. We use strong, unique passwords
              and multi-factor authentication for all administrative access. We conduct periodic access
              reviews to ensure that access rights remain appropriate.
            </p>
            <p className="text-gray-700 leading-relaxed mb-3">
              <strong>Third-Party Processor Security:</strong> We select third-party service providers
              (hosting, analytics, email) that demonstrate appropriate security practices. We review
              the security certifications and privacy practices of our third-party processors before
              engaging them and monitor for any security incidents they may experience.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Incident Response:</strong> We maintain an incident response procedure for data
              security events. In the event of a data breach that is likely to result in a risk to your
              rights and freedoms, we will notify the relevant supervisory authority within 72 hours of
              becoming aware of the breach, as required by GDPR Article 33. Where the breach is likely
              to result in a high risk to your rights and freedoms, we will also notify affected individuals
              directly without undue delay.
            </p>
          </section>

          <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
            <Link href="/disclaimer" className="text-primary-700 hover:text-primary-900 underline">
              Disclaimer
            </Link>
            <Link href="/contact" className="text-primary-700 hover:text-primary-900 underline">
              Contact Us
            </Link>
            <Link href="/about" className="text-primary-700 hover:text-primary-900 underline">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
