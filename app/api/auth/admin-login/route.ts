import { NextRequest, NextResponse } from "next/server";
import { setAuthToken } from "@/lib/auth";

// Admin credentials
const ADMIN_MOBILE = "8109537034";
const ADMIN_NAME = "ikshant";
const ADMIN_CODE = "ADMIN2024"; // Unique admin code

//  Request Body type
type AdminLoginBody = {
  mobile: string;
  code: string;
};

//  Response types
type AdminLoginSuccessResponse = {
  success: true;
  user: {
    id: string;
    name: string;
    mobile: string;
    role: "ADMIN";
  };
};

type AdminLoginErrorResponse = {
  success: false;
  error: string;
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<AdminLoginSuccessResponse | AdminLoginErrorResponse>> {
  try {
    // Parse json safely
    const body = (await request.json()) as Partial<AdminLoginBody>;

    const mobile = body.mobile?.trim();
    const code = body.code?.trim();

    // Validate request data
    if (!mobile || !code) {
      return NextResponse.json(
        { success: false, error: "Mobile and code are required" },
        { status: 400 }
      );
    }

    //  Validate admin credentials
    if (mobile !== ADMIN_MOBILE || code !== ADMIN_CODE) {
      return NextResponse.json(
        { success: false, error: "Invalid admin credentials" },
        { status: 401 }
      );
    }

    // Create admin token
    await setAuthToken({
      userId: "admin-ikshant",
      mobile: ADMIN_MOBILE,
      name: ADMIN_NAME,
      role: "ADMIN",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: "admin-ikshant",
        name: ADMIN_NAME,
        mobile: ADMIN_MOBILE,
        role: "ADMIN",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { success: false, error: "Login failed" },
      { status: 500 }
    );
  }
}
