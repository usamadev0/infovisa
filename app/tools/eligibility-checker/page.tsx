import type { Metadata } from "next";
import EligibilityChecker from "@/components/EligibilityChecker";

export const metadata: Metadata = {
  title: "Free Visa Eligibility Checker — Check Your Visa Chances | VisaProcessInfo",
  description: "Check your visa eligibility instantly. Our free visa eligibility checker analyzes your age, education, income, bank balance, English level, and travel history to estimate your chances of visa approval.",
  alternates: { canonical: "https://www.visaprocessinfo.com/tools/eligibility-checker" },
};

export default function EligibilityCheckerPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white pt-24 pb-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm font-semibold mb-5">
            <span>Free Tool</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Visa Eligibility Checker
          </h1>
          <p className="text-white/80 text-lg leading-relaxed max-w-2xl mx-auto">
            Answer a few questions about your profile and get an instant estimate of your visa approval chances. Free, accurate, and takes less than 2 minutes.
          </p>
        </div>
      </div>

      {/* Tool */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Enter Your Details</h2>
          <EligibilityChecker />
        </div>

        {/* Info Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            { title: "How It Works", body: "Our tool analyzes 12 key factors that immigration authorities consider when reviewing visa applications, including financial capacity, educational background, language proficiency, and travel history." },
            { title: "Scoring System", body: "Scores are calculated on a 100-point scale. High (75-100) means excellent chances. Medium (50-74) means reasonable chances with some improvements needed. Low (0-49) means significant issues need addressing." },
            { title: "Important Note", body: "This tool provides educational guidance only. Actual visa decisions are made by trained immigration officers and depend on many factors not captured in this assessment." },
          ].map((item) => (
            <div key={item.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
