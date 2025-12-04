"use client";

import Navbar from "@/components/nav/Navbar";

export default function StoreFrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="pt-4">{children}</main>
    </div>
  );
}
