// components/product/ProductImageGallery.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-6">
      {/* Main Image */}
      <div className="relative aspect-[4/5] w-full bg-zinc-900 overflow-hidden">
        <Image
          src={activeImage || "/placeholder.jpg"}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={cn(
                "relative w-20 h-24 flex-shrink-0 bg-zinc-900 overflow-hidden transition-all",
                activeImage === img
                  ? "opacity-100 ring-1 ring-white"
                  : "opacity-50 hover:opacity-80"
              )}
            >
              <Image src={img} alt="Thumbnail" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
