import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HighLevelTracking } from "@/components/layout/HighLevelTracking";
import { JsonLd } from "@/components/layout/JsonLd";
import { SkipLink } from "@/components/ui/SkipLink";
import { site } from "@/config/site";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${site.name} | ${site.motto}`,
    template: `%s | ${site.name}`,
  },
  description: site.mission,
  applicationName: site.name,
  authors: [{ name: site.pastorName }],
  keywords: [
    "Donald Mayes Ministries",
    "Pastor Donald Mayes",
    "Loving Everyone Always",
    "practical biblical living",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    title: `${site.name} | ${site.motto}`,
    description: site.mission,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.motto}`,
    description: site.mission,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#183A32",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ivory font-sans text-ink antialiased">
        <SkipLink />
        <JsonLd />
        <Header />
        {children}
        <Footer />
        <HighLevelTracking />
      </body>
    </html>
  );
}
