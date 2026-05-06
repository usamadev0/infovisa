"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Countries", href: "/#countries" },
  { label: "Visa Types", href: "/#visa-types" },
  { label: "Study Visa", href: "/visa/study" },
  { label: "Work Visa", href: "/visa/work" },
  { label: "Tourist Visa", href: "/visa/tourist" },
  { label: "Immigration", href: "/visa/immigration" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🌐</span>
            <span className="font-bold text-primary-800 text-lg leading-tight hidden sm:block">
              Global Visa <span className="text-accent-500">Guide Hub</span>
            </span>
            <span className="font-bold text-primary-800 text-lg leading-tight sm:hidden">
              GVGH
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-primary-800 hover:bg-primary-50 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-3 text-sm font-medium text-gray-700 hover:text-primary-800 hover:bg-primary-50 rounded-lg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
