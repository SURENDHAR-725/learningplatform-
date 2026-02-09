import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HeroSection, FeaturesSection, CTASection } from "@/components/landing/LandingSections";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </main>
    <Footer />
  </div>
);

export default Index;
