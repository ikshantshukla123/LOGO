"use client";

import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils"; //  use template literals if you don't have this

export default function CartPage() {
 
  const { items, removeItem, updateQuantity, clearCart, isLoading } = useCartStore();

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% Tax example
  const total = subtotal + tax;

  //  EMPTY STATE (Professional Look)
  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] bg-black text-white flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-8 h-8 text-zinc-500" />
        </div>
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-4">Your Bag is Empty</h1>
        <p className="text-zinc-500 mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          href="/products"
          className="bg-white text-black px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-12 text-center md:text-left">
          Shopping Bag <span className="text-zinc-500 text-lg ml-2">({items.length} Items)</span>
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: CART ITEMS LIST */}
          <div className="lg:col-span-8 space-y-0 divide-y divide-zinc-900 border-t border-b border-zinc-900">
            {items.map((item) => (
              <div key={`${item.id}-${item.size}`} className="py-8 flex gap-6 md:gap-8">
                
                {/* Product Image (3:4 Ratio) */}
                <div className="relative w-24 h-32 md:w-32 md:h-44 flex-shrink-0 bg-zinc-900 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg uppercase tracking-wide">{item.name}</h3>
                      {item.size && (
                        <p className="text-xs text-zinc-400 uppercase tracking-widest">
                          Size: <span className="text-white">{item.size}</span>
                        </p>
                      )}
                      <p className="text-xs text-zinc-400 uppercase tracking-widest">
                        Price: <span className="text-white">₹{item.price}</span>
                      </p>
                    </div>
                    
                    {/* Price (Desktop) */}
                    <div className="hidden md:block font-medium">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>

                  {/* Controls Row */}
                  <div className="flex items-center justify-between mt-4 md:mt-0">
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-zinc-800 h-10 w-fit">
                      <button
                        // 3. FIX: Use updateQuantity directly
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-full flex items-center justify-center hover:bg-zinc-900 transition-colors"
                        disabled={isLoading}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 h-full flex items-center justify-center text-sm font-medium border-x border-zinc-800">
                        {item.quantity}
                      </span>
                      <button
                        // 3. FIX: Use updateQuantity directly
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-full flex items-center justify-center hover:bg-zinc-900 transition-colors"
                        disabled={isLoading}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-zinc-500 hover:text-red-500 uppercase tracking-wider flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden md:inline">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Clear Cart Button */}
            <div className="py-6">
                <button 
                    onClick={clearCart} 
                    className="text-xs text-red-500 hover:text-red-400 uppercase tracking-widest font-bold"
                >
                    Clear Shopping Bag
                </button>
            </div>
          </div>

          {/* RIGHT: SUMMARY (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 bg-zinc-900/50 border border-zinc-800 p-8 space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wide">Order Summary</h2>
              
              <div className="space-y-4 text-sm text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax (18%)</span>
                  <span className="text-white">₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-500 uppercase text-xs font-bold tracking-wider">Free</span>
                </div>
              </div>

              <div className="border-t border-zinc-800 pt-6">
                <div className="flex justify-between items-end mb-6">
                  <span className="text-sm font-bold uppercase tracking-wide text-white">Total</span>
                  <span className="text-2xl font-bold text-white">₹{total.toFixed(0)}</span>
                </div>

                <button className="w-full bg-white text-black h-14 font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 group">
                  Checkout
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-[10px] text-zinc-500 text-center mt-4 uppercase tracking-wider">
                  Secure Checkout • Free Returns
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}