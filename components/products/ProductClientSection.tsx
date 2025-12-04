"use client";

import AddToCartButton from "@/components/cart/AddToCartButton";

export default function ProductClientSection({ product }: any) {
  return (
    <div className="flex flex-col gap-6 w-full md:w-1/2">
      <h1 className="text-4xl font-bold">{product.name}</h1>
      <p className="text-2xl font-semibold text-blue-600">₹{product.price}</p>

      <p className="text-lg text-zinc-700 dark:text-zinc-300">
        {product.description}
      </p>

      <AddToCartButton
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.images[0]}
      />
    </div>
  );
}
