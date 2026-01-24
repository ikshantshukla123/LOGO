"use client";
import { Suspense } from "react";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import NavigationSkeleton from "@/components/nav/NavigationSkeleton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import GlobalAuthModal from "@/components/auth/GlobalAuthModal";

export default function StoreFrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen text-white">
      <Suspense fallback={<NavigationSkeleton />}>
        <Navbar />
      </Suspense>

      {/* Removed pt-4 to allow Hero section to touch the navbar */}
      <main>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <LoadingSpinner />
          </div>
        }>
          {children}
        </Suspense>
      </main>

      <Footer />
      <GlobalAuthModal />
    </div>
  );
}