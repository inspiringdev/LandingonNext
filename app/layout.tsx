import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura Roasters — Specialty Coffee",
  description:
    "Small-batch, single-origin coffee roasted with intention. Three-time SCA award winners. Order online or visit us in Portland, Seattle, and San Francisco.",
  keywords: ["specialty coffee", "artisan coffee", "pour over", "espresso", "cold brew", "Portland coffee"],
  openGraph: {
    title: "Aura Roasters — Specialty Coffee",
    description: "Awaken your senses with small-batch, single-origin coffee roasted with intention.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#1C1917",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
