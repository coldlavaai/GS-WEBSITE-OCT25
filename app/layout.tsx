import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider';
import SophieChat from '@/components/SophieChat';
import CookieConsent from '@/components/CookieConsent';
import Analytics from '@/components/Analytics';
import { StructuredData } from '@/components/StructuredData';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Greenstar Solar - Premium Solar Panel and Battery Storage Solutions UK",
  description: "Leading UK solar energy company. Expert installation of solar panels and battery storage for homes and businesses. Get your free survey today.",
  metadataBase: new URL("https://greenstarsolar.co.uk"),
  openGraph: {
    title: "Greenstar Solar - Premium Solar Panel and Battery Storage Solutions UK",
    description: "Leading UK solar energy company. Expert installation of solar panels and battery storage for homes and businesses. Get your free survey today.",
    url: "https://greenstarsolar.co.uk",
    siteName: "Greenstar Solar",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Greenstar Solar - Premium Solar Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenstar Solar - Premium Solar Panel and Battery Storage Solutions UK",
    description: "Leading UK solar energy company. Expert installation of solar panels and battery storage for homes and businesses. Get your free survey today.",
    images: ["/og-image.png"],
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <StructuredData />
        <ThemeProvider>
          {children}
          <SophieChat />
          <CookieConsent />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
