import Link from "next/link";
import { COUNTRIES } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌐</span>
              <span className="font-bold text-white text-lg">
                Global Visa <span className="text-accent-500">Guide Hub</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Your trusted source for visa and immigration information. We provide up-to-date guides for students, workers, tourists, and immigrants worldwide.
            </p>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Popular Countries
            </h3>
            <ul className="space-y-2">
              {COUNTRIES.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/country/${c.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {c.flag} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visa Types */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Visa Categories
            </h3>
            <ul className="space-y-2">
              {VISA_TYPES.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/visa/${v.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {v.icon} {v.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/blog" className="text-sm hover:text-white transition-colors">
                  📰 Visa Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              Information
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                This website provides general information only. Always verify requirements with official embassies and government sources before applying.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Global Visa Guide Hub. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
