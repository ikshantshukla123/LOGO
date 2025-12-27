// app/api/auth/save/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setAuthToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { name, mobile } = await request.json();

    if (!name || !mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Valid name and 10-digit mobile number required" },
        { status: 400 }
      );
    }

    // Find or create user
    let user = await prisma.user.findUnique({
      where: { mobile },
      include: {
        cartItems: {
          include: {
            product: true
          }
        }
      }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          mobile,
          role: "USER",
        },
        include: {
          cartItems: {
            include: {
              product: true
            }
          }
        }
      });
    } else if (user.name !== name) {
      user = await prisma.user.update({
        where: { mobile },
        data: { name },
        include: {
          cartItems: {
            include: {
              product: true
            }
          }
        }
      });
    }

    // Set auth token
    await setAuthToken({
      userId: user.id,
      // FIX: Added '!' to assert mobile is not null, or fallback to empty string
      mobile: user.mobile || mobile, 
      name: user.name || undefined
    });

    // Format cart items for frontend
    const cartItems = user.cartItems.map(item => ({
      id: item.id,
      productId: item.productId,
      name: item.product.name,
      price: item.product.price,
      image: item.product.images[0],
      quantity: item.quantity,
      size: item.size,
    }));

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
      },
      cart: cartItems
    });

  } catch (error: any) {
    console.error("Auth error:", error);
    
    // Handle duplicate mobile error
    if (error.code === 'P2002' && error.meta?.target?.includes('mobile')) {
      return NextResponse.json(
        { error: "Mobile number already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}