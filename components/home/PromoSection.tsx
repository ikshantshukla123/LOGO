// components/home/PromoSection.tsx
import Link from "next/link";
import Button from "@/components/shared/Button";

export default function PromoSection() {
  return (
    <section className="relative py-32 bg-zinc-900 border-y border-zinc-800 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {/* Optional Pattern or Texture here */}
      </div>
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <span className="inline-block py-1 px-3 border border-zinc-700 rounded-full text-xs text-zinc-300 mb-6 uppercase tracking-wider">
          Limited Offer
        </span>
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
          Buy 3 Get <span className="text-zinc-500">15% Off</span>
        </h2>
        <p className="text-zinc-400 max-w-xl mx-auto mb-10 text-lg">
          Upgrade your wardrobe with our premium heavyweight cotton tees. Mix and match styles.
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Shop The Bundle
          </Button>
        </Link>
      </div>
    </section>
  );
}
