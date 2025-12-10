// app/admin/products/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import { createProduct } from "@/actions/products";

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
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
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl) {
      alert("Please upload an image");
      return;
    }
    
    if (sizes.length === 0) {
      alert("Please select at least one size");
      return;
    }
    
    if (!formData.name || !formData.price) {
      alert("Please fill all required fields");
      return;
    }

    setIsLoading(true);

    try {
      const result = await createProduct({
        name: formData.name,
        price: parseInt(formData.price),
        description: formData.description,
        images: [imageUrl],
        sizes,
      });

      if (result.success) {
        alert("Product created successfully!");
        router.push("/admin/products");
        router.refresh();
      } else {
        alert(result.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add New Product
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Fill in the details below to add a new product to your store.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Product Image
            </h2>
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
                {imageUrl ? (
                  <div className="space-y-4">
                    <div className="relative mx-auto w-64 h-64 rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrl("")}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Image uploaded successfully. Click to change.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-gray-400">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Upload a high-quality product image
                    </p>
                  </div>
                )}
                
                <div className="mt-6">
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res && res[0]) {
                        setImageUrl(res[0].ufsUrl);
                      }
                    }}
                    onUploadError={(error: Error) => {
                      alert(`Upload failed: ${error.message}`);
                    }}
                    className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:text-white ut-button:font-semibold ut-button:px-6 ut-button:py-3 ut-button:rounded-lg"
                  />
                </div>
                
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  JPG, PNG, or WebP up to 4MB
                </p>
              </div>
              
              {!imageUrl && (
                <div className="flex items-center gap-2 text-sm text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
                  </svg>
                  <span>Product image is required</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Product Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="e.g., Premium Cotton T-Shirt"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Describe your product in detail..."
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Include details about material, fit, care instructions, etc.
                </p>
              </div>
            </div>
          </div>

          {/* Size Selection */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Available Sizes *
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3 flex-wrap">
                {allSizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => toggleSize(size)}
                    className={`px-6 py-3 rounded-lg border font-medium transition-all ${
                      sizes.includes(size)
                        ? "bg-blue-600 border-blue-600 text-white shadow-sm"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-500 dark:hover:border-blue-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              {sizes.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5" />
                  </svg>
                  <span>Please select at least one size</span>
                </div>
              ) : (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selected sizes: <span className="font-semibold">{sizes.join(", ")}</span>
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Fields marked with * are required
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => router.push("/admin/products")}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !imageUrl || sizes.length === 0 || !formData.name || !formData.price}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Product"
                  )}
                </button>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                What happens next?
              </h3>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Product will be immediately available in your store</li>
                <li>• Will appear in the products listing page</li>
                <li>• Customers can view and purchase the product</li>
                <li>• You can edit or delete the product anytime</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}