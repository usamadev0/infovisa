"use client";

import { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FAQSection({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-gray-200 rounded-xl overflow-hidden"
        >
          <button
            className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 bg-white hover:bg-primary-50 transition-colors"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            aria-expanded={openIndex === i}
          >
            <span className="font-semibold text-gray-900 text-sm sm:text-base">
              {faq.question}
            </span>
            <span className="shrink-0 text-primary-700 transition-transform duration-200" style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="px-5 py-4 bg-primary-50 border-t border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
