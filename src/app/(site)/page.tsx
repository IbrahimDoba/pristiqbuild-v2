import HeroLGS from "@/components/HeroLGS";
import CoreValues from "@/components/CoreValues";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import ModularTeaser from "@/components/ModularTeaser";
import About from "@/components/About";
import HomeCTA from "@/components/HomeCTA";
import { getFeaturedPortfolio } from "@/lib/portfolio";

// The projects strip comes from /admin/portfolio. Cached, rebuilt at most
// hourly and immediately whenever an entry is saved.
export const revalidate = 3600;

export default async function Home() {
  const featured = await getFeaturedPortfolio();

  return (
    <>
      <HeroLGS />
      <CoreValues />
      <Process />
      <Projects items={featured} />
      <ModularTeaser />
      <About />
      <HomeCTA />
    </>
  );
}
