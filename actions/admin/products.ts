"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface CreateProductData {
  name: string;
  description?: string;
  price: number;
  images: string[];
  sizes: string[];
  status?: string;
}

export interface UpdateProductData extends CreateProductData {
  id: string;
}

// Get all products with optional filtering and sorting
export async function getProducts(params?: {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  try {
    const where: any = {};

    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { description: { contains: params.search, mode: "insensitive" } },
      ];
    }

    if (params?.status) {
      where.status = params.status;
    }

    const orderBy: any = {};
    if (params?.sortBy) {
      orderBy[params.sortBy] = params.sortOrder || "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    return { success: true, data: products };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, error: "Failed to fetch products" };
  }
}

// Get single product by ID
export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            order: true,
          },
        },
      },
    });

    if (!product) {
      return { success: false, error: "Product not found" };
    }

    return { success: true, data: product };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { success: false, error: "Failed to fetch product" };
  }
}

// Create new product
export async function createProduct(data: CreateProductData) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: Math.round(data.price * 100), // Store as cents
        images: data.images,
        sizes: data.sizes,
      },
    });

    revalidatePath("/admin/products");
    return { success: true, data: product };
  } catch (error) {
    console.error("Error creating product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

// Update existing product
export async function updateProduct(data: UpdateProductData) {
  try {
    const product = await prisma.product.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        price: Math.round(data.price * 100), // Store as cents
        images: data.images,
        sizes: data.sizes,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${data.id}`);
    return { success: true, data: product };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

// Delete product
export async function deleteProduct(id: string) {
  try {
    // Check if product has any orders
    const orderCount = await prisma.orderItem.count({
      where: { productId: id },
    });

    if (orderCount > 0) {
      return {
        success: false,
        error: "Cannot delete product with existing orders"
      };
    }

    await prisma.product.delete({
      where: { id },
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}

// Get product statistics
export async function getProductStats() {
  try {
    const [totalProducts, activeProducts, lowStockProducts] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({
        where: {
          // Add status field to schema if needed
        },
      }),
      // This would require a stock field in the schema
      // prisma.product.count({
      //   where: { stock: { lt: 10 } },
      // }),
      0, // Placeholder for now
    ]);

    return {
      success: true,
      data: {
        totalProducts,
        activeProducts,
        lowStockProducts,
      },
    };
  } catch (error) {
    console.error("Error fetching product stats:", error);
    return { success: false, error: "Failed to fetch product statistics" };
  }
}