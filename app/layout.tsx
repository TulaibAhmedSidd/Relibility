import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { EngineeringDeskWidget } from "@/components/engineering-desk-widget";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/content/site.config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.company.website),
  title: {
    default: "Reliability Quality Solutions",
    template: "%s | Reliability Quality Solutions",
  },
  description: siteConfig.company.description,
  applicationName: siteConfig.company.name,
  keywords: [
    "reliability engineering",
    "quality engineering",
    "accelerated life testing",
    "FMEA",
    "product qualification",
    "supplier quality",
  ],
  authors: [{ name: siteConfig.company.name }],
  creator: siteConfig.company.name,
  publisher: siteConfig.company.name,
  openGraph: {
    title: siteConfig.company.name,
    description: siteConfig.company.description,
    siteName: siteConfig.company.name,
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.company.name,
    url: siteConfig.company.website,
    email: siteConfig.company.email,
    telephone: siteConfig.company.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: "7931 Morning Queen Drive",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89178",
      addressCountry: "US",
    },
    areaServed: "United States",
    description: siteConfig.company.description,
  };

  const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.company.founder.name,
    jobTitle: siteConfig.company.founder.role,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.company.name,
    },
    knowsAbout: [
      "Reliability engineering",
      "Quality engineering",
      "Product qualification",
      "Failure analysis",
      "Supplier quality engineering",
    ],
    subjectOf: siteConfig.company.founder.publications.map((publication) => ({
      "@type": "CreativeWork",
      name: publication,
    })),
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[var(--color-light)] text-slate-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
        />
        <div className="relative min-h-screen overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,194,255,0.14),transparent_28%),radial-gradient(circle_at_top_right,rgba(18,57,91,0.1),transparent_24%),linear-gradient(180deg,#ffffff,#f5f9fc_45%,#eef5fb)]" />
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(11,31,51,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,31,51,0.04)_1px,transparent_1px)] [background-size:36px_36px]" />
          <div className="relative z-10 flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </div>
        <EngineeringDeskWidget
          title={siteConfig.leadCapture.rapidResponseTitle}
          description={siteConfig.leadCapture.rapidResponseDescription}
          formTitle={siteConfig.leadCapture.formTitle}
          formDescription={siteConfig.leadCapture.formDescription}
          trustCallouts={siteConfig.leadCapture.trustCallouts}
          industryOptions={siteConfig.leadCapture.industryOptions}
        />
      </body>
    </html>
  );
}
