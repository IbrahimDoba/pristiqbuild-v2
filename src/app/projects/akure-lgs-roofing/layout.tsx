import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Akure Castle Style Residence LGS Roofing | Large Scale Steel Roof Project | Pristiq Build",
  description:
    "Explore Pristiq Build's largest Light Gauge Steel roofing project in Akure, Ondo State. Over 1080 square meters of precision engineered steel roofing for a castle style residence with 75% waste reduction and record completion time.",
  keywords: [
    "LGS roofing Akure",
    "steel roof Ondo State",
    "large scale roofing Nigeria",
    "light gauge steel castle",
    "precision steel roofing",
    "diaspora construction Nigeria",
    "galvanized steel roof",
    "G550 steel roofing",
    "prefabricated roof system",
    "termite proof roofing",
    "Pristiq Build Akure",
    "1000 sqm roof project",
  ],
  openGraph: {
    title: "Akure Castle Style Residence LGS Roofing | Pristiq Build",
    description:
      "1080 sqm Light Gauge Steel roofing project showcasing large scale precision engineering in Ondo State.",
    images: ["/osun/osun1.jpg"],
    type: "article",
  },
};

export default function AkureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
