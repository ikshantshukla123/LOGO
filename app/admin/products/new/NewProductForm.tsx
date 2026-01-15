"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X, Upload, Package } from "lucide-react";
import Image from "next/image";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { createProduct } from "@/actions/admin/products";
import { UploadButton } from "@/utils/uploadthing";
import toast from "react-hot-toast";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Name too long"),
  description: z.string().optional(),
  price: z.number().min(0.01, "Price must be greater than 0").max(99999, "Price too high"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type ProductFormData = z.infer<typeof productSchema>;

const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      sizes: [],
      images: [],
    },
  });

  const watchedSizes = watch("sizes");

  const removeImage = (index: number) => {
    const updatedImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(updatedImages);
    setValue("images", updatedImages);
  };

  const toggleSize = (size: string) => {
    const currentSizes = watchedSizes || [];
    const updatedSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];
    setValue("sizes", updatedSizes);
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const result = await createProduct({
        ...data,
        price: data.price, // Will be converted to cents in the action
      });

      if (result.success) {
        toast.success("Product created successfully!");
        router.push("/admin/products");
      } else {
        toast.error(result.error || "Failed to create product");
      }
    } catch (error) {
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
        >
          ←
        </button>
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Add New Product
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Create a new product for your store
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Product Name *
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Price (₹) *
              </label>
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white"
              />
              {errors.price && (
                <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Enter product description"
                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Available Sizes *
          </h2>
          <div className="flex flex-wrap gap-3">
            {AVAILABLE_SIZES.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${watchedSizes?.includes(size)
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-600"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
          {errors.sizes && (
            <p className="text-red-500 text-sm mt-2">{errors.sizes.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
            Product Images *
          </h2>

          {/* Image Upload */}
          <div className="mb-6">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res && res[0]) {
                  const updatedImages = [...imageUrls, res[0].url];
                  setImageUrls(updatedImages);
                  setValue("images", updatedImages);
                  toast.success("Image uploaded successfully!");
                }
              }}
              onUploadError={(error) => {
                toast.error(`Upload failed: ${error.message}`);
              }}
              className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700"
            />
          </div>

          {/* Image Preview Grid */}
          {imageUrls.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-700">
                    <Image
                      src={url}
                      alt={`Product image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-700">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner size="sm" />
                Creating...
              </>
            ) : (
              <>
                <Package className="w-4 h-4" />
                Create Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}