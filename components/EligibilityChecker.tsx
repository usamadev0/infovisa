"use client";

import { useState } from "react";
import { COUNTRIES_EXTENDED } from "@/data/countries-extended";

interface FormData {
  age: string;
  education: string;
  cgpa: string;
  monthlyIncome: string;
  bankBalance: string;
  country: string;
  visaType: string;
  jobStatus: string;
  workExperience: string;
  englishLevel: string;
  travelHistory: string;
  previousRefusals: string;
}

interface Result {
  score: number;
  level: "Low" | "Medium" | "High";
  color: string;
  bgColor: string;
  recommendation: string;
  riskLevel: string;
  improvements: string[];
  recommendedVisa: string;
}

function calculateScore(form: FormData): Result {
  let score = 0;

  // Age score (max 20)
  const age = parseInt(form.age) || 0;
  if (age >= 18 && age <= 30) score += 20;
  else if (age > 30 && age <= 40) score += 15;
  else if (age > 40 && age <= 50) score += 10;
  else if (age > 50) score += 5;

  // Education score (max 25)
  const eduScores: Record<string, number> = { phd: 25, masters: 22, bachelors: 18, diploma: 12, high_school: 8, none: 3 };
  score += eduScores[form.education] || 0;

  // Income score (max 20)
  const income = parseInt(form.monthlyIncome) || 0;
  if (income >= 5000) score += 20;
  else if (income >= 3000) score += 16;
  else if (income >= 1500) score += 12;
  else if (income >= 500) score += 7;
  else score += 3;

  // Bank balance score (max 15)
  const balance = parseInt(form.bankBalance) || 0;
  if (balance >= 20000) score += 15;
  else if (balance >= 10000) score += 12;
  else if (balance >= 5000) score += 8;
  else if (balance >= 2000) score += 5;
  else score += 2;

  // English level score (max 20)
  const engScores: Record<string, number> = { native: 20, ielts_8: 18, ielts_7: 16, ielts_6: 12, ielts_5: 8, basic: 4, none: 0 };
  score += engScores[form.englishLevel] || 0;

  // Travel history score (max 15)
  const travelScores: Record<string, number> = { many_developed: 15, some_developed: 12, developing: 8, first_time: 4 };
  score += travelScores[form.travelHistory] || 4;

  // Job status (max 10)
  const jobScores: Record<string, number> = { employed_senior: 10, employed: 8, self_employed: 7, student: 5, unemployed: 2 };
  score += jobScores[form.jobStatus] || 5;

  // Work experience bonus (max 5)
  const exp = parseInt(form.workExperience) || 0;
  if (exp >= 5) score += 5;
  else if (exp >= 3) score += 3;
  else if (exp >= 1) score += 2;

  // Refusals penalty
  const refusals = parseInt(form.previousRefusals) || 0;
  if (refusals === 1) score = Math.max(0, score - 10);
  else if (refusals === 2) score = Math.max(0, score - 20);
  else if (refusals >= 3) score = Math.max(0, score - 35);

  // Cap at 100
  score = Math.min(100, Math.round(score * 0.87)); // normalize

  let level: "Low" | "Medium" | "High";
  let color: string;
  let bgColor: string;
  let riskLevel: string;
  let recommendation: string;
  const improvements: string[] = [];

  if (score >= 75) {
    level = "High";
    color = "text-emerald-700";
    bgColor = "bg-emerald-50 border-emerald-200";
    riskLevel = "Low Risk";
    recommendation = "Your profile is strong. Proceed with your application with confidence. Ensure your documentation is complete and accurate.";
  } else if (score >= 50) {
    level = "Medium";
    color = "text-amber-700";
    bgColor = "bg-amber-50 border-amber-200";
    riskLevel = "Moderate Risk";
    recommendation = "Your profile has a reasonable chance of approval but requires strengthening in key areas before application.";
    if (parseInt(form.bankBalance) < 10000) improvements.push("Increase bank balance to at least USD 10,000 before applying");
    if (parseInt(form.monthlyIncome) < 3000) improvements.push("Demonstrate stronger income through employment or business");
    if (!["ielts_7", "ielts_8", "native"].includes(form.englishLevel)) improvements.push("Improve English proficiency to IELTS 6.5+ level");
    if (form.travelHistory === "first_time") improvements.push("Build travel history by visiting neighboring countries first");
  } else {
    level = "Low";
    color = "text-red-700";
    bgColor = "bg-red-50 border-red-200";
    riskLevel = "High Risk";
    recommendation = "Your profile currently has significant gaps. We recommend addressing the issues below before applying to avoid refusal.";
    if (parseInt(form.bankBalance) < 5000) improvements.push("Critical: Increase bank balance significantly — minimum USD 5,000-10,000 required");
    if (parseInt(form.monthlyIncome) < 1500) improvements.push("Critical: Improve income documentation — salary slips, tax returns, business income");
    if (form.education === "none" || form.education === "high_school") improvements.push("Consider upgrading educational qualifications");
    if (form.previousRefusals !== "0") improvements.push("Address previous refusal reasons in a detailed cover letter");
    if (!form.englishLevel || form.englishLevel === "none") improvements.push("Take an approved English language test (IELTS, TOEFL, PTE)");
    improvements.push("Consult a licensed immigration consultant before applying");
  }

  // Recommended visa
  let recommendedVisa = "Visit/Tourist Visa";
  if (form.visaType === "study" || (parseInt(form.age) < 30 && form.education !== "none")) recommendedVisa = "Student Visa";
  else if (form.visaType === "work" || form.jobStatus === "employed_senior") recommendedVisa = "Skilled Worker Visa";
  else if (form.visaType === "business" || form.jobStatus === "self_employed") recommendedVisa = "Business Visa";
  else if (form.visaType === "immigration" && score >= 70) recommendedVisa = "Permanent Residency / Immigration";

  return { score, level, color, bgColor, recommendation, riskLevel, improvements, recommendedVisa };
}

export default function EligibilityChecker() {
  const [form, setForm] = useState<FormData>({
    age: "", education: "", cgpa: "", monthlyIncome: "", bankBalance: "",
    country: "", visaType: "", jobStatus: "", workExperience: "",
    englishLevel: "", travelHistory: "", previousRefusals: "0",
  });
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setResult(null);
  };

  const handleCheck = () => {
    if (!form.age || !form.education || !form.bankBalance || !form.country || !form.visaType) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setResult(calculateScore(form));
      setLoading(false);
    }, 800);
  };

  const fieldClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Age */}
        <div>
          <label className={labelClass}>Age *</label>
          <input type="number" placeholder="e.g. 25" value={form.age} onChange={(e) => update("age", e.target.value)} className={fieldClass} min="18" max="80" />
        </div>

        {/* Education */}
        <div>
          <label className={labelClass}>Highest Education Level *</label>
          <select value={form.education} onChange={(e) => update("education", e.target.value)} className={fieldClass}>
            <option value="">Select education level</option>
            <option value="phd">PhD / Doctorate</option>
            <option value="masters">Master&apos;s Degree</option>
            <option value="bachelors">Bachelor&apos;s Degree</option>
            <option value="diploma">Diploma / Associate</option>
            <option value="high_school">High School / Matric</option>
            <option value="none">No Formal Education</option>
          </select>
        </div>

        {/* CGPA */}
        <div>
          <label className={labelClass}>CGPA / Academic Score (out of 4.0)</label>
          <input type="number" placeholder="e.g. 3.2" value={form.cgpa} onChange={(e) => update("cgpa", e.target.value)} className={fieldClass} min="0" max="4" step="0.1" />
        </div>

        {/* Monthly Income */}
        <div>
          <label className={labelClass}>Monthly Income (USD equivalent)</label>
          <input type="number" placeholder="e.g. 2000" value={form.monthlyIncome} onChange={(e) => update("monthlyIncome", e.target.value)} className={fieldClass} min="0" />
        </div>

        {/* Bank Balance */}
        <div>
          <label className={labelClass}>Bank Balance (USD equivalent) *</label>
          <input type="number" placeholder="e.g. 15000" value={form.bankBalance} onChange={(e) => update("bankBalance", e.target.value)} className={fieldClass} min="0" />
        </div>

        {/* Country */}
        <div>
          <label className={labelClass}>Destination Country *</label>
          <select value={form.country} onChange={(e) => update("country", e.target.value)} className={fieldClass}>
            <option value="">Select country</option>
            {COUNTRIES_EXTENDED.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Visa Type */}
        <div>
          <label className={labelClass}>Visa Type *</label>
          <select value={form.visaType} onChange={(e) => update("visaType", e.target.value)} className={fieldClass}>
            <option value="">Select visa type</option>
            <option value="study">Study Visa</option>
            <option value="work">Work Visa</option>
            <option value="business">Business Visa</option>
            <option value="visit">Visit / Tourist Visa</option>
            <option value="immigration">Immigration / PR</option>
          </select>
        </div>

        {/* Job Status */}
        <div>
          <label className={labelClass}>Current Employment Status</label>
          <select value={form.jobStatus} onChange={(e) => update("jobStatus", e.target.value)} className={fieldClass}>
            <option value="">Select status</option>
            <option value="employed_senior">Employed (Senior/Manager)</option>
            <option value="employed">Employed (Regular)</option>
            <option value="self_employed">Self-Employed / Business Owner</option>
            <option value="student">Student</option>
            <option value="unemployed">Unemployed / Looking for work</option>
          </select>
        </div>

        {/* Work Experience */}
        <div>
          <label className={labelClass}>Years of Work Experience</label>
          <input type="number" placeholder="e.g. 5" value={form.workExperience} onChange={(e) => update("workExperience", e.target.value)} className={fieldClass} min="0" max="50" />
        </div>

        {/* English Level */}
        <div>
          <label className={labelClass}>English Proficiency Level</label>
          <select value={form.englishLevel} onChange={(e) => update("englishLevel", e.target.value)} className={fieldClass}>
            <option value="">Select level</option>
            <option value="native">Native / Near-Native</option>
            <option value="ielts_8">IELTS 8.0+ / C2 Proficient</option>
            <option value="ielts_7">IELTS 7.0-7.5 / C1 Advanced</option>
            <option value="ielts_6">IELTS 6.0-6.5 / B2 Upper-Intermediate</option>
            <option value="ielts_5">IELTS 5.0-5.5 / B1 Intermediate</option>
            <option value="basic">Basic (Below IELTS 5.0)</option>
            <option value="none">No formal test taken</option>
          </select>
        </div>

        {/* Travel History */}
        <div>
          <label className={labelClass}>International Travel History</label>
          <select value={form.travelHistory} onChange={(e) => update("travelHistory", e.target.value)} className={fieldClass}>
            <option value="">Select travel history</option>
            <option value="many_developed">Visited many developed countries (US, UK, EU, etc.)</option>
            <option value="some_developed">Visited some developed countries (1-3 countries)</option>
            <option value="developing">Only visited developing countries</option>
            <option value="first_time">First international trip</option>
          </select>
        </div>

        {/* Previous Refusals */}
        <div>
          <label className={labelClass}>Previous Visa Refusals</label>
          <select value={form.previousRefusals} onChange={(e) => update("previousRefusals", e.target.value)} className={fieldClass}>
            <option value="0">No previous refusals</option>
            <option value="1">1 refusal</option>
            <option value="2">2 refusals</option>
            <option value="3">3 or more refusals</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleCheck}
        disabled={loading}
        className="w-full bg-primary-800 text-white font-bold py-4 rounded-2xl text-lg hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Calculating..." : "Check My Eligibility"}
      </button>

      {result && (
        <div className={`mt-8 rounded-2xl border-2 p-6 ${result.bgColor}`}>
          {/* Score */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
            <div className="relative w-32 h-32 flex-shrink-0">
              <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <circle cx="60" cy="60" r="50" fill="none"
                  stroke={result.level === "High" ? "#10b981" : result.level === "Medium" ? "#f59e0b" : "#ef4444"}
                  strokeWidth="10"
                  strokeDasharray={`${result.score * 3.14} 314`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-extrabold ${result.color}`}>{result.score}</span>
                <span className={`text-xs font-semibold ${result.color}`}>/ 100</span>
              </div>
            </div>
            <div>
              <div className={`text-2xl font-extrabold mb-1 ${result.color}`}>{result.level} Chance</div>
              <div className="text-gray-600 text-sm mb-2">{result.riskLevel}</div>
              <div className="text-gray-700 text-sm leading-relaxed max-w-md">{result.recommendation}</div>
            </div>
          </div>

          {/* Recommended Visa */}
          <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
            <div className="text-xs font-bold text-gray-500 uppercase mb-1">Recommended Visa Type</div>
            <div className="font-bold text-gray-900">{result.recommendedVisa}</div>
          </div>

          {/* Improvements */}
          {result.improvements.length > 0 && (
            <div className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="text-xs font-bold text-gray-500 uppercase mb-3">Improvement Suggestions</div>
              <ul className="space-y-2">
                {result.improvements.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-amber-500 mt-0.5 flex-shrink-0">&#x26A0;</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-xs text-gray-500 mt-4">
            This is an automated assessment for guidance purposes only. Actual visa decisions are made by immigration authorities based on a comprehensive review of your complete application and individual circumstances.
          </p>
        </div>
      )}
    </div>
  );
}
