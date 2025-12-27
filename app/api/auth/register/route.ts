import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { mobile, name } = await req.json();

    if (!mobile || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // FIX: Use 'upsert' instead of 'create'.
    // Logic: Try to Create. If mobile exists, just Update the name (or do nothing).
    const user = await prisma.user.upsert({
      where: { mobile },
      update: { name }, // If exists, update name
      create: { mobile, name }, // If new, create
    });

    // Login the user
    await setAuthToken({ 
      userId: user.id, 
      mobile: user.mobile!, 
      name: user.name || "" 
    });

    return NextResponse.json({ 
      success: true, 
      user: { id: user.id, name: user.name, mobile: user.mobile } 
    });

  } catch (error: any) {
    console.error("Registration Error:", error); // View this in your terminal to debug
    return NextResponse.json(
      { error: error.message || "Registration Failed" }, 
      { status: 500 }
    );
  }
}