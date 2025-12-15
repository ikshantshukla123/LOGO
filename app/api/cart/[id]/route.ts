// app/api/cart/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// DELETE - Remove item
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.cartItem.delete({
      where: {
        id,
        userId: user.userId // Ensure user can only delete their own items
      }
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Delete cart item error:", error);
    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}

// PUT - Update quantity
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const { quantity } = await request.json();

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { error: "Invalid quantity" },
        { status: 400 }
      );
    }

    const updatedItem = await prisma.cartItem.update({
      where: {
        id,
        userId: user.userId
      },
      data: { quantity },
      include: {
        product: true
      }
    });

    return NextResponse.json({
      success: true,
      cartItem: {
        id: updatedItem.id,
        productId: updatedItem.productId,
        name: updatedItem.product.name,
        price: updatedItem.product.price,
        image: updatedItem.product.images[0],
        quantity: updatedItem.quantity,
        size: updatedItem.size,
      }
    });

  } catch (error) {
    console.error("Update cart item error:", error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}