// components/cart/EmptyCart.tsx
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import Button from "@/components/shared/Button";

export default function EmptyCart() {
  return (
    <div className="min-h-[80vh] bg-black text-white flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-8 h-8 text-zinc-500" />
      </div>
      <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Your Bag is Empty</h1>
      <p className="text-zinc-500 mb-8 max-w-md">
        Looks like you haven't added anything to your cart yet.
      </p>
      <Link href="/products">
        <Button variant="primary" size="lg">
          Start Shopping
        </Button>
      </Link>
    </div>
  );
}
