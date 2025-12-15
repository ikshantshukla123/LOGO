// app/api/auth/check/route.ts
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  
  return NextResponse.json({
    user: user ? {
      userId: user.userId,
      mobile: user.mobile,
      name: user.name
    } : null
  });
}