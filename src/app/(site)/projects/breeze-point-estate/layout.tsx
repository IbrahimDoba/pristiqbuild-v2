import { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Breeze Point Estate, Kubwa, Abuja",
  description:
    "Five terrace duplexes in Kubwa, Abuja, developed in joint venture with the landowner using conventional construction. Nearing completion.",
  alternates: { canonical: "/projects/breeze-point-estate" },
  openGraph: {
    title: "Breeze Point Estate, Kubwa, Abuja",
    description:
      "Five terrace duplexes in Kubwa, built conventionally in joint venture with the landowner. Nearing completion.",
    images: ["/breezepoint/breeze1.jpg"],
    type: "article",
  },
};

export default function BreezePointLayout({
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
          { name: "Breeze Point Estate", path: "/projects/breeze-point-estate" },
        ])}
      />
      {children}
    </>
  );
}
