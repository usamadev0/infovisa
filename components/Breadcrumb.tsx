import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /**
   * "light" → white text, for use inside hero/banner sections over photos
   * "dark"  → gray text, for use inside white/light page body sections (default)
   */
  variant?: "light" | "dark";
}

export default function Breadcrumb({ items, variant = "dark" }: BreadcrumbProps) {
  const isLight = variant === "light";

  return (
    <nav
      className={`flex items-center gap-1.5 text-sm mb-5 flex-wrap ${isLight ? "text-white/70" : "text-gray-500"}`}
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className={`transition-colors ${isLight ? "hover:text-white" : "hover:text-primary-700"}`}
      >
        Home
      </Link>

      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {/* Chevron separator */}
          <svg
            className={`w-3.5 h-3.5 shrink-0 ${isLight ? "text-white/40" : "text-gray-400"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>

          {item.href ? (
            <Link
              href={item.href}
              className={`transition-colors ${isLight ? "text-white/70 hover:text-white" : "hover:text-primary-700"}`}
            >
              {item.label}
            </Link>
          ) : (
            <span className={`font-semibold ${isLight ? "text-white/90" : "text-gray-800"}`}>
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
