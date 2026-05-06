export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export interface ArticleSchemaInput {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  authorName?: string;
}

export function articleSchema(input: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: input.url,
    datePublished: input.publishedAt,
    author: {
      "@type": "Organization",
      name: input.authorName ?? "Global Visa Guide Hub",
    },
    publisher: {
      "@type": "Organization",
      name: "Global Visa Guide Hub",
      url: "https://globalvisaguidehub.com",
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Global Visa Guide Hub",
    url: "https://globalvisaguidehub.com",
    description:
      "Comprehensive visa and immigration guides for students, workers, tourists, and immigrants worldwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://globalvisaguidehub.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };
}
