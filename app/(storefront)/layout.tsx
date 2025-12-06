"use client";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/nav/Navbar";

export default function StoreFrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="pt-4">{children}</main>
      <Footer />
    </div>
  );
}
