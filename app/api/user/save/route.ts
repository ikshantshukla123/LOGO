// app/api/user/save/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, mobile } = await request.json();

    if (!name || !mobile || !/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { error: "Invalid name or mobile number" },
        { status: 400 }
      );
    }

    // Check if user already exists with this mobile
    let user = await prisma.user.findUnique({
      where: { mobile },
    });

    // If user doesn't exist, create new user
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          mobile,
          email: null, // Optional: You can add email later
          role: "USER",
        },
      });
    } else {
      // Update name if it's different
      if (user.name !== name) {
        user = await prisma.user.update({
          where: { mobile },
          data: { name },
        });
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        mobile: user.mobile,
      },
    });

  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: "Failed to save user information" },
      { status: 500 }
    );
  }
}