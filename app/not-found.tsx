import type { Metadata } from "next";
import Link from "next/link";
import { Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center mx-auto mb-6">
        <Globe className="w-12 h-12 text-primary-400" />
      </div>
      <h1 className="text-4xl font-bold text-primary-800 mb-3">Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        The visa guide you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-6 py-3 bg-primary-800 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors shadow-sm"
        >
          Back to Home
        </Link>
        <Link
          href="/blog"
          className="px-6 py-3 border-2 border-primary-800 text-primary-800 rounded-xl font-semibold hover:bg-primary-50 transition-colors"
        >
          Browse Visa Guides
        </Link>
      </div>
    </div>
  );
}
