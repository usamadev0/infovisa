import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Global Visa Guide Hub — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <h1 className="text-3xl font-bold text-primary-800 mb-6">Privacy Policy</h1>
      <div className="prose-article space-y-6 text-gray-700">
        <p>Last updated: January 2026</p>
        <p>
          Global Visa Guide Hub (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website.
        </p>
        <h2>Information We Collect</h2>
        <p>
          We collect non-personally identifiable information automatically when you visit our site, including your browser type, operating system, referring URLs, and pages visited. This data is collected through standard web analytics tools (such as Google Analytics) to help us understand how our content is used and to improve our service.
        </p>
        <h2>Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to enhance your browsing experience. Cookies help us remember your preferences and understand site traffic patterns. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>
        <h2>Google AdSense</h2>
        <p>
          We may display advertisements through Google AdSense. Google may use cookies to serve ads based on your visits to our site and other sites on the Internet. You may opt out of personalized advertising by visiting Google&apos;s Ad Settings page.
        </p>
        <h2>Third-Party Links</h2>
        <p>
          Our website contains links to third-party websites including official government immigration portals. We are not responsible for the privacy practices or content of those external sites.
        </p>
        <h2>Data Security</h2>
        <p>
          We implement reasonable security measures to protect against unauthorized access or alteration of information. However, no internet transmission is 100% secure.
        </p>
        <h2>Contact</h2>
        <p>
          If you have questions about this Privacy Policy, please contact us through our <a href="/contact" className="text-primary-700 underline">Contact page</a>.
        </p>
      </div>
    </div>
  );
}
