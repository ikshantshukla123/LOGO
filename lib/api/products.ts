// lib/api/products.ts
import { prisma } from "@/lib/db";

export interface ProductListItem {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
}

export interface ProductDetail {
  id: string;
  name: string;
  description: string | null;
  price: number | any; // Prisma Decimal
  images: string[];
  sizes: string[];
  createdAt?: Date;
  updatedAt?: Date;
  status?: string | null;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sizes?: string[];
  search?: string;
}

/**
 * Fetch featured products for homepage
 * ISR: revalidate every hour
 */
export async function getFeaturedProducts(limit: number = 8): Promise<ProductListItem[]> {
  try {
    const products = await prisma.product.findMany({
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: Number(product.price),
      images: product.images,
    }));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

/**
 * Fetch all products with optional filters
 * ISR: revalidate every 5 minutes
 */
export async function getAllProducts(filters?: ProductFilters): Promise<ProductListItem[]> {
  try {
    const whereClause: any = {};

    if (filters?.search) {
      whereClause.OR = [
        { name: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } },
      ];
    }

    if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
      whereClause.price = {
        ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
        ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
      };
    }

    if (filters?.sizes && filters.sizes.length > 0) {
      whereClause.sizes = {
        hasSome: filters.sizes,
      };
    }

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: Number(product.price),
      images: product.images,
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

/**
 * Fetch a single product by ID
 * ISR: revalidate every 5 minutes
 */
export async function getProductById(id: string): Promise<ProductDetail | null> {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    return product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

/**
 * Fetch related products (same category or similar)
 * ISR: revalidate every 5 minutes
 */
export async function getRelatedProducts(
  productId: string,
  limit: number = 4
): Promise<ProductListItem[]> {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: { not: productId },
      },
      take: limit,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        images: true,
      },
    });

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description || "",
      price: Number(product.price),
      images: product.images,
    }));
  } catch (error) {
    console.error("Error fetching related products:", error);
    return [];
  }
}

/**
 * Get product count for stats
 */
export async function getProductCount(): Promise<number> {
  try {
    return await prisma.product.count();
  } catch (error) {
    console.error("Error counting products:", error);
    return 0;
  }
}
