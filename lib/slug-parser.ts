import { COUNTRIES_EXTENDED, VISA_TYPES_EXTENDED, type VisaTypeExtended } from "@/data/countries-extended";

export type PageType = "country-hub" | "apply" | "how-to" | "details" | null;

export interface ParsedSlug {
  pageType: PageType;
  countrySlug: string;
  visaType: VisaTypeExtended;
  countryName: string;
}

const COUNTRY_SLUGS = COUNTRIES_EXTENDED.map((c) => c.slug);

function findCountryInSlug(parts: string[], visaType: string): string | null {
  // Try longest match first
  for (let len = 3; len >= 1; len--) {
    for (let i = 0; i <= parts.length - len; i++) {
      const candidate = parts.slice(i, i + len).join("-");
      if (COUNTRY_SLUGS.includes(candidate)) {
        return candidate;
      }
    }
  }
  return null;
}

function findVisaType(slug: string): VisaTypeExtended | null {
  for (const vt of VISA_TYPES_EXTENDED) {
    if (slug.includes(`-${vt}-`) || slug.endsWith(`-${vt}`) || slug.startsWith(`${vt}-`)) {
      return vt;
    }
  }
  return null;
}

export function parseSlug(slug: string): ParsedSlug | null {
  // Pattern 1: {country}-visa-info  (e.g., usa-visa-info)
  if (slug.endsWith("-visa-info")) {
    const countryPart = slug.slice(0, -"-visa-info".length);
    if (COUNTRY_SLUGS.includes(countryPart)) {
      const country = COUNTRIES_EXTENDED.find((c) => c.slug === countryPart)!;
      return { pageType: "country-hub", countrySlug: countryPart, visaType: "visit", countryName: country.name };
    }
  }

  // Pattern 2: apply-{country}-{visatype}-visa (e.g., apply-usa-study-visa)
  if (slug.startsWith("apply-") && slug.endsWith("-visa")) {
    const inner = slug.slice("apply-".length, -"-visa".length); // e.g., usa-study
    const visaType = findVisaType(inner + "-x") || findVisaType("x-" + inner);
    if (visaType) {
      const countryPart = inner.replace(`-${visaType}`, "").replace(`${visaType}-`, "");
      if (COUNTRY_SLUGS.includes(countryPart)) {
        const country = COUNTRIES_EXTENDED.find((c) => c.slug === countryPart)!;
        return { pageType: "apply", countrySlug: countryPart, visaType, countryName: country.name };
      }
    }
    // Try each visa type explicitly
    for (const vt of VISA_TYPES_EXTENDED) {
      const withoutType = inner.replace(`-${vt}`, "").replace(`${vt}-`, "");
      if (COUNTRY_SLUGS.includes(withoutType)) {
        const country = COUNTRIES_EXTENDED.find((c) => c.slug === withoutType)!;
        return { pageType: "apply", countrySlug: withoutType, visaType: vt, countryName: country.name };
      }
    }
  }

  // Pattern 3: how-to-apply-{country}-{visatype}-visa (e.g., how-to-apply-usa-study-visa)
  if (slug.startsWith("how-to-apply-") && slug.endsWith("-visa")) {
    const inner = slug.slice("how-to-apply-".length, -"-visa".length);
    for (const vt of VISA_TYPES_EXTENDED) {
      const withoutType = inner.replace(`-${vt}`, "").replace(`${vt}-`, "");
      if (COUNTRY_SLUGS.includes(withoutType)) {
        const country = COUNTRIES_EXTENDED.find((c) => c.slug === withoutType)!;
        return { pageType: "how-to", countrySlug: withoutType, visaType: vt, countryName: country.name };
      }
    }
  }

  // Pattern 4: {country}-{visatype}-visa-details (e.g., usa-study-visa-details)
  if (slug.endsWith("-visa-details")) {
    const inner = slug.slice(0, -"-visa-details".length);
    for (const vt of VISA_TYPES_EXTENDED) {
      const withoutType = inner.replace(`-${vt}`, "").replace(`${vt}-`, "");
      if (COUNTRY_SLUGS.includes(withoutType)) {
        const country = COUNTRIES_EXTENDED.find((c) => c.slug === withoutType)!;
        return { pageType: "details", countrySlug: withoutType, visaType: vt, countryName: country.name };
      }
    }
  }

  return null;
}

/** Generate all valid slugs for static generation */
export function generateAllProgrammaticSlugs(): string[] {
  const slugs: string[] = [];
  for (const country of COUNTRIES_EXTENDED) {
    // Pattern 1: country hub
    slugs.push(`${country.slug}-visa-info`);
    // Patterns 2-4: per visa type
    for (const vt of VISA_TYPES_EXTENDED) {
      slugs.push(`apply-${country.slug}-${vt}-visa`);
      slugs.push(`how-to-apply-${country.slug}-${vt}-visa`);
      slugs.push(`${country.slug}-${vt}-visa-details`);
    }
  }
  return slugs;
}
