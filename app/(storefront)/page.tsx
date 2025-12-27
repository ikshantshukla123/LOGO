import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/products/ProductCard";
import { Suspense } from "react";
import LoadingProducts from "@/components/ui/LoadingProducts";
import { ArrowRight } from "lucide-react"; // Make sure to install lucide-react

export const revalidate = 60;

// 1. Clean Data Fetching
async function FeaturedProducts() {
  const featuredProducts = await prisma.product.findMany({
    take: 8,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
    },
  });

  if (featuredProducts.length === 0) {
    return <div className="text-white text-center py-20">Coming Soon</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {featuredProducts.map((product) => {
        // --- FIX IS HERE ---
        // Create a new object that matches ProductCard's strict requirements
        const formattedProduct = {
          id: product.id,
          name: product.name,
          images: product.images,
          // 1. If description is null, use an empty string ""
          description: product.description || "",
          // 2. Ensure price is a number (handles Prisma Decimals)
          price: Number(product.price),
        };

        return (
          <ProductCard key={product.id} product={formattedProduct} />
        );
      })}
    </div>
  );
}
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      
      {/* SECTION 1: HERO BANNER (Full Width, Impactful) */}
      <section className="relative h-[85vh] w-full bg-zinc-900 overflow-hidden">
        {/* Placeholder for Hero Image - Use a high quality, dark/moody image */}
        <Image
          src="/images/models/modelone.jpeg" // Make sure this is a wide, high-res image
          alt="Hero"
          fill
          className="object-cover opacity-60" 
          priority
        />
        
        {/* Text Overlay - Centered and Clean */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h2 className="text-sm md:text-base tracking-[0.2em] text-zinc-300 uppercase mb-4">
            New Collection 2024
          </h2>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-8 uppercase">
            Streetwear<br />Redefined
          </h1>
          <div className="flex gap-4">
            <Link
              href="/products"
              className="bg-white text-black px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-zinc-200 transition-colors"
            >
              Shop Men
            </Link>
            <Link
              href="/custom"
              className="border border-white text-white px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-black transition-colors"
            >
              Customize
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: CATEGORY TEASERS (Simple Grid) */}
      <section className="max-w-7xl mx-auto px-4 py-20 border-b border-zinc-900">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link href="/products?category=oversized" className="group block relative h-[400px] overflow-hidden bg-zinc-900">
            <Image 
               src="/images/tshirts/one.jpeg" 
               alt="Oversized" 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
            />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold uppercase">Oversized Fits</h3>
              <span className="text-xs text-zinc-300 border-b border-zinc-500 pb-1">Shop Now</span>
            </div>
          </Link>
          
          {/* Card 2 */}
          <Link href="/custom" className="group block relative h-[400px] overflow-hidden bg-zinc-900">
             <Image 
               src="/images/models/modaltwo.jpeg" 
               alt="Custom" 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
            />
             <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold uppercase">Design Your Own</h3>
              <span className="text-xs text-zinc-300 border-b border-zinc-500 pb-1">Start Creating</span>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/products?category=essentials" className="group block relative h-[400px] overflow-hidden bg-zinc-900">
            <Image 
               src="/images/tshirts/two.jpeg" 
               alt="Essentials" 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" 
            />
             <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold uppercase">Essentials</h3>
              <span className="text-xs text-zinc-300 border-b border-zinc-500 pb-1">View Collection</span>
            </div>
          </Link>
        </div>
      </section>

      {/* SECTION 3: NEW ARRIVALS (The Product Grid) */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide">New Arrivals</h2>
            <p className="text-zinc-400 text-sm mt-2">The latest drops from our studio.</p>
          </div>
          <Link href="/products" className="hidden md:flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Suspense fallback={<LoadingProducts />}>
          <FeaturedProducts />
        </Suspense>
        
        <div className="mt-12 text-center md:hidden">
           <Link href="/products" className="inline-block border border-zinc-800 px-8 py-3 text-sm uppercase tracking-wide hover:bg-white hover:text-black transition-colors">
            View All Products
          </Link>
        </div>
      </section>

      {/* SECTION 4: PROMOTIONAL BANNER (Like the reference image) */}
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
            <Link href="/products" className="inline-block bg-white text-black px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                Shop The Bundle
            </Link>
        </div>
      </section>

    </div>
  );
}