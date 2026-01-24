// components/product/ProductGrid.tsx
import ProductCard from "./ProductCard";
import { ProductListItem } from "@/lib/api/products";

interface ProductGridProps {
  products: ProductListItem[];
  emptyMessage?: string;
}

export default function ProductGrid({ products, emptyMessage }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
          <span className="text-2xl">🧥</span>
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
          No Products Found
        </h3>
        <p className="text-zinc-500 max-w-sm">
          {emptyMessage || "We are currently updating our collection. Please check back later."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-10 border-b border-zinc-900 pb-4">
        <h2 className="text-xl font-bold uppercase tracking-widest text-white">All Products</h2>
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
          {products.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
