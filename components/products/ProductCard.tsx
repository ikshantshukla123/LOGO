import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block relative">
      {/* IMAGE CONTAINER - 3:4 Aspect Ratio (Standard for Fashion) */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-900 rounded-sm">
        
        {/* Main Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Optional: Overlay Gradient for better text readability if needed */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        {/* 'Quick Add' Button - Slides up on hover */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
           <button className="w-full bg-white text-black py-3 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors shadow-lg">
              Quick Add
           </button>
        </div>

        {/* New Badge (Static for now, can be dynamic later) */}
        <div className="absolute top-3 left-3">
           <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider border border-white/10">
              New
           </span>
        </div>
      </div>

      {/* TEXT DETAILS - Clean and Minimal */}
      <div className="mt-4 flex flex-col gap-1">
        <div className="flex justify-between items-start">
            <h3 className="text-sm text-zinc-100 font-medium truncate pr-4">
              {product.name}
            </h3>
            <span className="text-sm font-semibold text-white">
              ${product.price}
            </span>
        </div>
        <p className="text-xs text-zinc-500 uppercase tracking-wide line-clamp-1">
           {/* Fallback to 'T-Shirt' if no category/description provided */}
           Heavyweight Cotton
        </p>
      </div>
    </Link>
  );
}