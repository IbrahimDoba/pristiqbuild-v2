import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title:
    "Aso Grove Estate Roof Replacement | Timber to LGS Conversion | Pristiq Build",
  description:
    "Discover how Pristiq Build transformed an aging timber roof into a modern Light Gauge Steel system in just 72 hours at Aso Grove Estate, Abuja. Complete roof replacement with waterproofing and improved thermal performance.",
  keywords: [
    "roof replacement Abuja",
    "timber to steel roof conversion",
    "LGS roof renovation",
    "Aso Grove Estate roofing",
    "polyurethane waterproofing roof",
    "G550 steel roofing",
    "72 hour roof installation",
    "residential roof upgrade Nigeria",
    "light gauge steel replacement",
    "thermal roof improvement",
    "Pristiq Build renovation",
    "fast roof replacement",
  ],
  openGraph: {
    title: "Aso Grove Estate Roof Replacement | Pristiq Build",
    description:
      "Complete timber to LGS roof conversion in 72 hours with waterproofing at Aso Grove Estate, Abuja.",
    images: ["/aso/aso1.JPG"],
    type: "article",
  },
};

export default function AsoGroveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        id="project-breadcrumb"
        data={breadcrumbSchema([
          { name: "Projects", path: "/#projects" },
          { name: "Aso Grove Roof", path: "/projects/aso-grove-roofing" },
        ])}
      />
      {children}
    </>
  );
}
