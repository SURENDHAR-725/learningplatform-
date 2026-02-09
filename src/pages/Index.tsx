import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { HeroSection, FeaturesSection, TrustedBySection, CTASection } from "@/components/landing/LandingSections";

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  useEffect(() => {
    // Smooth scroll behavior
    gsap.to(window, { scrollBehavior: "smooth" });

    // Refresh ScrollTrigger on resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
