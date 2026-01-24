import { Suspense } from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoSection from "@/components/home/PromoSection";
import LoadingProducts from "@/components/ui/LoadingProducts";

// ISR: Revalidate every hour
export const revalidate = 3600;

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection />
      <CategoryGrid />
      <Suspense fallback={<LoadingProducts />}>
        <FeaturedProducts />
      </Suspense>
      <PromoSection />
    </div>
  );
}