import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Maitama Luxury Mansion Steel Roofing Project | Light Gauge Steel Trusses Abuja | Pristiq Build",
  description:
    "Discover how Pristiq Build delivered a precision engineered Light Gauge Steel roofing system for a luxury mansion in Maitama, Abuja. Completed in just 4 days with superior durability and 60% faster installation than traditional timber trusses.",
  keywords: [
    "light gauge steel roofing Abuja",
    "LGS trusses Nigeria",
    "steel roofing Maitama",
    "luxury home roofing Nigeria",
    "prefabricated steel trusses",
    "termite resistant roofing",
    "fast roof installation Abuja",
    "galvanized steel roof",
    "modular roofing system",
    "Pristiq Build projects",
    "EMBEE Grand Realty",
    "Colorado Street Maitama",
  ],
  openGraph: {
    title: "Maitama Luxury Mansion Steel Roofing | Pristiq Build",
    description:
      "Premium Light Gauge Steel roofing project completed in 4 days for a luxury residence in Maitama, Abuja.",
    images: ["/maitama/dji_fly_20250305_140920_676_1741180573389_photo.jpg"],
    type: "article",
  },
};

export default function MaitamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
