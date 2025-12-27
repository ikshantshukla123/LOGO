"use client";

import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Minus, Plus, Star } from "lucide-react"; // Removed unused icons
import { cn } from "@/lib/utils"; 

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
  const [activeImage, setActiveImage] = useState(product.images[0]);
  
  const { addItem } = useCartStore();
  const { user, openModal } = useAuthStore();

  // --- FIXED HANDLER ---
  const handleAction = async (type: "cart" | "buy") => {
    // 1. Validate Size
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    // 2. AUTH GUARD: Check Global Auth Store
    // If user is NOT logged in, open the global modal and stop.
    if (!user) {
      openModal();
      return; 
    }

    // 3. LOGGED IN LOGIC
    // Only runs if user exists
    const cartItem = {
       productId: product.id,
       name: product.name,
       price: product.price,
       image: product.images[0],
       quantity,
       size: selectedSize || undefined
    };

    if (type === "cart") {
       await addItem(cartItem);
       // Optional: Replace alert with a Toast notification later
       alert("Item added to bag"); 
    } else {
       // Handle Buy Now logic (e.g., router.push('/checkout'))
       alert("Proceeding to checkout...");
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
    <div className="min-h-screen bg-black text-white pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BREADCRUMB */}
        <nav className="flex items-center text-xs uppercase tracking-widest text-zinc-500 mb-12">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span className="mx-3">/</span>
          <a href="/products" className="hover:text-white transition-colors">Shop</a>
          <span className="mx-3">/</span>
          <span className="text-zinc-300">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* LEFT: GALLERY */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative aspect-[4/5] w-full bg-zinc-900 overflow-hidden">
              <Image
                src={activeImage || "/placeholder.jpg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={cn(
                      "relative w-20 h-24 flex-shrink-0 bg-zinc-900 overflow-hidden transition-all",
                      activeImage === img ? "opacity-100 ring-1 ring-white" : "opacity-50 hover:opacity-80"
                    )}
                  >
                    <Image src={img} alt="Thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-10">
              
              {/* Header */}
              <div className="space-y-2 border-b border-zinc-900 pb-8">
                <h1 className="text-3xl font-bold uppercase tracking-wide text-white">
                  {product.name}
                </h1>
                <div className="flex items-center justify-between">
                  <p className="text-xl text-zinc-200">{formatPrice(product.price)}</p>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-white text-white" />)}
                    <span className="text-xs text-zinc-500 ml-2">(42 Reviews)</span>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              {product.sizes.length > 0 && (
                <div className="space-y-4">
                  <div className="flex justify-between text-xs uppercase tracking-widest text-zinc-500 font-medium">
                    <span>Select Size</span>
                    <button className="underline hover:text-white">Size Guide</button>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
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
              )}

              {/* Actions */}
              <div className="space-y-4">
                 <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleAction("cart")}
                      className="w-full h-14 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                    >
                      Add to Bag
                    </button>
                    
                    <button
                      onClick={() => handleAction("buy")}
                      className="w-full h-14 bg-transparent border border-zinc-800 text-white font-bold uppercase tracking-widest hover:bg-zinc-900 hover:border-white transition-colors"
                    >
                      Buy Now
                    </button>
                 </div>
                 
                 <p className="text-xs text-center text-zinc-500 uppercase tracking-wider">
                    Free shipping on orders over ₹2000
                 </p>
              </div>

              {/* Description */}
              <div className="border-t border-zinc-900 pt-6 space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Description</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        {product.description || "Crafted from premium heavyweight cotton, this piece is designed for everyday luxury."}
                    </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* REMOVED: <UserInfoModal /> 
          Why: This is now handled globally in layout.tsx via <GlobalAuthModal />
        */}
      </div>
    </div>
  );
}