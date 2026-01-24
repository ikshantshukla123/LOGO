// components/product/SizeSelector.tsx
"use client";

import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  if (sizes.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-500 font-medium">
        <span>Select Size</span>
        <button className="underline hover:text-white">Size Guide</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={cn(
              "h-12 flex items-center justify-center text-sm font-medium transition-all border",
              selectedSize === size
                ? "bg-white text-black border-white"
                : "bg-transparent text-zinc-400 border-zinc-800 hover:border-zinc-500 hover:text-white"
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
