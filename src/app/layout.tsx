import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TRIANYAA — Handmade Crochet & Yarn Craft Brand",
  description:
    "Explore TRIANYAA's cozy collection of handmade crochet keychains, organic yarn skeins, starter craft kits, and pattern tutorials. Made with love, one stitch at a time.",
  keywords: [
    "crochet",
    "yarn craft",
    "handmade keychains",
    "crochet kits",
    "TRIANYAA",
    "yarn store",
    "craft supplies",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen font-sans bg-[#FDFBF7] text-[#2C3531] selection:bg-[#F7D6D0] selection:text-[#1E3A2B]">
        {children}
      </body>
    </html>
  );
}

