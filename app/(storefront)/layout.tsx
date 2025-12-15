"use client";
import { Suspense } from "react";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/nav/Navbar";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import NavigationSkeleton from "@/components/nav/NavigationSkeleton";

export default function StoreFrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Suspense for Navbar with skeleton fallback */}
      <Suspense fallback={<NavigationSkeleton />}>
        <Navbar />
      </Suspense>
      
      <main className="pt-4">
        {/* Suspense for page content */}
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner />
          </div>
        }>
          {children}
        </Suspense>
      </main>
      
      {/* Footer doesn't usually need Suspense as it's static */}
      <Footer />
    </div>
  );
}