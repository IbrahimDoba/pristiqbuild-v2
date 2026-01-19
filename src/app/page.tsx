import Navigation from "@/components/Navigation";
import HeroLGS from "@/components/HeroLGS";
import CoreValues from "@/components/CoreValues";
// import Services from "@/components/Services"; // Removed from homepage
// import Technology from "@/components/Technology"; // Moved to separate page
import Process from "@/components/Process";
// import WhyModular from "@/components/WhyModular"; // Moved to separate page
import Projects from "@/components/Projects";
import About from "@/components/About";
// import Contact from "@/components/Contact"; // Moved to separate page
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroLGS />
        <CoreValues />
        {/* <Services /> - Removed from homepage */}
        {/* <Technology /> - Moved to separate page */}
        <Process />
        {/* <WhyModular /> - Moved to separate page */}
        <Projects />
        <About />
        {/* <Contact /> - Moved to separate page */}
      </main>
      <Footer />
    </>
  );
}
