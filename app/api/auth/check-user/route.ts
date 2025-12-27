import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { setAuthToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { mobile } = await req.json();
    
    // Find User
    const user = await prisma.user.findUnique({
      where: { mobile },
    });

    if (user) {
      // If user exists, Login them immediately (In real app, verify OTP first)
      await setAuthToken({ userId: user.id, mobile: user.mobile!, name: user.name || "" });
      
      return NextResponse.json({ 
        exists: true, 
        user: { id: user.id, name: user.name, mobile: user.mobile } 
      });
    }

    // If user doesn't exist
    return NextResponse.json({ exists: false });

  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}