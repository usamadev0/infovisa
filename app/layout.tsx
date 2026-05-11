import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { websiteSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: {
    template: "%s | Global Visa Guide Hub",
    default: "Global Visa Guide Hub — Visa & Immigration Guides Worldwide",
  },
  description:
    "Comprehensive visa and immigration guides for students, workers, tourists, and immigrants. Country-specific requirements, step-by-step processes, and expert tips for 15+ countries.",
  keywords: [
    "visa guide",
    "immigration guide",
    "study visa",
    "work visa",
    "tourist visa",
    "permanent residency",
    "visa requirements 2026",
  ],
  metadataBase: new URL("https://www.visaprocessinfo.com"),
  openGraph: {
    siteName: "Global Visa Guide Hub",
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
        {/* AdSense script — replace ca-pub-XXXXXXXXXXXXXXXX with your publisher ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
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
