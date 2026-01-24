"use client";

import { useCartStore } from "@/store/cartStore";
import CartList from "@/components/cart/CartList";
import CartSummary from "@/components/cart/CartSummary";
import EmptyCart from "@/components/cart/EmptyCart";

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, isLoading } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-12 text-center md:text-left">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <CartList
            items={items}
            onUpdateQuantity={updateQuantity}
            onRemove={removeItem}
            onClearCart={clearCart}
            isLoading={isLoading}
          />

          <CartSummary subtotal={subtotal} tax={tax} total={total} />
        </div>
      </div>
    </div>
  );
}