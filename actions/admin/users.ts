"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface UpdateUserData {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  mobile?: string;
}

// Get all users with optional filtering and sorting
export async function getUsers(params?: {
  search?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  try {
    const where: any = {};

    if (params?.search) {
      where.OR = [
        { name: { contains: params.search, mode: "insensitive" } },
        { email: { contains: params.search, mode: "insensitive" } },
        { mobile: { contains: params.search, mode: "insensitive" } },
      ];
    }

    if (params?.role) {
      where.role = params.role;
    }

    const orderBy: any = {};
    if (params?.sortBy) {
      orderBy[params.sortBy] = params.sortOrder || "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    const users = await prisma.user.findMany({
      where,
      orderBy,
      include: {
        _count: {
          select: {
            orders: true,
            cartItems: true,
          },
        },
        orders: {
          where: {
            status: "COMPLETED",
          },
          select: {
            totalAmount: true,
          },
        },
      },
    });

    // Calculate total spent for each user
    const usersWithStats = users.map(user => ({
      ...user,
      totalSpent: user.orders.reduce((sum, order) => sum + order.totalAmount, 0),
    }));

    return { success: true, data: usersWithStats };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}

// Get single user by ID
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        orders: {
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user" };
  }
}

// Update user
export async function updateUser(data: UpdateUserData) {
  try {
    const user = await prisma.user.update({
      where: { id: data.id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.email && { email: data.email }),
        ...(data.role && { role: data.role }),
        ...(data.mobile && { mobile: data.mobile }),
      },
    });

    revalidatePath("/admin/users");
    revalidatePath(`/admin/users/${data.id}`);
    return { success: true, data: user };
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Failed to update user" };
  }
}

// Delete user
export async function deleteUser(id: string) {
  try {
    // Check if user has any orders
    const orderCount = await prisma.order.count({
      where: { userId: id },
    });

    if (orderCount > 0) {
      return {
        success: false,
        error: "Cannot delete user with existing orders"
      };
    }

    await prisma.user.delete({
      where: { id },
    });

    revalidatePath("/admin/users");
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

// Get user statistics
export async function getUserStats() {
  try {
    const [
      totalUsers,
      activeUsers, // Users with orders in last 30 days
      newUsersThisMonth,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          orders: {
            some: {
              createdAt: {
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
              },
            },
          },
        },
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          },
        },
      }),
    ]);

    return {
      success: true,
      data: {
        totalUsers,
        activeUsers,
        newUsersThisMonth,
      },
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return { success: false, error: "Failed to fetch user statistics" };
  }
}

// Get top customers by total spent
export async function getTopCustomers(limit: number = 10) {
  try {
    const users = await prisma.user.findMany({
      include: {
        orders: {
          where: {
            status: "COMPLETED",
          },
          select: {
            totalAmount: true,
          },
        },
        _count: {
          select: {
            orders: true,
          },
        },
      },
    });

    const usersWithStats = users
      .map(user => ({
        ...user,
        totalSpent: user.orders.reduce((sum, order) => sum + order.totalAmount, 0),
      }))
      .filter(user => user.totalSpent > 0)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, limit);

    return { success: true, data: usersWithStats };
  } catch (error) {
    console.error("Error fetching top customers:", error);
    return { success: false, error: "Failed to fetch top customers" };
  }
}