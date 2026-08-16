import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { JsonLd } from "@/components/layout/JsonLd";
import { SkipLink } from "@/components/ui/SkipLink";
import { site } from "@/config/site";
import { getMetadataBase } from "@/lib/site-url";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
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
  themeColor: "#f6f1e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <SkipLink />
        <JsonLd />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
