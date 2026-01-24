// components/home/FeaturedProducts.tsx
import { getFeaturedProducts } from "@/lib/api/products";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts(8);

  if (products.length === 0) {
    return <div className="text-white text-center py-20">Coming Soon</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-2xl font-bold uppercase tracking-wide">New Arrivals</h2>
          <p className="text-zinc-400 text-sm mt-2">The latest drops from our studio.</p>
        </div>
        <Link
          href="/products"
          className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link
          href="/products"
          className="inline-block border border-zinc-800 px-8 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
