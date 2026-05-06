import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ALL_ARTICLES, getArticleBySlug, getAllSlugs } from "@/lib/articles";
import { buildArticleBody } from "@/lib/article-body";
import { getRelatedArticles } from "@/lib/related";
import { faqSchema, articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import FAQSection from "@/components/FAQSection";
import RelatedArticles from "@/components/RelatedArticles";
import Breadcrumb from "@/components/Breadcrumb";
import AdSlot from "@/components/ads/AdSlot";
import { COUNTRIES } from "@/data/countries";
import { VISA_TYPES } from "@/data/visa-types";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.metaDescription,
    keywords: article.tags,
    alternates: { canonical: `https://globalvisaguidehub.com/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
    },
  };
}

const VISA_ICONS: Record<string, string> = {
  study: "🎓",
  work: "💼",
  tourist: "✈️",
  immigration: "🏠",
  country: "🌍",
};

export default function BlogPostPage({ params }: Props) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const body = buildArticleBody(article);
  const related = getRelatedArticles(article.slug, 5);
  const country = COUNTRIES.find((c) => c.slug === article.country);
  const visaType = VISA_TYPES.find((v) => v.slug === article.visaType);

  const faqSection = body.find((s) => s.type === "faq");
  const faqs = (faqSection?.content as { question: string; answer: string }[]) ?? [];

  const faqLd = faqSchema(faqs);
  const articleLd = articleSchema({
    title: article.title,
    description: article.metaDescription,
    url: `https://globalvisaguidehub.com/blog/${article.slug}`,
    publishedAt: article.publishedAt,
  });
  const breadcrumbLd = breadcrumbSchema([
    { name: "Home", url: "https://globalvisaguidehub.com" },
    { name: "Blog", url: "https://globalvisaguidehub.com/blog" },
    { name: article.title, url: `https://globalvisaguidehub.com/blog/${article.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main article */}
          <article className="lg:col-span-2">
            <Breadcrumb
              items={[
                { label: "Blog", href: "/blog" },
                { label: article.category, href: `/blog?cat=${article.visaType}` },
                { label: article.title },
              ]}
            />

            {/* Article header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-medium text-primary-700 bg-primary-50 px-2.5 py-1 rounded-full">
                  {VISA_ICONS[article.visaType]} {article.category}
                </span>
                {country && (
                  <Link
                    href={`/country/${country.slug}`}
                    className="text-xs font-medium text-gray-600 bg-gray-100 hover:bg-primary-50 hover:text-primary-700 px-2.5 py-1 rounded-full transition-colors"
                  >
                    {country.flag} {country.name}
                  </Link>
                )}
                <span className="text-xs text-gray-400">{article.readingTimeMinutes} min read</span>
                <span className="text-xs text-gray-400">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                {article.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">{article.metaDescription}</p>
            </header>

            {/* Article body */}
            <div className="space-y-8">
              {body.map((section, i) => {
                switch (section.type) {
                  case "intro":
                    return (
                      <section key={i}>
                        <h2 className="text-2xl font-bold text-primary-800 mb-4">Introduction</h2>
                        <p className="text-gray-700 leading-relaxed">{section.content as string}</p>
                      </section>
                    );

                  case "requirements":
                    return (
                      <section key={i}>
                        <h2 className="text-2xl font-bold text-primary-800 mb-4">
                          Requirements Checklist
                        </h2>
                        <div className="bg-white rounded-xl border border-gray-200 p-5">
                          <ul className="space-y-3">
                            {(section.content as string[]).map((req, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="text-accent-500 mt-0.5 shrink-0 text-base">✓</span>
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    );

                  case "steps":
                    return (
                      <section key={i}>
                        <h2 className="text-2xl font-bold text-primary-800 mb-5">
                          Step-by-Step Application Process
                        </h2>
                        <ol className="space-y-4">
                          {(section.content as { title: string; description: string }[]).map((step, j) => (
                            <li key={j} className="flex gap-4">
                              <span className="shrink-0 w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center font-bold text-sm">
                                {j + 1}
                              </span>
                              <div>
                                <h3 className="font-semibold text-gray-900">{step.title}</h3>
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{step.description}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </section>
                    );

                  case "fees":
                    return (
                      <section key={i}>
                        <h2 className="text-2xl font-bold text-primary-800 mb-4">Fees and Costs</h2>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
                          <p className="text-sm text-gray-700 leading-relaxed">{section.content as string}</p>
                        </div>
                      </section>
                    );

                  case "mistakes":
                    return (
                      <section key={i}>
                        {/* In-content ad before mistakes section */}
                        <div className="mb-6">
                          <AdSlot slot="in-content" />
                        </div>
                        <h2 className="text-2xl font-bold text-primary-800 mb-4">
                          Common Mistakes to Avoid
                        </h2>
                        <div className="bg-red-50 border border-red-100 rounded-xl p-5">
                          <ul className="space-y-3">
                            {(section.content as string[]).map((mistake, j) => (
                              <li key={j} className="flex items-start gap-3 text-sm text-gray-700">
                                <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                                {mistake}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </section>
                    );

                  case "faq":
                    return (
                      <section key={i}>
                        <h2 className="text-2xl font-bold text-primary-800 mb-5">
                          Frequently Asked Questions
                        </h2>
                        <FAQSection faqs={section.content as { question: string; answer: string }[]} />
                      </section>
                    );

                  case "conclusion":
                    return (
                      <section key={i} className="bg-primary-50 border border-primary-100 rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-primary-800 mb-3">Conclusion</h2>
                        <p className="text-gray-700 leading-relaxed">{section.content as string}</p>
                      </section>
                    );

                  default:
                    return null;
                }
              })}
            </div>

            {/* Internal links */}
            <div className="mt-10 p-5 bg-white rounded-2xl border border-gray-200">
              <h3 className="font-bold text-gray-900 mb-4">Useful Links</h3>
              <div className="flex flex-wrap gap-2">
                {country && (
                  <Link
                    href={`/country/${country.slug}`}
                    className="text-sm text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition-colors border border-primary-200"
                  >
                    {country.flag} {country.name} Visa Guide
                  </Link>
                )}
                {visaType && (
                  <Link
                    href={`/visa/${visaType.slug}`}
                    className="text-sm text-primary-700 bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded-full transition-colors border border-primary-200"
                  >
                    {visaType.icon} {visaType.name} Overview
                  </Link>
                )}
                <Link
                  href="/blog"
                  className="text-sm text-gray-700 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-full transition-colors border border-gray-200"
                >
                  📚 All Visa Guides
                </Link>
              </div>
            </div>

            {/* Related articles */}
            <RelatedArticles articles={related} />
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Article Info</h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Country</dt>
                  <dd>
                    <Link href={`/country/${article.country}`} className="text-primary-700 hover:underline font-medium">
                      {country?.flag} {article.countryName}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Visa Type</dt>
                  <dd>
                    <Link href={`/visa/${article.visaType}`} className="text-primary-700 hover:underline font-medium">
                      {visaType?.name ?? article.visaType}
                    </Link>
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Category</dt>
                  <dd className="text-gray-900">{article.category}</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Reading Time</dt>
                  <dd className="text-gray-900">{article.readingTimeMinutes} minutes</dd>
                </div>
                <div>
                  <dt className="text-gray-500 text-xs uppercase tracking-wide mb-1">Published</dt>
                  <dd className="text-gray-900">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 pt-5 border-t border-gray-100 space-y-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {article.tags.slice(0, 6).map((tag) => (
                    <span key={tag} className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <AdSlot slot="sidebar" />
          </aside>
        </div>
      </div>
    </>
  );
}
