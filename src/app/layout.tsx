import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";
import Analytics from "@/components/Analytics";

// Body face. Reads better than Inter at small sizes on mid-range Android,
// which is most of this audience, and its slightly humanist shapes give the
// geometric display face something to contrast against.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
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
  // Tells the browser which form controls, scrollbars and system UI to
  // render. The site is light-only today, so it says so explicitly rather
  // than leaving the UA to guess.
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* next/font self-hosts the faces, so there is no font CDN to reach.
            These cover the Google Maps embed on /contact, which otherwise
            pays full DNS, TCP and TLS cost on first paint. */}
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="" />
        <StructuredData />
        <Analytics />
      </head>
      <body
        className={`${plexSans.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
