"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore, CartItem } from "@/store/cartStore";
import UserInfoModal from "@/components/modals/UserInfoModal";

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
  const [showUserModal, setShowUserModal] = useState(false);
  const [actionType, setActionType] = useState<"cart" | "buy">("cart");
  const { addItem } = useCartStore();

  const handleUserInfoSubmit = async (userData: { name: string; mobile: string }) => {
    try {
      // Save user info to database
      const response = await fetch("/api/user/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save user");
      }

      // If action is "cart", add to cart
      if (actionType === "cart") {
        const cartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0] || "/placeholder.jpg",
          quantity,
          size: selectedSize || undefined
        };

        addItem(cartItem);
        alert("Added to cart successfully!");
      } else {
        // Handle buy now - you can redirect to checkout
        alert("Proceeding to checkout...");
        // Here you would typically redirect to checkout page
        // router.push(`/checkout?product=${product.id}&quantity=${quantity}&size=${selectedSize}`);
      }

      setShowUserModal(false);
      
    } catch (error) {
      console.error("Error:", error);
      alert(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const handleAddToCart = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    setActionType("cart");
    setShowUserModal(true);
  };

  const handleBuyNow = () => {
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    setActionType("buy");
    setShowUserModal(true);
  };

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity(prev => Math.min(prev + 1, 10));
    } else {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex text-sm text-gray-400">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-2">/</span>
            <a href="/products" className="hover:text-white">Products</a>
            <span className="mx-2">/</span>
            <span className="text-white">{product.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
              {product.images?.[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-24 rounded-lg overflow-hidden bg-gray-900 border border-gray-800 cursor-pointer hover:border-gray-600 transition-colors">
                    <Image
                      src={image}
                      alt={`${product.name} - ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{product.name}</h1>
              <div className="text-3xl font-bold text-blue-400 mb-6">
                {formatPrice(product.price)}
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-400">In Stock</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Description</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.description || "No description available for this product."}
              </p>
            </div>

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Select Size</h3>
                  <span className="text-sm text-gray-400">Size Guide</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-4 rounded-lg font-medium transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-blue-500 text-white border-2 border-blue-500"
                          : "bg-gray-900 text-gray-300 border-2 border-gray-700 hover:border-gray-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-700 rounded-lg">
                  <button 
                    onClick={() => handleQuantityChange("decrease")}
                    className="px-4 py-3 hover:bg-gray-800"
                  >
                    −
                  </button>
                  <span className="px-6 py-3 border-x border-gray-700">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange("increase")}
                    className="px-4 py-3 hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>
                <div className="text-sm text-gray-400">
                  Only 10 items left!
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
                >
                  Buy Now
                </button>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-gray-800 space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>100% Quality Guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Free Delivery in 3-5 Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Modal */}
        <UserInfoModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          onSubmit={handleUserInfoSubmit}
          type={actionType}
        />
      </div>
    </div>
  );
}