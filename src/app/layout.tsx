import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/layout/JsonLd";
import { SkipLink } from "@/components/ui/SkipLink";
import { site } from "@/config/site";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-source-serif",
  display: "swap",
});

const meta = Jost({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-jost",
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
  themeColor: "#f6f1e7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${meta.variable}`}
    >
      <body className="min-h-screen font-serif">
        <SkipLink />
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
