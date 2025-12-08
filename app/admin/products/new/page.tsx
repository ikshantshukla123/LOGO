"use client";

import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

import { prismaCreateProduct } from "@/actions/products";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const sizeOptions = ["S", "M", "L", "XL"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !price || images.length === 0) {
      alert("Fill all required fields!");
      return;
    }

    const product = await prismaCreateProduct({
      name,
      description: desc,
      price: Number(price),
      images,
      sizes,
    });

    console.log("Saved Product:", product);
    alert("Product Added Successfully!");
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Product Name *</label>
          <input
            className="w-full p-3 rounded border"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            className="w-full p-3 rounded border"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-1">Price (₹) *</label>
          <input
            type="number"
            className="w-full p-3 rounded border"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        {/* SIZES */}
        <div>
          <label className="block font-medium mb-2">Available Sizes</label>

          <div className="flex gap-4">
            {sizeOptions.map((s) => (
              <button
                key={s}
                type="button"
                className={`px-4 py-2 border rounded ${
                  sizes.includes(s)
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() =>
                  setSizes((prev) =>
                    prev.includes(s)
                      ? prev.filter((x) => x !== s)
                      : [...prev, s]
                  )
                }
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium mb-1">Product Images *</label>

          <UploadButton
            endpoint="productImage"
            onClientUploadComplete={(res) => {
              const urls = res.map((file) => file.url);
              setImages(urls);
            }}
            onUploadError={() => alert("Upload failed")}
          />

          {/* Preview */}
          <div className="flex gap-4 mt-4">
            {images.map((img) => (
              <img
                key={img}
                src={img}
                className="w-24 h-24 rounded border object-cover"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

