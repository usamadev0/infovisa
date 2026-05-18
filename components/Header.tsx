"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { COUNTRIES } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";

const PROCESSES = [
  { label: "Apply for Study Visa", href: "/process/apply-study-visa", icon: "🎓" },
  { label: "Apply for Work Visa", href: "/process/apply-work-visa", icon: "💼" },
  { label: "Visa Interview Prep", href: "/process/visa-interview-preparation", icon: "🎤" },
  { label: "Visa Rejection Appeal", href: "/process/visa-rejection-appeal", icon: "⚖️" },
  { label: "Tourist Visa Guide", href: "/process/tourist-visa-application", icon: "✈️" },
  { label: "Biometrics & Health", href: "/process/biometrics-enrollment", icon: "🔏" },
  { label: "Embassy Interview", href: "/process/embassy-interview-guide", icon: "🏛️" },
  { label: "PR Application Guide", href: "/process/pr-immigration-application", icon: "🏠" },
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
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
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
  const hamburgerColor = scrolled ? "text-gray-700" : "text-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBase}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-colors duration-300 ${scrolled ? "bg-primary-800 text-white" : "bg-white/20 text-white border border-white/30"}`}>
              🌐
            </div>
            <div className="hidden sm:block leading-tight">
              <span className={`font-extrabold text-base tracking-tight transition-colors duration-300 ${logoColor}`}>Global Visa </span>
              <span className={`font-extrabold text-base tracking-tight transition-colors duration-300 ${accentColor}`}>Guide Hub</span>
            </div>
            <span className={`sm:hidden font-extrabold text-base transition-colors duration-300 ${logoColor}`}>GVGH</span>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5">

            {/* Countries dropdown */}
            <Dropdown label="Countries" scrolled={scrolled}>
              <div className="p-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">15 Destinations</p>
                <div className="grid grid-cols-2 gap-0.5">
                  {COUNTRIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/country/${c.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        alt={`${c.name} flag`}
                        width={20}
                        height={15}
                        className="rounded-sm object-cover shadow-sm"
                      />
                      <span className="font-medium">{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Dropdown>

            {/* Visa Types dropdown */}
            <Dropdown label="Visa Types" scrolled={scrolled}>
              <div className="p-2">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 pt-1 pb-2">Categories</p>
                {VISA_TYPES.map((v) => (
                  <Link
                    key={v.slug}
                    href={`/visa/${v.slug}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                  >
                    <span className="text-xl w-7 text-center">{v.icon}</span>
                    <div>
                      <div className="font-semibold">{v.name}</div>
                      <div className="text-xs text-gray-400">{v.shortDescription.slice(0, 40)}…</div>
                    </div>
                  </Link>
                ))}
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
                    <span className="text-base w-6 text-center">{p.icon}</span>
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
                  <span className="text-xl w-7 text-center">✅</span>
                  <div>
                    <div className="font-semibold">Eligibility Checker</div>
                    <div className="text-xs text-gray-400">Check your visa approval chances</div>
                  </div>
                </Link>
                <Link
                  href="/tools/cost-calculator"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-800 transition-colors"
                >
                  <span className="text-xl w-7 text-center">💰</span>
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
              Free Guides →
            </Link>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${hamburgerColor} ${scrolled ? "hover:bg-gray-100" : "hover:bg-white/10"}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
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
                <span>🌍 Countries</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "countries" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileSection === "countries" && (
                <div className="grid grid-cols-2 gap-1 px-3 pb-2">
                  {COUNTRIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/country/${c.slug}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <Image
                        src={`https://flagcdn.com/w40/${c.code}.png`}
                        alt={`${c.name} flag`}
                        width={20}
                        height={15}
                        className="rounded-sm object-cover shadow-sm"
                      />
                      <span className="truncate">{c.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Visa Types accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "visa" ? null : "visa")}
                className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors"
              >
                <span>📄 Visa Types</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "visa" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileSection === "visa" && (
                <div className="space-y-1 px-3 pb-2">
                  {VISA_TYPES.map((v) => (
                    <Link key={v.slug} href={`/visa/${v.slug}`} onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                      <span>{v.icon}</span><span>{v.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Apply Process accordion */}
            <div>
              <button
                onClick={() => setMobileSection(mobileSection === "process" ? null : "process")}
                className="w-full flex items-center justify-between py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors"
              >
                <span>📋 Apply Process</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "process" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileSection === "process" && (
                <div className="space-y-1 px-3 pb-2">
                  {PROCESSES.map((p) => (
                    <Link key={p.href} href={p.href} onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                      <span>{p.icon}</span><span>{p.label}</span>
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
                <span>🛠️ Free Tools</span>
                <svg className={`w-4 h-4 text-gray-400 transition-transform ${mobileSection === "tools" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileSection === "tools" && (
                <div className="space-y-1 px-3 pb-2">
                  <Link href="/tools/eligibility-checker" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                    <span>✅</span><span>Eligibility Checker</span>
                  </Link>
                  <Link href="/tools/cost-calculator" onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 py-2 px-2 text-sm text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors">
                    <span>💰</span><span>Cost Calculator</span>
                  </Link>
                </div>
              )}
            </div>

            <Link href="/blog" onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 py-3 px-3 text-sm font-semibold text-gray-800 hover:bg-primary-50 rounded-xl transition-colors">
              📰 Blog
            </Link>
          </div>

          <div className="px-4 pb-4 pt-2 border-t border-gray-100">
            <Link href="/blog" onClick={() => setMenuOpen(false)}
              className="block w-full text-center bg-primary-800 text-white font-semibold py-3 rounded-xl hover:bg-primary-700 transition-colors">
              Browse Free Guides →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
