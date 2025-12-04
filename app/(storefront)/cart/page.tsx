"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const clearCart = useCartStore((state) => state.clearCart);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl font-medium text-zinc-600 dark:text-zinc-300">
            Your cart is empty
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Shop Products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-12">
          {/* LEFT — CART ITEMS */}
          <div className="md:col-span-2 space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 p-4 border border-zinc-300 dark:border-zinc-700 rounded-xl"
              >
                {/* Product Image */}
                <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-lg text-blue-600">₹{item.price}</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4 mt-2">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm mt-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <div className="p-6 border border-zinc-300 dark:border-zinc-700 rounded-xl h-fit">
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between text-lg mb-4">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between text-lg mb-4">
              <span>Shipping</span>
              <span className="text-green-500">Free</span>
            </div>

            <hr className="my-4 border-zinc-300 dark:border-zinc-700" />

            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button className="w-full py-3 bg-black text-white dark:bg-white dark:text-black rounded-full text-lg hover:opacity-90 transition">
              Checkout
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-4 text-red-500 hover:text-red-700 text-sm"
            >
              Clear Cart
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
