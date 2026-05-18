"use client";

import { useState } from "react";
import { COUNTRIES_EXTENDED } from "@/data/countries-extended";

interface CostBreakdown {
  governmentFee: number;
  biometricFee: number;
  medicalFee: number;
  translationFee: number;
  courierFee: number;
  visaFacilitationFee: number;
  consultantFee: number;
  travelInsurance: number;
  total: number;
  currency: string;
  countryName: string;
  visaType: string;
}

type VisaType = "study" | "work" | "business" | "visit" | "immigration";

export default function VisaCostCalculator() {
  const [country, setCountry] = useState("");
  const [visaType, setVisaType] = useState<VisaType | "">("");
  const [includeConsultant, setIncludeConsultant] = useState(false);
  const [result, setResult] = useState<CostBreakdown | null>(null);

  const calculate = () => {
    if (!country || !visaType) {
      alert("Please select a country and visa type.");
      return;
    }
    const c = COUNTRIES_EXTENDED.find((x) => x.slug === country);
    if (!c) return;

    const govFee = c.visaFees[visaType as VisaType];
    const biometric = Math.round(govFee * 0.15);
    const medical = Math.round(govFee * 0.45);
    const translation = Math.round(govFee * 0.25);
    const courier = Math.round(govFee * 0.1);
    const facilitation = Math.round(govFee * 0.2);
    const consultant = includeConsultant ? Math.round(govFee * 3) : 0;
    const insurance = Math.round(govFee * 0.3);

    setResult({
      governmentFee: govFee,
      biometricFee: biometric,
      medicalFee: medical,
      translationFee: translation,
      courierFee: courier,
      visaFacilitationFee: facilitation,
      consultantFee: consultant,
      travelInsurance: insurance,
      total: govFee + biometric + medical + translation + courier + facilitation + consultant + insurance,
      currency: c.currency,
      countryName: c.name,
      visaType: visaType,
    });
  };

  const selectClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination Country *</label>
          <select value={country} onChange={(e) => { setCountry(e.target.value); setResult(null); }} className={selectClass}>
            <option value="">Select country</option>
            {COUNTRIES_EXTENDED.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Visa Type *</label>
          <select value={visaType} onChange={(e) => { setVisaType(e.target.value as VisaType); setResult(null); }} className={selectClass}>
            <option value="">Select visa type</option>
            <option value="study">Study Visa</option>
            <option value="work">Work Visa</option>
            <option value="business">Business Visa</option>
            <option value="visit">Visit / Tourist Visa</option>
            <option value="immigration">Immigration / PR</option>
          </select>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={includeConsultant} onChange={(e) => { setIncludeConsultant(e.target.checked); setResult(null); }}
            className="w-4 h-4 rounded border-gray-300 text-primary-600" />
          <span className="text-sm text-gray-700 font-medium">Include immigration consultant fee (recommended)</span>
        </label>
      </div>

      <button onClick={calculate} className="w-full bg-accent-500 text-white font-bold py-4 rounded-2xl text-lg hover:bg-accent-600 transition-colors">
        Calculate Total Cost
      </button>

      {result && (
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-primary-800 to-primary-700 text-white p-5">
            <div className="text-sm text-white/70 mb-1">{result.countryName} — {result.visaType.charAt(0).toUpperCase() + result.visaType.slice(1)} Visa</div>
            <div className="text-3xl font-extrabold">{result.currency} {result.total.toLocaleString()}</div>
            <div className="text-white/70 text-sm mt-1">Estimated total cost</div>
          </div>
          <div className="p-5">
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {[
                  { label: "Government Application Fee", amount: result.governmentFee, note: "Non-refundable" },
                  { label: "Biometric Enrollment Fee", amount: result.biometricFee, note: "Fingerprints & photo" },
                  { label: "Medical Examination", amount: result.medicalFee, note: "Approved clinic" },
                  { label: "Document Translation", amount: result.translationFee, note: "Certified translations" },
                  { label: "Courier / Postal Service", amount: result.courierFee, note: "Document delivery" },
                  { label: "Visa Facilitation Service", amount: result.visaFacilitationFee, note: "VFS / TLS Global" },
                  { label: "Travel Insurance", amount: result.travelInsurance, note: "Required coverage" },
                  ...(result.consultantFee > 0 ? [{ label: "Immigration Consultant", amount: result.consultantFee, note: "Professional guidance" }] : []),
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-gray-50">
                    <td className="py-2.5 text-gray-700">{row.label}</td>
                    <td className="py-2.5 text-xs text-gray-400 hidden sm:table-cell">{row.note}</td>
                    <td className="py-2.5 text-right font-semibold text-gray-900">{result.currency} {row.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200">
                  <td className="pt-3 font-bold text-gray-900">Total Estimated Cost</td>
                  <td className="hidden sm:table-cell"></td>
                  <td className="pt-3 text-right font-extrabold text-primary-800 text-base">{result.currency} {result.total.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
            <p className="text-xs text-gray-500 mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
              These are estimated costs based on current government fees and typical service charges. Actual costs may vary. Always verify current fees at the official embassy or immigration website.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
