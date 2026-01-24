// components/cart/CartList.tsx
"use client";

import CartItem from "./CartItem";
import { CartItem as CartItemType } from "@/store/cartStore";

interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  onClearCart: () => Promise<void>;
  isLoading: boolean;
}

export default function CartList({
  items,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  isLoading,
}: CartListProps) {
  return (
    <div className="lg:col-span-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wide">
          Shopping Bag ({items.length} Items)
        </h2>
        <button
          onClick={onClearCart}
          className="text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          disabled={isLoading}
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-0 divide-y divide-zinc-900 border-t border-b border-zinc-900">
        {items.map((item) => (
          <CartItem
            key={`${item.id}-${item.size}`}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
}
