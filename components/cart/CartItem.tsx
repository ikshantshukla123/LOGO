// components/cart/CartItem.tsx
"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    size?: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
  isLoading: boolean;
}

export default function CartItem({ item, onUpdateQuantity, onRemove, isLoading }: CartItemProps) {
  return (
    <div className="py-8 flex gap-6 md:gap-8">
      {/* Product Image */}
      <div className="relative w-24 h-32 md:w-32 md:h-44 flex-shrink-0 bg-zinc-900 overflow-hidden">
        <Image src={item.image} alt={item.name} fill className="object-cover" />
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
          <div className="hidden md:block font-medium">₹{item.price * item.quantity}</div>
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between mt-4 md:mt-0">
          {/* Quantity Selector */}
          <div className="flex items-center border border-zinc-800 h-10 w-fit">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-10 h-full flex items-center justify-center hover:bg-zinc-900 transition-colors"
              disabled={isLoading}
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-10 h-full flex items-center justify-center text-sm font-medium border-x border-zinc-800">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-10 h-full flex items-center justify-center hover:bg-zinc-900 transition-colors"
              disabled={isLoading}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden md:inline">Remove</span>
          </button>
        </div>

        {/* Price (Mobile) */}
        <div className="md:hidden mt-2 font-medium">₹{item.price * item.quantity}</div>
      </div>
    </div>
  );
}
