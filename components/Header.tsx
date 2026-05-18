"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Globe,
  GraduationCap,
  Briefcase,
  Plane,
  Home,
  Building2,
  ClipboardList,
  BookOpen,
  Mic,
  Scale,
  Fingerprint,
  Landmark,
  Calculator,
  CheckSquare,
  Newspaper,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { COUNTRIES_EXTENDED } from "@/data/countries-extended";
import { VISA_TYPES } from "@/data/visa-types";

// Top 12 countries shown in desktop header dropdown
const HEADER_SLUGS = ["usa", "uk", "canada", "australia", "germany", "france", "uae", "japan", "netherlands", "singapore", "new-zealand", "ireland"];
const headerCountries = COUNTRIES_EXTENDED.filter((c) => HEADER_SLUGS.includes(c.slug));

const VISA_LUCIDE: Record<string, React.ElementType> = {
  study: GraduationCap,
  work: Briefcase,
  tourist: Plane,
  immigration: Home,
  business: Building2,
};

const PROCESSES = [
  { label: "Apply for Study Visa",   href: "/process/apply-study-visa",           Icon: GraduationCap },
  { label: "Apply for Work Visa",    href: "/process/apply-work-visa",            Icon: Briefcase },
  { label: "Visa Interview Prep",    href: "/process/visa-interview-preparation", Icon: Mic },
  { label: "Visa Rejection Appeal",  href: "/process/visa-rejection-appeal",      Icon: Scale },
  { label: "Tourist Visa Guide",     href: "/process/tourist-visa-application",   Icon: Plane },
  { label: "Biometrics & Health",    href: "/process/biometrics-enrollment",      Icon: Fingerprint },
  { label: "Embassy Interview",      href: "/process/embassy-interview-guide",    Icon: Landmark },
  { label: "PR Application Guide",   href: "/process/pr-immigration-application", Icon: Home },
];

function useOutsideClick(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) cb();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [ref, cb]);
}

interface DropdownProps {
  label: string;
  scrolled: boolean;
  children: React.ReactNode;
}

function Dropdown({ label, scrolled, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false));

  const linkColor = scrolled
    ? "text-gray-700 hover:text-primary-800 hover:bg-primary-50"
    : "text-white/90 hover:text-white hover:bg-white/10";

  return (
    <div ref={ref} className="relative">
      <button
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${linkColor}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 min-w-[220px] overflow-hidden animate-fade-in"
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navBase = scrolled
    ? "bg-white/97 backdrop-blur-md border-b border-gray-200 shadow-sm"
    : "bg-transparent border-b border-white/10";

  const logoColor = scrolled ? "text-primary-800" : "text-white";
  const accentColor = scrolled ? "text-accent-500" : "text-accent-400";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-300 ${scrolled ? "bg-primary-800" : "bg-white/20 border border-white/30"}`}>
              <Globe className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block leading-tight">
              <span className={`font-extrabold text-base tracking-tight transition-colors duration-300 ${logoColor}`}>VisaProcess</span>
              <span className={`font-extrabold text-base tracking-tight transition-colors duration-300 ${accentColor}`}>Info</span>
            </div>
            <span className={`sm:hidden font-extrabold text-base transition-colors duration-300 ${logoColor}`}>VPI</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">

            {/* Countries dropdown */}
            <Dropdown label="Countries" scrolled={scrolled}>
              <div className="p-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">Top Destinations</p>
                <div className="grid grid-cols-2 gap-0.5">
                  {headerCountries.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}-visa-info`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        alt={`${c.name} flag`}
                        width={20}
                        height={15}
                        className="rounded-sm object-cover shadow-sm"
                        unoptimized
                      />
                      <span className="font-medium">{c.name}</span>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-2 pt-2 px-2">
                  <Link
                    href="/#countries"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-accent-700 hover:bg-accent-50 font-semibold transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    View all 131 countries
                  </Link>
                </div>
              </div>
            </Dropdown>

            {/* Visa Types dropdown */}
            <Dropdown label="Visa Types" scrolled={scrolled}>
              <div className="p-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">Categories</p>
                {VISA_TYPES.map((v) => {
                  const IconComp = VISA_LUCIDE[v.slug] ?? Globe;
                  return (
                    <Link
                      key={v.slug}
                      href={`/visa/${v.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                    >
                      <IconComp className="w-5 h-5 text-primary-600 shrink-0" />
                      <div>
                        <div className="font-semibold">{v.name}</div>
                        <div className="text-xs text-gray-400">{v.shortDescription.slice(0, 40)}&hellip;</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Dropdown>

            {/* Processes dropdown */}
            <Dropdown label="Apply Process" scrolled={scrolled}>
              <div className="p-2 w-64">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">Step-by-Step Guides</p>
                {PROCESSES.map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                  >
                    <p.Icon className="w-4 h-4 text-primary-600 shrink-0" />
                    <span className="font-medium">{p.label}</span>
                  </Link>
                ))}
              </div>
            </Dropdown>

            {/* Tools dropdown */}
            <Dropdown label="Free Tools" scrolled={scrolled}>
              <div className="p-2 w-64">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">Visa Tools</p>
                <Link
                  href="/tools/eligibility-checker"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                >
                  <CheckSquare className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-semibold">Eligibility Checker</div>
                    <div className="text-xs text-gray-400">Check your visa approval chances</div>
                  </div>
                </Link>
                <Link
                  href="/tools/cost-calculator"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                >
                  <Calculator className="w-5 h-5 text-primary-600" />
                  <div>
                    <div className="font-semibold">Cost Calculator</div>
                    <div className="text-xs text-gray-400">Estimate total visa fees</div>
                  </div>
                </Link>
              </div>
            </Dropdown>

            {/* Blog */}
            <Link
              href="/blog"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                scrolled ? "text-gray-700 hover:text-primary-800 hover:bg-primary-50" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              Blog
            </Link>

            {/* About */}
            <Link
              href="/about"
              className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                scrolled ? "text-gray-700 hover:text-primary-800 hover:bg-primary-50" : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              About
            </Link>
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/blog"
              className={`px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md ${
                scrolled ? "bg-primary-800 text-white hover:bg-primary-700" : "bg-white text-primary-800 hover:bg-white/90"
              }`}
            >
              Free Guides
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[80vh]">
          <div className="px-4 py-3 space-y-1">

            {/* Countries accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "countries" ? null : "countries")}
                className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-primary-600" /> Countries</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "countries" ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === "countries" && (
                <div className="grid grid-cols-2 gap-1 px-3 pb-2">
                  {headerCountries.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${c.slug}-visa-info`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        alt={`${c.name} flag`}
                        width={20}
                        height={15}
                        className="rounded-sm object-cover shadow-sm"
                        unoptimized
                      />
                      <span className="truncate">{c.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/#countries"
                    onClick={() => setMenuOpen(false)}
                    className="col-span-2 flex items-center gap-1.5 py-2 px-2 text-sm text-accent-700 font-semibold hover:bg-accent-50 rounded-lg transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    View all 131 countries
                  </Link>
                </div>
              )}
            </div>

            {/* Visa Types accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "visa" ? null : "visa")}
                className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-primary-600" /> Visa Types</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "visa" ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === "visa" && (
                <div className="space-y-1 px-3 pb-2">
                  {VISA_TYPES.map((v) => {
                    const IconComp = VISA_LUCIDE[v.slug] ?? Globe;
                    return (
                      <Link key={v.slug} href={`/visa/${v.slug}`} onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                        <IconComp className="w-4 h-4 text-primary-600" />
                        <span>{v.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Apply Process accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "process" ? null : "process")}
                className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-primary-600" /> Apply Process</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "process" ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === "process" && (
                <div className="space-y-1 px-3 pb-2">
                  {PROCESSES.map((p) => (
                    <Link key={p.href} href={p.href} onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                      <p.Icon className="w-4 h-4 text-primary-600" />
                      <span>{p.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Tools accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "tools" ? null : "tools")}
                className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors"
              >
                <span className="flex items-center gap-2"><Calculator className="w-4 h-4 text-primary-600" /> Free Tools</span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "tools" ? "rotate-180" : ""}`} />
              </button>
              {mobileSection === "tools" && (
                <div className="space-y-1 px-3 pb-2">
                  <Link href="/tools/eligibility-checker" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                    <CheckSquare className="w-4 h-4 text-primary-600" />
                    <span>Eligibility Checker</span>
                  </Link>
                  <Link href="/tools/cost-calculator" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                    <Calculator className="w-4 h-4 text-primary-600" />
                    <span>Cost Calculator</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blog" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors">
              <Newspaper className="w-4 h-4 text-primary-600" />
              Blog
            </Link>
          </div>

          <div className="px-4 pb-4 pt-2 border-t border-gray-100">
            <Link href="/blog" onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-primary-800 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition-colors">
              Browse Free Guides
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
