// components/products/ProductCard.tsx
import Link from "next/link";
import { Image } from "@imagekit/next";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    images: string[];
    sizes: string[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const truncateDescription = (text: string | null, maxLength: number) => {
    if (!text) return "No description available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative w-full h-64 bg-gray-800 overflow-hidden">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            width={500}
            height={500}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Name and Price */}
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
            {product.name}
          </h2>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-400">
              {formatPrice(product.price)}
            </span>
            {product.sizes && product.sizes.length > 0 && (
              <span className="text-xs font-medium px-2 py-1 bg-gray-800 text-gray-400 rounded">
                {product.sizes.length} sizes
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {truncateDescription(product.description, 100)}
          </p>
        </div>

        {/* View Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-800">
          <span className="text-sm text-gray-500">
            View details →
          </span>
          <button className="px-3 py-1.5 text-sm bg-gray-800 text-gray-300 rounded-md hover:bg-gray-700 transition-colors">
            View
          </button>
        </div>
      </div>
    </Link>
  );
}