import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { websiteSchema, organizationSchema } from "@/lib/jsonld";
import { HOMEPAGE_KEYWORDS } from "@/lib/seo-keywords";

export const metadata: Metadata = {
  title: {
    template: "%s | VisaProcessInfo",
    default: "VisaProcessInfo — Visa & Immigration Guides for 131 Countries",
  },
  description:
    "Comprehensive visa and immigration guides for students, workers, tourists, and immigrants. Country-specific requirements, step-by-step processes, and expert tips for 131 countries — updated for 2026.",
  keywords: HOMEPAGE_KEYWORDS,
  metadataBase: new URL("https://www.visaprocessinfo.com"),
  verification: {
    google: "hnBXp2VAGXmFk2-f-7kfvH7Xd7jwZaT-RZcxxbdVZWs",
  },
  openGraph: {
    siteName: "VisaProcessInfo",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://flagcdn.com" />
        {/* AdSense script — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
