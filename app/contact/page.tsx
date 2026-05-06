import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Global Visa Guide Hub for questions, corrections, or partnership inquiries.",
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: "Contact" }]} />
      <h1 className="text-3xl font-bold text-primary-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-8">
        Have a question, found an inaccuracy, or want to collaborate? We&apos;d love to hear from you.
      </p>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
              Your Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="subject">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="e.g. Visa guide correction, Partnership"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Write your message here..."
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
        <p className="text-xs text-gray-400 mt-4 text-center">
          This form is for general inquiries. For immigration advice, please consult a licensed immigration consultant.
        </p>
      </div>
    </div>
  );
}
