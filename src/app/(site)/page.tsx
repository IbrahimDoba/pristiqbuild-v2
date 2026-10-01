import HeroLGS from "@/components/HeroLGS";
import CoreValues from "@/components/CoreValues";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import ModularTeaser from "@/components/ModularTeaser";
import About from "@/components/About";
import HomeCTA from "@/components/HomeCTA";

export default function Home() {
  return (
    <>
      <HeroLGS />
      <CoreValues />
      <Process />
      <Projects />
      <ModularTeaser />
      <About />
      <HomeCTA />
    </>
  );
}
