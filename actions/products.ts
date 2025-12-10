// actions/products.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface CreateProductData {
  name: string;
  price: number;
  description: string;
  images: string[];
  sizes: string[];
}

export async function createProduct(data: CreateProductData) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        price: data.price,
        description: data.description,
        images: data.images,
        sizes: data.sizes,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    
    return { success: true, product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(id: string, data: Partial<CreateProductData>) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });

    revalidatePath(`/admin/products/${id}`);
    revalidatePath("/admin/products");
    revalidatePath("/products");
    
    return { success: true, product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });
    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}