import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Disclaimer | VisaProcessInfo",
  description:
    "Full disclaimer for VisaProcessInfo. Our content is for general informational purposes only and does not constitute legal or immigration advice. Read before using this website.",
  alternates: { canonical: "https://www.visaprocessinfo.com/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white pt-24 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb variant="light" items={[{ label: "Disclaimer" }]} />
          <h1 className="text-4xl font-extrabold text-white mt-4 mb-3">Disclaimer</h1>
          <p className="text-blue-100 text-lg">Last updated: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-amber-900 font-semibold text-sm flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <span>Important: The content on VisaProcessInfo is provided for general informational purposes
              only. It does not constitute legal advice, immigration advice, or a professional-client relationship
              of any kind. Always verify all information with official government sources before taking any action.</span>
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">1. General Information Only</h2>
            <p className="text-gray-700 leading-relaxed">
              VisaProcessInfo (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates this
              website to provide free, general information about visa and immigration processes for various
              countries worldwide. All information is provided in good faith. However, we make no representations
              or warranties of any kind — express, implied, statutory, or otherwise — regarding the accuracy,
              completeness, reliability, suitability, or availability of the information, products, services, or
              related graphics contained on this website for any purpose. Any reliance you place on such
              information is strictly at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">2. Not Legal or Immigration Advice</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Nothing on this website constitutes legal advice, immigration advice, or professional advice of any
              kind. Reading or using this website does not create a solicitor-client, lawyer-client, or
              consultant-client relationship between you and VisaProcessInfo or any of its contributors.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Immigration law is complex and changes frequently. Individual circumstances vary significantly.
              The guides on this site present general information only and may not apply to your specific
              situation. We strongly recommend consulting a licensed immigration lawyer, a registered
              immigration adviser, or the relevant embassy/consulate directly for advice specific to your
              circumstances — especially for complex cases involving previous visa refusals, criminal records,
              medical inadmissibility, or permanent residency applications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">3. No Guarantee of Visa Approval</h2>
            <p className="text-gray-700 leading-relaxed">
              Following any guide, checklist, or advice on this website does not guarantee that your visa
              application will be approved. Visa and immigration decisions are made solely and exclusively by
              the relevant government authority — such as an embassy, high commission, consulate, or national
              immigration department — based on their assessment of your individual application and circumstances.
              VisaProcessInfo has no affiliation with, and no influence over, any government immigration
              authority, embassy, or consulate. We cannot intervene in, expedite, or influence any visa
              decision on your behalf.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">4. Currency and Accuracy of Information</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Immigration policies, visa fees, document requirements, processing times, and eligibility
              criteria change frequently, often without public notice. While our editorial team reviews and
              updates guides regularly, we cannot guarantee that all information on this website is current
              at the exact time you access it.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Always verify all visa requirements, fees, and procedures directly with the official embassy
              website, the destination country&apos;s official immigration authority, or the visa application
              centre before submitting any application. Outdated information on our website does not
              constitute grounds for any claim against us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">5. External Links</h2>
            <p className="text-gray-700 leading-relaxed">
              This website contains links to external websites, including official government immigration
              portals, embassy websites, and related resources. These links are provided solely for your
              convenience. We have no control over the content, availability, accuracy, or security of those
              external sites. The inclusion of any link does not imply endorsement, recommendation, or
              approval by VisaProcessInfo of the linked site or any information, products, or services
              it provides. We accept no responsibility or liability for any loss or damage arising from your
              use of, or reliance on, any external linked website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by applicable law, VisaProcessInfo and its owners,
              contributors, editors, and affiliates shall not be liable for any direct, indirect, incidental,
              special, consequential, or punitive damages arising out of or related to your use of this
              website or reliance on any information provided herein, including but not limited to visa
              application fees paid, travel bookings made, employment opportunities missed, or any other
              financial or personal losses resulting from a visa refusal or delay. This limitation applies
              regardless of whether such damages are based on warranty, contract, tort, or any other legal
              theory.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">7. No Affiliation with Government Bodies</h2>
            <p className="text-gray-700 leading-relaxed">
              VisaProcessInfo is an independent, privately operated information website. We are not
              affiliated with, endorsed by, or in any way connected to any government, embassy, consulate,
              high commission, or official immigration authority — including but not limited to USCIS
              (USA), UK Home Office (UK), IRCC (Canada), Department of Home Affairs (Australia), BAMF
              (Germany), ICA (UAE), or any other immigration body. Our guides are compiled from publicly
              available information on official government websites and are presented for informational
              purposes only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">8. Changes to This Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to update or modify this disclaimer at any time without prior notice.
              Changes will be effective immediately upon posting to this page. Your continued use of this
              website after any changes constitutes your acceptance of the revised disclaimer. We encourage
              you to review this page periodically.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">9. Specific Disclaimers by Content Type</h2>
            <div className="space-y-5 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Visa Fee Information</h3>
                <p className="leading-relaxed text-sm">
                  Visa fees are set by individual governments and are subject to change at any time. Fee
                  information on this website is collected from official government sources at the time of
                  writing and may not reflect subsequent changes. Always verify current fees on the official
                  embassy or immigration authority website before making any payment. We accept no liability
                  for losses arising from reliance on fee information that has become outdated since publication.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Processing Time Estimates</h3>
                <p className="leading-relaxed text-sm">
                  Processing times for visa applications vary significantly based on application volume,
                  time of year, individual application complexity, completeness of documents submitted,
                  and factors entirely outside our knowledge or control. Processing time estimates on this
                  website are based on information published by official immigration authorities and reported
                  by applicants at the time of writing. Actual processing times may be considerably longer
                  or shorter. We strongly advise against making irreversible travel bookings, employment
                  commitments, or accommodation arrangements until your visa has been formally approved.
                  We accept no liability for losses arising from reliance on processing time estimates.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Document Checklists</h3>
                <p className="leading-relaxed text-sm">
                  Our visa document checklists are compiled from official immigration authority guidance
                  and are intended to provide a general overview of commonly required documents. Additional
                  documents may be requested by an embassy or consulate at their discretion. Consular
                  officers have considerable discretion in what they may require from individual applicants
                  based on the specific circumstances of the application. Submitting all documents listed
                  in our checklists does not guarantee a complete application. Always consult the official
                  application guidance for the specific visa category and the specific embassy or consulate
                  where you will submit your application.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Points System Calculators and CRS Scores</h3>
                <p className="leading-relaxed text-sm">
                  For countries using points-based immigration systems (Canada Express Entry, Australia
                  SkillSelect, UK points system), our guides explain how points are generally calculated.
                  The specific points awarded to your application are determined by the official immigration
                  system based on the exact details of your profile. Points calculations are subject to
                  policy changes, and cut-off scores for invitations to apply vary with each draw. Our
                  guides should be used only to develop a general understanding of how these systems work,
                  not as a basis for calculating your specific score or predicting your chances of receiving
                  an invitation to apply.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Salary and Financial Threshold Information</h3>
                <p className="leading-relaxed text-sm">
                  Many visa categories require applicants to meet minimum salary or financial thresholds.
                  These thresholds are set by governments and are subject to periodic review and upward
                  revision. The figures quoted in our guides are accurate at the time of writing but may
                  have been updated by the time you read them. Always verify current salary thresholds and
                  financial requirements from official sources before relying on figures from our guides
                  for employment, job offer, or financial planning purposes.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">10. When to Consult a Professional</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our guides are designed to help individuals with straightforward immigration applications
              understand the process and prepare effectively. However, there are circumstances where
              professional immigration advice is not just recommended — it is essential. You should
              always consult a licensed immigration lawyer or regulated adviser in the following situations:
            </p>
            <div className="space-y-3 text-gray-700 text-sm">
              {[
                {
                  title: "Previous visa refusals",
                  desc: "If you have previously had a visa application refused for any country — especially a refusal for the same country you are applying to again — professional advice is strongly recommended. A previous refusal can affect future applications and needs to be addressed correctly in any new application.",
                },
                {
                  title: "Criminal record or police caution",
                  desc: "Many countries require disclosure of criminal convictions, cautions, or charges, including spent convictions. The rules on what must be disclosed and how it affects your eligibility are complex, jurisdiction-specific, and subject to strict legal interpretation. Incorrect disclosure (including failing to disclose something you were legally required to disclose) can result in refusal and potentially a ban from future applications.",
                },
                {
                  title: "Overstaying a previous visa",
                  desc: "If you have previously overstayed a visa in any country, this can have serious consequences for future applications — including bans from applying again. A lawyer can advise on whether an overstay needs to be disclosed, how to present it, and whether there are any grounds to mitigate its impact.",
                },
                {
                  title: "Permanent residency applications",
                  desc: "PR applications are typically the most complex and consequential immigration applications a person will make. The financial investment in the application, the long-term implications of approval or refusal, and the complexity of the eligibility criteria all make professional advice strongly advisable.",
                },
                {
                  title: "Deportation or removal proceedings",
                  desc: "If you have previously been deported, removed, or required to leave any country, this is a very serious matter that will almost certainly affect future visa applications. Professional legal advice is essential.",
                },
                {
                  title: "Medical grounds",
                  desc: "Some countries conduct medical screening for certain visa categories. If you have a condition that might be considered under medical inadmissibility criteria, specialist immigration advice is needed to understand the implications and how to address them in your application.",
                },
              ].map((item) => (
                <div key={item.title} className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="font-semibold text-amber-900 mb-1">{item.title}</p>
                  <p className="text-amber-800 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">11. How to Find a Licensed Immigration Professional</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you determine that you need professional immigration advice, it is important to use
              a licensed and regulated professional. Unregulated immigration advisers — sometimes called
              "visa agents" or "immigration consultants" without a formal licence — are not authorised
              to give immigration advice in most jurisdictions and may give incorrect, outdated, or
              misleading advice. Here is how to find a legitimate professional in each major jurisdiction:
            </p>
            <div className="space-y-4 text-gray-700 text-sm">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">United Kingdom</p>
                <p className="leading-relaxed">
                  In the UK, anyone providing immigration advice or services for payment must be authorised
                  by the Office of the Immigration Services Commissioner (OISC) or be a qualified solicitor,
                  barrister, or legal executive regulated by an approved regulatory body. You can check
                  whether an adviser is authorised on the OISC's register at oisc.gov.uk. Using an
                  unregistered adviser is illegal and any advice you receive may not be reliable.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">Canada</p>
                <p className="leading-relaxed">
                  In Canada, immigration consultants must be Regulated Canadian Immigration Consultants (RCICs)
                  registered with the College of Immigration and Citizenship Consultants (CICC). Lawyers
                  providing immigration advice must be members of a provincial law society. You can verify
                  an RCIC's licence at college-ic.ca. Be wary of "ghost consultants" — people who provide
                  immigration advice without being regulated — who are a significant problem in Canada's
                  immigration industry.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">Australia</p>
                <p className="leading-relaxed">
                  In Australia, migration agents must be registered with the Office of the Migration Agents
                  Registration Authority (OMARA). You can search for a registered migration agent at
                  mara.gov.au. Legal practitioners who are members of a law institute or bar association
                  may also provide migration advice.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">United States</p>
                <p className="leading-relaxed">
                  In the US, only licensed attorneys and accredited representatives of USCIS-recognised
                  non-profit organisations may provide immigration legal advice for compensation. Be
                  extremely cautious of "notarios" or document preparers who offer immigration services —
                  they are not authorised to provide legal advice and their involvement in your case can
                  cause serious harm. The American Immigration Lawyers Association (AILA) maintains a
                  directory of licensed US immigration attorneys.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-primary-800 mb-3">12. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              This disclaimer and your use of this website are governed by and construed in accordance
              with the laws of England and Wales. Any disputes arising from or in connection with this
              disclaimer or the website that cannot be resolved informally shall be subject to the
              exclusive jurisdiction of the courts of England and Wales.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nothing in this disclaimer affects your statutory rights as a consumer under applicable
              consumer protection legislation, where such rights cannot be excluded by contract.
              If any provision of this disclaimer is found to be unenforceable under applicable law,
              the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <div className="pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-sm">
            <Link href="/privacy" className="text-primary-700 hover:text-primary-900 underline">
              Privacy Policy
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
