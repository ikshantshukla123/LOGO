// components/home/HeroSection.tsx
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/shared/Button";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] w-full bg-zinc-900 overflow-hidden">
      {/* Hero Image */}
      <Image
        src="/images/models/modelone.jpeg"
        alt="Hero"
        fill
        className="object-cover opacity-60"
        priority
      />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-sm md:text-base tracking-[0.2em] text-zinc-300 uppercase mb-4">
          New Collection 2024
        </h2>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8 uppercase">
          Streetwear
          <br />
          Redefined
        </h1>
        <div className="flex gap-4">
          <Link href="/products">
            <Button variant="primary">Shop Men</Button>
          </Link>
          <Link href="/custom">
            <Button variant="outline">Customize</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
