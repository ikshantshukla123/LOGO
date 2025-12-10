// Update app/(storefront)/products/[id]/page.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";

export default function ProductDetailsPage({ params }: any) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addItem } = useCartStore();
  
  // Mock product data - replace with your actual data fetching
  const product = {
    id: "1",
    name: "Premium T-Shirt",
    price: 2999,
    description: "High quality cotton t-shirt with premium finish.",
    images: ["/product.jpg"],
    sizes: ["S", "M", "L", "XL"]
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0) {
      alert("Please select a size");
      return;
    }

    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: selectedSize || undefined
    };

    addItem(cartItem);
    alert("Added to cart!");
  };

  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-8 bg-black min-h-screen">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gray-900">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                fill
                className="object-cover"
                alt={product.name}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
          <p className="text-3xl text-blue-400 mb-6">₹{product.price}</p>
          
          <p className="text-gray-300 mb-8 leading-relaxed">{product.description}</p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Select Size</h3>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? "border-blue-500 bg-blue-500/10 text-blue-400"
                        : "border-gray-700 text-gray-400 hover:border-gray-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              Add to Cart
            </button>
            <button className="px-8 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 rounded-lg transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}