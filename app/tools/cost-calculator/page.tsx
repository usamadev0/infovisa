import type { Metadata } from "next";
import VisaCostCalculator from "@/components/VisaCostCalculator";

export const metadata: Metadata = {
  title: "Visa Cost Calculator — Estimate Your Total Visa Fees | VisaProcessInfo",
  description: "Calculate the total cost of your visa application including government fees, biometric fees, medical examination, translation costs, and consultant fees. Free and accurate estimates for 50+ countries.",
  alternates: { canonical: "https://www.visaprocessinfo.com/tools/cost-calculator" },
};

export default function CostCalculatorPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-accent-700 to-accent-500 text-white pt-24 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <span>Free Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Visa Cost Calculator
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Get a complete breakdown of all costs involved in your visa application. No hidden fees — see everything upfront before you apply.
          </p>
        </div>
      </div>

      {/* Tool */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Select Country and Visa Type</h2>
          <VisaCostCalculator />
        </div>

        {/* What is included */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">What is Included in the Cost Estimate?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { title: "Government Application Fee", desc: "The official fee charged by the destination country's immigration authority. Non-refundable." },
              { title: "Biometric Enrollment Fee", desc: "Fee charged for capturing fingerprints and photographs at visa application centers." },
              { title: "Medical Examination", desc: "Health assessment at an approved medical center, including blood tests and chest X-ray." },
              { title: "Document Translation", desc: "Certified translation of foreign-language documents into English or required language." },
              { title: "Visa Facilitation Service", desc: "Fees charged by VFS Global, TLS Contact, or other authorized visa application centers." },
              { title: "Immigration Consultant", desc: "Optional professional fee for licensed immigration advisors who review and submit applications." },
              { title: "Travel Insurance", desc: "Mandatory health and emergency coverage required by most visa categories." },
              { title: "Courier/Postal Service", desc: "Secure delivery of documents to and from the embassy or application center." },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">&#x2713;</span>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
