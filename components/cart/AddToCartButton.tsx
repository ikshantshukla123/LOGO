"use client";

import { useCartStore } from "@/store/cartStore";

interface AddToCartButtonProps {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function AddToCartButton({
  id,
  name,
  price,
  image,
}: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);

 
    return (
    <button
      onClick={() => {
        addItem({
          id,
          name,
          price,
          image,
          quantity: 1,
        });

        // 🔥 DEBUG LOG — SEE CART ITEMS HERE
        console.log("CART ITEMS:", useCartStore.getState().items);
      }}
      className="mt-6 px-10 py-4 bg-blue-600 text-white text-lg rounded-full hover:bg-blue-700 transition shadow-md"
    >
      Add to Cart
    </button>
  );
}
