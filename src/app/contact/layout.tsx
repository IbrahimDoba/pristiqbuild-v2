import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | PristiqBuild - Get Your Free Construction Quote",
  description:
    "Contact PristiqBuild for your modular construction needs. Get a free quote, schedule a consultation, or visit our showroom in Abuja. Available Mon-Fri 8am-6pm.",
};

export default function ContactLayout({
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
