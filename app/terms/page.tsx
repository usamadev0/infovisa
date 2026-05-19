import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Use | VisaProcessInfo",
  description:
    "Terms of Use for VisaProcessInfo. By using this website you agree to these terms governing access, content use, intellectual property, disclaimers, and limitation of liability.",
  alternates: { canonical: "https://www.visaprocessinfo.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white pt-24 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb variant="light" items={[{ label: "Terms of Use" }]} />
          <h1 className="text-4xl font-extrabold text-white mt-4 mb-3">Terms of Use</h1>
          <p className="text-blue-100 text-lg">Last updated: January 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using VisaProcessInfo (&ldquo;the Website&rdquo;), you agree to be bound by these Terms of Use. If you do not agree to these terms, please discontinue use of this website immediately. These terms apply to all visitors, users, and others who access or use the Website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">2. Nature of Content</h2>
            <p className="text-gray-700 leading-relaxed">
              VisaProcessInfo provides general visa and immigration information for educational and informational purposes only. The content on this Website is not legal advice, immigration advice, or a substitute for consultation with a qualified immigration attorney or licensed immigration consultant.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Immigration laws, visa requirements, processing times, and fees change frequently. While we strive to keep all information current and accurate, we make no warranty that any information on this Website is complete, accurate, or up to date. You are solely responsible for verifying all information with official government sources, embassy websites, and immigration authorities before taking any action.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">3. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on this Website, including but not limited to text, graphics, logos, guides, databases, and compilations, is the property of VisaProcessInfo and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, publicly display, or commercially exploit any content from this Website without our express written permission.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Personal, non-commercial use of our guides is permitted provided you retain all copyright and proprietary notices. Quoting short excerpts with attribution for educational or journalistic purposes is permitted.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">4. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed">When using this Website, you agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Use the Website for any unlawful purpose or in violation of these Terms</li>
              <li>Attempt to gain unauthorised access to any part of the Website or its related systems</li>
              <li>Use automated tools, scrapers, or bots to extract data from the Website at scale</li>
              <li>Transmit any harmful, offensive, or disruptive content via any contact or feedback mechanism</li>
              <li>Misrepresent your identity or affiliation when contacting us</li>
              <li>Interfere with the proper functioning of the Website</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">5. Third-Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Our Website contains links to third-party websites, including official government immigration portals, embassy websites, and external resources. These links are provided for your convenience and informational purposes only. We do not endorse or control any third-party websites and are not responsible for their content, privacy practices, or accuracy. Accessing third-party websites is at your own risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">6. Advertising</h2>
            <p className="text-gray-700 leading-relaxed">
              VisaProcessInfo may display third-party advertisements, including those served by Google AdSense and other advertising networks. These advertisements help support the free operation of this website. We do not endorse the products or services advertised. Third-party advertising partners may use cookies and similar technologies to serve relevant ads. Please refer to our <Link href="/privacy" className="text-primary-700 hover:underline">Privacy Policy</Link> for more information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">7. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">
              The Website and all its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other harmful components.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">8. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, VisaProcessInfo, its owners, editors, contributors, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of — or inability to use — this Website or its content.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This includes, without limitation, any reliance on information provided on this Website for visa or immigration decisions, any visa refusals or delays, or any losses resulting from inaccurate or outdated information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">9. Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Your use of this Website is also governed by our <Link href="/privacy" className="text-primary-700 hover:underline">Privacy Policy</Link>, which is incorporated into these Terms by reference. Please review the Privacy Policy to understand our practices.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">10. Modifications to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these Terms of Use at any time. Changes will be posted on this page with an updated &ldquo;Last updated&rdquo; date. Continued use of the Website after any changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Use shall be governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be resolved through good-faith negotiation wherever possible.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-primary-800">12. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms of Use, please contact us via our{" "}
              <Link href="/contact" className="text-primary-700 hover:underline">Contact page</Link>.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
