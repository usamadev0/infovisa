import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for Global Visa Guide Hub — information provided is for general guidance only.",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: "Disclaimer" }]} />
      <h1 className="text-3xl font-bold text-primary-800 mb-6">Disclaimer</h1>
      <div className="prose-article space-y-6 text-gray-700">
        <p>Last updated: January 2026</p>
        <h2>General Information Only</h2>
        <p>
          The information provided on Global Visa Guide Hub is for general informational purposes only. All content is provided in good faith, but we make no representation or warranty of any kind, express or implied, regarding accuracy, adequacy, validity, reliability, or completeness of any information on this site.
        </p>
        <h2>Not Legal Advice</h2>
        <p>
          Nothing on this website constitutes legal advice, immigration advice, or a lawyer-client relationship. Visa and immigration laws change frequently. Always consult an authorized immigration consultant or attorney and verify requirements directly with the relevant embassy, consulate, or government immigration authority before making any decisions.
        </p>
        <h2>No Guarantee of Visa Approval</h2>
        <p>
          Following the guides on this website does not guarantee visa approval. Visa decisions are made solely by government authorities based on individual circumstances. We are not affiliated with any government immigration department.
        </p>
        <h2>External Links</h2>
        <p>
          This site may contain links to external websites. These links are provided for convenience. We have no control over the content of those sites and accept no responsibility for them or for any loss or damage that may arise from your use of them.
        </p>
        <h2>Accuracy of Information</h2>
        <p>
          While we strive to keep all guides up to date, immigration policies change frequently. We recommend always cross-checking information with official government sources such as embassy websites and national immigration portals.
        </p>
      </div>
    </div>
  );
}
