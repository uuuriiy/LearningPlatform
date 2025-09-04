import { HeroSection } from "@/components/home/HeroSection";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { PricingSection } from "@/components/home/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <HeroSection />
        
        <BenefitsSection />

        <PricingSection />
      </main>
    </div>
  );
}
