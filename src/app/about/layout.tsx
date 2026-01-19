import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About Us | PristiqBuild - Nigeria's Modular Construction Leader",
  description:
    "Learn about PristiqBuild's journey to becoming Nigeria's premier modular construction company. Discover our mission, values, and commitment to revolutionizing the construction industry.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
