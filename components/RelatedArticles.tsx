import Link from "next/link";
import { ArticleMeta } from "@/lib/articles";

export default function RelatedArticles({ articles }: { articles: ArticleMeta[] }) {
  if (!articles.length) return null;

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Related Articles</h2>
      <div className="grid gap-3">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/blog/${a.slug}`}
            className="group flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
          >
            <span className="text-2xl shrink-0 mt-0.5">
              {a.visaType === "study" ? "🎓" : a.visaType === "work" ? "💼" : a.visaType === "tourist" ? "✈️" : "🏠"}
            </span>
            <div>
              <p className="font-medium text-gray-900 group-hover:text-primary-800 transition-colors text-sm leading-snug">
                {a.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {a.category} · {a.readingTimeMinutes} min read
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
