import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Sans } from "next/font/google";
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

// Display face, per the brand system.
const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pristiqbuild.com"),
  title: {
    default: "PristiqBuild | LGS Roofing & Steel-Frame Construction, Abuja",
    template: "%s | PristiqBuild",
  },
  description:
    "LGS roofing, steel-frame construction and modular buildings, delivered through engineering, fabrication and controlled site execution by a team based in Maitama, Abuja.",
  keywords: [
    "LGS roofing",
    "light gauge steel roofing Abuja",
    "steel roof trusses Nigeria",
    "steel-frame construction",
    "G550 steel",
    "Abuja construction company",
    "Maitama Abuja",
    "structural steel Abuja",
    "modular construction Nigeria",
    "Opulence Heights Dawaki",
    "PristiqBuild",
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
    title: "PristiqBuild | LGS Roofing & Steel-Frame Construction, Abuja",
    description:
      "Engineered LGS roofing and steel-frame construction, delivered through engineering, fabrication and controlled site execution by a team based in Maitama, Abuja.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PristiqBuild, LGS roofing and steel-frame construction in Abuja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PristiqBuild | LGS Roofing & Steel-Frame Construction, Abuja",
    description:
      "Engineered LGS roofing and steel-frame construction, delivered through engineering, fabrication and controlled site execution by a team based in Maitama, Abuja.",
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
  themeColor: "#24597A",
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
    <html lang="en" className={`scroll-smooth ${plexSans.variable} ${archivo.variable}`}>
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
        className="font-sans antialiased"
      >
        {children}
      </body>
    </html>
  );
}
