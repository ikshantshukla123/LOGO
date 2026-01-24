// components/product/ProductInfo.tsx
import { Star } from "lucide-react";

interface ProductInfoProps {
  name: string;
  price: number;
  description: string | null;
}

export default function ProductInfo({ name, price, description }: ProductInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Header */}
      <div className="space-y-2 border-b border-zinc-900 pb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wide text-white">{name}</h1>
        <div className="flex items-center justify-between">
          <p className="text-xl text-zinc-200">{formatPrice(price)}</p>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-3 h-3 fill-white text-white" />
            ))}
            <span className="text-xs text-zinc-500 ml-2">(42 Reviews)</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-zinc-900 pt-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">
            Description
          </h3>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {description ||
              "Crafted from premium heavyweight cotton, this piece is designed for everyday luxury."}
          </p>
        </div>
      </div>
    </>
  );
}
