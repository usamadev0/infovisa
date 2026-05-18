import { redirect } from "next/navigation";
import { COUNTRIES_EXTENDED } from "@/data/countries-extended";

interface Props {
  params: Promise<{ country: string }>;
}

// Generate static params for all known country slugs so redirect pages are pre-built
export function generateStaticParams() {
  return COUNTRIES_EXTENDED.map((c) => ({ country: c.slug }));
}

export default async function CountryRedirectPage({ params }: Props) {
  const { country } = await params;
  // Permanent redirect to new programmatic SEO URL
  redirect(`/${country}-visa-info`);
}
