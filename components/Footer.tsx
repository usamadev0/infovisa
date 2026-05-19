import Link from "next/link";
import Image from "next/image";
import { Globe, GraduationCap, Briefcase, Plane, Home, Building2, Newspaper, MapPin } from "lucide-react";
import { COUNTRIES_EXTENDED } from "@/data/countries-extended";
import { VISA_TYPES } from "@/data/visa-types";

// Top 8 featured countries for footer links
const FOOTER_SLUGS = ["usa", "uk", "canada", "australia", "germany", "france", "uae", "japan"];
const footerCountries = COUNTRIES_EXTENDED.filter((c) => FOOTER_SLUGS.includes(c.slug));

const VISA_ICONS: Record<string, React.ElementType> = {
  study: GraduationCap,
  work: Briefcase,
  tourist: Plane,
  immigration: Home,
  business: Building2,
};

const PROCESS_LINKS = [
  { label: "Apply for Study Visa",  href: "/process/study-visa-application" },
  { label: "Apply for Work Visa",   href: "/process/work-permit-application" },
  { label: "Tourist Visa Guide",    href: "/process/tourist-visa-application" },
  { label: "Visa Interview Prep",   href: "/process/visa-interview-preparation" },
  { label: "Visa Rejection Appeal", href: "/process/visa-rejection-appeal" },
  { label: "Biometrics & Health",   href: "/process/biometrics-enrollment" },
  { label: "Embassy Interview",     href: "/process/embassy-interview-guide" },
  { label: "PR Application Guide",  href: "/process/pr-immigration-application" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 bg-primary-700 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base">VisaProcess</span>
                <span className="font-extrabold text-accent-400 text-base">Info</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Your trusted source for visa and immigration information worldwide. Comprehensive guides for students, workers, tourists, and immigrants — completely free.
            </p>
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Always verify requirements with official embassies and government sources before applying.
            </p>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Top Countries</h3>
            <ul className="space-y-2">
              {footerCountries.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}-visa-info`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-5 h-3.5 rounded-sm overflow-hidden inline-block shrink-0 border border-gray-700">
                      <Image
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        alt={`${c.name} flag`}
                        width={20}
                        height={14}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    </span>
                    {c.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#countries" className="text-sm text-accent-400 hover:text-accent-300 transition-colors flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5" />
                  View all 131 countries
                </Link>
              </li>
            </ul>
          </div>

          {/* Visa Types */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Visa Types</h3>
            <ul className="space-y-2 mb-6">
              {VISA_TYPES.map((v) => {
                const IconComp = VISA_ICONS[v.slug] ?? Globe;
                return (
                  <li key={v.slug}>
                    <Link href={`/visa/${v.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                      <IconComp className="w-3.5 h-3.5 shrink-0" />
                      {v.name}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 shrink-0" />
                  Visa Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Processes */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-wider">Apply Process</h3>
            <ul className="space-y-2">
              {PROCESS_LINKS.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} VisaProcessInfo. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-gray-500">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
