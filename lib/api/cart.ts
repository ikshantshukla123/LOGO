// lib/api/cart.ts
// import { prisma } from "@/lib/db";

export interface CartItemData {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
}

/**
 * Fetch user's cart items from database
 * SSR: Always fresh data
 * 
 * TODO: Implement when Cart table is added to Prisma schema
 */
export async function getCartItems(userId: string): Promise<CartItemData[]> {
  // Temporarily disabled until Cart model is added
  return [];

  /* try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                images: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return [];
    }

    return cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      price: Number(item.product.price),
      image: item.product.images[0] || "/placeholder.jpg",
      quantity: item.quantity,
      size: item.size || undefined,
    }));
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return [];
  } */
}

/**
 * Get cart total count
 * 
 * TODO: Implement when Cart table is added to Prisma schema
 */
export async function getCartCount(userId: string): Promise<number> {
  // Temporarily disabled until Cart model is added
  return 0;

  /* try {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      return 0;
    }

    return cart.items.reduce((total, item) => total + item.quantity, 0);
  } catch (error) {
    console.error("Error getting cart count:", error);
    return 0;
  } */
}
