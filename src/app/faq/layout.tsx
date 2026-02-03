import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | PristiqBuild - Modular Construction Questions Answered",
  description:
    "Find answers to frequently asked questions about modular construction, Light Steel Gauge framing, project timelines, costs, and how PristiqBuild delivers exceptional building solutions.",
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
