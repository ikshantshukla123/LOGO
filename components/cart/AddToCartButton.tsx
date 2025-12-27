"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore"; // Import Auth to protect button
import { Loader2, Check, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image: string;
  size?: string; // Optional: Pass size if this button is on a product page
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
  size
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { user, openModal } = useAuthStore();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Auth Guard
    if (!user) {
      openModal("cart");
      return;
    }

    // 2. Start Loading
    setIsLoading(true);

    try {
      // 3. Add to Store (Await ensures we wait for API response)
      await addItem({
        productId: id,
        name,
        price,
        image,
        quantity: 1,
        size: size || undefined,
      });

      // 4. Show Success State
      setIsSuccess(true);
      
      // Reset success message after 2 seconds
      setTimeout(() => setIsSuccess(false), 2000);

    } catch (error) {
      console.error("Failed to add:", error);
      alert("Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading || isSuccess}
      className={cn(
        "mt-6 px-10 py-4 text-lg rounded-full transition-all duration-300 shadow-md flex items-center justify-center gap-2 min-w-[180px]",
        isSuccess 
          ? "bg-green-600 hover:bg-green-700 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white",
        isLoading && "opacity-80 cursor-not-allowed"
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Adding...</span>
        </>
      ) : isSuccess ? (
        <>
          <Check className="w-5 h-5" />
          <span>Added</span>
        </>
      ) : (
        <>
          <ShoppingBag className="w-5 h-5" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}