# Global Visa Guide Hub

A production-ready, SEO-optimized visa and immigration information website built with **Next.js 14+ App Router**, **Tailwind CSS**, and **TypeScript**. Fully deployable on Vercel.

## Features

- **15 country pages** with visa requirements, step-by-step guides, FAQs, and internal links
- **4 visa type pages** (Study, Work, Tourist, Immigration/PR) with full guides
- **500+ blog articles** generated from a data-driven template system — scalable, unique per URL
- **JSON-LD schema** (FAQPage, Article, BreadcrumbList, WebSite) on every relevant page
- **Auto-generated sitemap.xml** listing all 530+ routes
- **AdSense-ready** layout with banner, in-content, and sidebar ad slots
- **Government-style professional UI** in blue/green palette, fully mobile responsive
- Client-side search/filter on the homepage and blog listing

## Getting Started

```bash
npm install
npm run dev        # Development server on http://localhost:3000
npm run build      # Production build
npm run start      # Serve the production build
```

## Regenerating the Article Manifest

The 500-article manifest is pre-generated and committed to `data/article-manifest.json`. To regenerate it (e.g., after adding new countries or patterns):

```bash
node scripts/generate-manifest.mjs
```

This overwrites `data/article-manifest.json`. Commit the updated file to keep builds reproducible.

## Project Structure

```
app/
  layout.tsx              # Root layout with Header, Footer, AdSense banner slot
  page.tsx                # Homepage with hero, country search, SEO content
  country/[country]/      # 15 static country pages
  visa/[type]/            # 4 static visa type pages
  blog/
    page.tsx              # Paginated blog listing with search/filter
    BlogList.tsx          # Client component for filtering
    [slug]/page.tsx       # 500 individual article pages
  sitemap.ts              # Auto-generated sitemap (530+ URLs)
  robots.ts               # robots.txt via Next.js metadata API
  privacy/                # Privacy policy
  disclaimer/             # Disclaimer
  contact/                # Contact form

components/
  Header.tsx              # Sticky nav with mobile menu
  Footer.tsx              # 4-column footer with links
  SearchFilter.tsx        # Client-side country search + visa type filter
  FAQSection.tsx          # Accordion FAQ component
  RelatedArticles.tsx     # Related article links
  Breadcrumb.tsx          # Accessible breadcrumb navigation
  Card.tsx                # Reusable card component
  ads/AdSlot.tsx          # AdSense-ready slot placeholders
  ui/Button.tsx           # Design system button

data/
  countries.ts            # 15 country definitions
  visa-types.ts           # 4 visa type definitions with FAQs and steps
  article-manifest.json   # Generated 500-article manifest

lib/
  articles.ts             # Manifest loader, lookup helpers
  article-body.ts         # Article section assembler with content variation
  related.ts              # Related article recommendation logic
  jsonld.ts               # JSON-LD schema builders

scripts/
  generate-manifest.mjs   # Generates data/article-manifest.json
```

## AdSense Setup

1. Create a Google AdSense account at https://adsense.google.com
2. Get your publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`)
3. Add the AdSense script to `app/layout.tsx` (placeholder comment already present)
4. Replace the `data-ad-client` and `data-ad-slot` values in `components/ads/AdSlot.tsx`

## Vercel Deployment

Push to GitHub and connect to Vercel. The framework is auto-detected. No environment variables are required for the base deployment (fully static, no API keys needed).

For a custom domain, update the `metadataBase` URL in `app/layout.tsx` and the sitemap URL in `app/sitemap.ts` to match your domain.

## SEO Notes

- Every page exports `metadata` (title, description, canonical URL)
- JSON-LD schemas are embedded in the `<head>` of each relevant page
- The sitemap lists all 530+ routes with appropriate `priority` and `changeFrequency`
- Article slugs are long-tail keyword phrases for organic search targeting
- For best SEO results, consider replacing templated article bodies with human-written content over time using the same manifest structure

## Disclaimer

Information on this website is for general guidance only. Always verify visa requirements with official embassy and government sources before applying.
