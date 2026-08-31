import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team | PristiqBuild - Meet Our Expert Leadership",
  description:
    "Meet the visionary leaders and expert professionals driving PristiqBuild's mission to revolutionize Nigeria's construction industry through innovation and excellence.",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
