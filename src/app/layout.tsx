import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pristiqbuild.com"),
  title: {
    default: "PristiqBuild | Nigeria's Leading Modular Construction Innovator",
    template: "%s | PristiqBuild",
  },
  description:
    "Building Nigeria's future, one module at a time. PristiqBuild delivers precision, sustainability, and cutting-edge technology in modular construction using light steel gauge framing.",
  keywords: [
    "modular construction",
    "Nigeria construction",
    "light steel gauge",
    "prefabricated buildings",
    "sustainable construction",
    "affordable housing Nigeria",
    "PristiqBuild",
    "construction technology",
    "VR construction",
    "smart building",
    "Abuja construction company",
    "Lagos construction",
    "steel frame construction",
    "green building Nigeria",
    "fast construction Nigeria",
  ],
  authors: [{ name: "PristiqBuild" }],
  creator: "PristiqBuild",
  publisher: "PristiqBuild",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: "construction",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.pristiqbuild.com",
    siteName: "PristiqBuild",
    title: "PristiqBuild | Nigeria's Leading Modular Construction Innovator",
    description:
      "Building Nigeria's future, one module at a time. Precision, sustainability, and cutting-edge technology in modular construction.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PristiqBuild - Modular Construction Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PristiqBuild | Nigeria's Leading Modular Construction Innovator",
    description:
      "Building Nigeria's future, one module at a time. Precision, sustainability, and cutting-edge technology in modular construction.",
    images: ["/og-image.jpg"],
    creator: "@pristiqbuild",
  },
  alternates: {
    canonical: "https://www.pristiqbuild.com",
  },
  verification: {
    // Add these when you get verification codes from Google/Bing
    // google: 'your-google-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1A5F7A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <StructuredData />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
