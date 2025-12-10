"use client";

import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { createProduct } from "@/actions/products";

export default function NewProductPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);

  const allSizes = ["S", "M", "L", "XL", "XXL"];

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((s) => s !== size)
        : [...prev, size]
    );
  };

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New T-Shirt</h1>

      {/* IMAGE UPLOADER */}
      <div className="mb-6">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const url = res[0].ufsUrl;
            setImageUrl(url);
          }}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="mt-4 w-48 h-48 object-cover rounded border"
          />
        )}
      </div>

      {/* PRODUCT FORM */}
      <form
        action={async (formData) => {
          await createProduct({
            name: formData.get("name") as string,
            price: Number(formData.get("price")),
            description: formData.get("description") as string,
            images: [formData.get("imageUrl") as string],
            sizes,
          });
        }}
        className="space-y-6"
      >
        <input type="hidden" name="imageUrl" value={imageUrl} />

        {/* PRODUCT NAME */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            name="name"
            placeholder="Enter product name"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block mb-1 font-medium">Price (₹)</label>
          <input
            name="price"
            type="number"
            placeholder="799"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            placeholder="Write something about this T-shirt"
            className="border p-2 w-full rounded"
            required
          />
        </div>

        {/* SIZE SELECTOR */}
        <div>
          <label className="block mb-2 font-medium">Available Sizes</label>
          <div className="flex gap-3 flex-wrap">
            {allSizes.map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-4 py-2 border rounded 
                  ${sizes.includes(size)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                  }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          className="bg-black text-white px-6 py-3 rounded w-full font-semibold"
          disabled={!imageUrl || sizes.length === 0}
        >
          Create Product
        </button>

        {(!imageUrl || sizes.length === 0) && (
          <p className="text-sm text-gray-500 text-center">
            Upload an image and select at least one size to enable the button.
          </p>
        )}
      </form>
    </div>
  );
}
