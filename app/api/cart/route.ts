// app/api/cart/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// GET - Get user's cart
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.userId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            price: true,
            images: true,
            sizes: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedCart = cartItems.map(item => ({
      id: item.id,
      productId: item.product.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.images[0],
      quantity: item.quantity,
      size: item.size,
    }));

    return NextResponse.json({ cart: formattedCart });

  } catch (error) {
    console.error("Get cart error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { productId, quantity = 1, size } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID required" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Upsert cart item
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId_size: {
          userId: user.userId,
          productId,
          size: size || ""
        }
      },
      update: {
        quantity: { increment: quantity }
      },
      create: {
        userId: user.userId,
        productId,
        quantity,
        size: size || ""
      },
      include: {
        product: true
      }
    });

    return NextResponse.json({
      success: true,
      cartItem: {
        id: cartItem.id,
        productId: cartItem.productId,
        name: cartItem.product.name,
        price: cartItem.product.price,
        image: cartItem.product.images[0],
        quantity: cartItem.quantity,
        size: cartItem.size,
      }
    });

  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}