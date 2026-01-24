"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import SizeSelector from "@/components/product/SizeSelector";
import ProductActions from "@/components/product/ProductActions";

interface ProductDetailsClientProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    images: string[];
    sizes: string[];
  };
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const { addItem } = useCartStore();
  const { user, openModal } = useAuthStore();

  const handleAddToCart = async () => {
    // Validate size
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    // Check authentication
    if (!user) {
      openModal();
      return;
    }

    setIsLoading(true);
    try {
      await addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
        size: selectedSize || undefined,
      });
      alert("Item added to bag");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    if (!user) {
      openModal();
      return;
    }

    // TODO: Implement checkout flow
    alert("Proceeding to checkout...");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-xs uppercase tracking-widest text-zinc-500 mb-12">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <span className="mx-3">/</span>
          <a href="/products" className="hover:text-white transition-colors">
            Shop
          </a>
          <span className="mx-3">/</span>
          <span className="text-zinc-300">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Gallery */}
          <div className="lg:col-span-7">
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-10">
              <ProductInfo
                name={product.name}
                price={product.price}
                description={product.description}
              />

              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />

              <ProductActions
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}