import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import "./prose.css";
import { site } from "@/lib/site";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { organizationSchema, webSiteSchema } from "@/lib/schema";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.defaultTitleSuffix}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: site.url },
  icons: {
    icon: "/icons/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: site.locale,
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Home Storage Guide — exact shelf lives for 300+ foods" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2E7D4F",
};

/** GA4 measurement ID, read from the environment. Omitted from the build when unset. */
const ga4Id = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

function Analytics() {
  if (!ga4Id) return null;
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4Id}');`,
        }}
      />
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationSchema(), webSiteSchema()];
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="sr-only z-50 rounded-control bg-brand-green-600 px-4 py-2 font-semibold text-brand-paper focus:not-sr-only focus:absolute focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
