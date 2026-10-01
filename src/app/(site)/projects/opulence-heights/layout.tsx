import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Opulence Heights, Dawaki Hillside, Abuja",
  description:
    "18 villas, 5 ensuite bedrooms plus BQ each, developed in joint venture with EFAB Properties. Phase 1 at foundation stage with a 12-month delivery target.",
  alternates: { canonical: "/projects/opulence-heights" },
  openGraph: {
    title: "Opulence Heights, Dawaki Hillside, Abuja",
    description:
      "18 villas, 5 ensuite bedrooms plus BQ each. A PristiqBuild and EFAB Properties joint venture, now at foundation stage.",
    images: ["/dawaki estate/1.png"],
    type: "article",
  },
};

export default function OpulenceHeightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd
        id="project-breadcrumb"
        data={breadcrumbSchema([
          { name: "Projects", path: "/projects" },
          { name: "Opulence Heights", path: "/projects/opulence-heights" },
        ])}
      />
      {children}
    </>
  );
}
