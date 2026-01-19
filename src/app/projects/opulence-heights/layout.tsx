import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Opulence Heights Dawaki | Nigeria's First Smart Steel Residential Estate | Pristiq Build",
  description:
    "Discover Opulence Heights in Dawaki Hillside, Abuja. Nigeria's first precision built steel frame smart villas featuring solar power, EV charging, home automation, and 50 plus year structural frames. 18 luxury villas by EFAB Properties and Pristiq Build.",
  keywords: [
    "Opulence Heights Dawaki",
    "smart homes Nigeria",
    "steel frame villas Abuja",
    "solar powered homes Nigeria",
    "EV charging homes Abuja",
    "luxury villas Dawaki",
    "EFAB Properties",
    "Pristiq Build smart homes",
    "light gauge steel homes",
    "automated homes Nigeria",
    "sustainable housing Abuja",
    "premium real estate FCT",
    "5 bedroom villa Abuja",
    "hillside homes Nigeria",
  ],
  openGraph: {
    title: "Opulence Heights | Nigeria's First Smart Steel Residential Estate",
    description:
      "18 luxury smart villas with steel frame construction, solar power, and home automation in Dawaki Hillside, Abuja.",
    images: ["/dawaki estate/1.png"],
    type: "article",
  },
};

export default function OpulenceHeightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
