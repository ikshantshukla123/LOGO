// app/admin/products/[id]/EditProductForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProduct } from "@/actions/products";
import { UploadButton } from "@/utils/uploadthing";

interface EditProductFormProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    price: number;
    images: string[];
    sizes: string[];
  };
}

export default function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(product.images[0] || "");
  const [sizes, setSizes] = useState<string[]>(product.sizes);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description || "",
  });

  const allSizes = ["S", "M", "L", "XL", "XXL"];

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await updateProduct(product.id, {
      ...formData,
      images: [imageUrl],
      sizes,
    });

    setIsLoading(false);

    if (result.success) {
      alert("Product updated successfully!");
      router.push("/admin/products");
    } else {
      alert("Failed to update product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Edit Product
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Update product information
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Image Upload */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Image
          </h2>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  const url = res[0].ufsUrl;
                  setImageUrl(url);
                }}
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Upload a high-quality image of your product
              </p>
            </div>
            <div className="flex-1">
              {imageUrl && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Product Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="799"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Describe your product..."
              />
            </div>
          </div>
        </div>

        {/* Size Selection */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Available Sizes
          </h2>
          <div className="flex gap-3 flex-wrap">
            {allSizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-6 py-3 rounded-lg border font-medium transition-all ${
                  sizes.includes(size)
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-600"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            {sizes.length > 0
              ? `Selected sizes: ${sizes.join(", ")}`
              : "Select at least one size"}
          </p>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || !imageUrl || sizes.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
}