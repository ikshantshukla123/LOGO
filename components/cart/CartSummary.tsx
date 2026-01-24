// components/cart/CartSummary.tsx
"use client";

import Link from "next/link";
import Button from "@/components/shared/Button";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

export default function CartSummary({ subtotal, tax, total }: CartSummaryProps) {
  return (
    <div className="lg:col-span-4">
      <div className="sticky top-24 bg-zinc-900 border border-zinc-800 p-8 space-y-6">
        <h2 className="text-xl font-bold uppercase tracking-wide">Order Summary</h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-400">Subtotal</span>
            <span className="text-white">₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Tax (18%)</span>
            <span className="text-white">₹{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-400">Shipping</span>
            <span className="text-green-500">FREE</span>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        <Link href="/checkout" className="block">
          <Button variant="primary" size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>

        <Link href="/products" className="block">
          <Button variant="ghost" size="md" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
