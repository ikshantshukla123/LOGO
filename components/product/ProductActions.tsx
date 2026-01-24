// components/product/ProductActions.tsx
"use client";

import Button from "@/components/shared/Button";

interface ProductActionsProps {
  onAddToCart: () => void;
  onBuyNow: () => void;
  isLoading?: boolean;
}

export default function ProductActions({
  onAddToCart,
  onBuyNow,
  isLoading = false,
}: ProductActionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <button
          onClick={onAddToCart}
          disabled={isLoading}
          className="w-full h-14 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add to Bag"}
        </button>

        <button
          onClick={onBuyNow}
          disabled={isLoading}
          className="w-full h-14 bg-transparent border border-zinc-800 text-white font-bold uppercase tracking-widest hover:bg-zinc-900 hover:border-white transition-colors disabled:opacity-50"
        >
          Buy Now
        </button>
      </div>

      <p className="text-xs text-center text-zinc-500 uppercase tracking-wider">
        Free shipping on orders over ₹2000
      </p>
    </div>
  );
}
