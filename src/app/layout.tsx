import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const siteUrl = "https://seniorsupportfinder.uk";
const siteName = "Senior Support Finder";
const siteDescription =
  "Find trusted council, charity and government support for older people, carers and families across the UK.";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: {
    default: "Senior Support Finder | Benefits, Care & Local Help",
    template: "%s | Senior Support Finder",
  },
  description: siteDescription,
  keywords: [
    "senior support UK",
    "older people benefits",
    "carer support",
    "adult social care",
    "Blue Badge",
    "home adaptations",
    "local council support",
    "Age UK local support",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName,
    title: "Senior Support Finder | Benefits, Care & Local Help",
    description: siteDescription,
    images: [
      {
        url: "/images/home-hero.png",
        width: 1774,
        height: 887,
        alt: "Older person and family carer talking together at home",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Support Finder | Benefits, Care & Local Help",
    description: siteDescription,
    images: ["/images/home-hero.png"],
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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  logo: `${siteUrl}/favicon.ico`,
  sameAs: [],
  description: siteDescription,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: siteDescription,
  inLanguage: "en-GB",
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/locations?query={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
