import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "Digital Desire — Passez au niveau supérieur",
  description:
    "Une formation complète en ligne, des exercices pratiques et un accompagnement personnalisé pour atteindre vos objectifs.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${outfit.variable} ${playfair.variable} font-sans antialiased min-h-screen`}>
        <div className="site-bg" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
