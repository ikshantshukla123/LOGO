import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || user.role !== "ADMIN") {
    redirect("/");
  }

  return user;
}

export async function checkAdminAccess() {
  const user = await getCurrentUser();
  return user?.role === "ADMIN";
}