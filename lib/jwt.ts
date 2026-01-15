// lib/jwt.ts
import jwt, { type JwtPayload } from "jsonwebtoken";

export type Role = "USER" | "ADMIN";

export interface UserPayload {
  userId: string;
  mobile: string;
  name?: string;
  role?: Role;
}


const JWT_SECRET: string = process.env.JWT_SECRET ?? "";

if (!JWT_SECRET) {
  throw new Error("❌ Missing JWT_SECRET in environment variables");
}

export function generateToken(payload: UserPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "10d" });
}

export function verifyToken(token: string): UserPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") return null;

    const payload = decoded as JwtPayload;

    if (typeof payload.userId !== "string" || typeof payload.mobile !== "string") {
      return null;
    }

    return {
      userId: payload.userId,
      mobile: payload.mobile,
      name: typeof payload.name === "string" ? payload.name : undefined,
      role: payload.role === "ADMIN" || payload.role === "USER" ? payload.role : undefined,
    };
  } catch {
    return null;
  }
}
