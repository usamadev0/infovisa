import Link from "next/link";

interface CardProps {
  href: string;
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string;
  badgeColor?: "blue" | "green" | "orange";
  description?: string;
  meta?: string;
}

const badgeColors = {
  blue: "bg-primary-100 text-primary-800",
  green: "bg-accent-100 text-accent-700",
  orange: "bg-orange-100 text-orange-700",
};

export default function Card({
  href,
  title,
  subtitle,
  icon,
  badge,
  badgeColor = "blue",
  description,
  meta,
}: CardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-200 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {icon && (
              <span className="text-3xl leading-none shrink-0">{icon}</span>
            )}
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-primary-800 transition-colors leading-snug">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>
          {badge && (
            <span
              className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${badgeColors[badgeColor]}`}
            >
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
            {description}
          </p>
        )}
        {meta && (
          <p className="text-xs text-gray-400 mt-3">{meta}</p>
        )}
      </div>
    </Link>
  );
}
