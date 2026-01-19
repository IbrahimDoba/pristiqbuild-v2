import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Breeze Point Estate Kubwa | Luxury Terrace Homes with LGS Roofing | Pristiq Build",
  description:
    "Discover Breeze Point Estate in F01 Kubwa, Abuja. Five luxury 4 bedroom terrace homes featuring Light Gauge Steel roofing, smart home infrastructure, and premium finishes. Under construction by Pristiq Build.",
  keywords: [
    "Breeze Point Estate Kubwa",
    "luxury terrace homes Abuja",
    "4 bedroom terrace F01",
    "LGS roofing residential",
    "smart homes Nigeria",
    "Pristiq Build development",
    "steel frame housing Abuja",
    "energy efficient homes Nigeria",
    "new construction Kubwa",
    "premium real estate Abuja",
    "terrace duplex for sale",
    "modern homes FCT",
  ],
  openGraph: {
    title: "Breeze Point Estate | Luxury Living in Kubwa, Abuja",
    description:
      "Exclusive 4 bedroom terrace homes with LGS roofing and smart home features in F01 Kubwa.",
    images: ["/LGS/construction.jpg"],
    type: "article",
  },
};

export default function BreezePointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
