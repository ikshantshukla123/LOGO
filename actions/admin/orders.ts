"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export interface UpdateOrderData {
  id: string;
  status: string;
}

// Get all orders with optional filtering and sorting
export async function getOrders(params?: {
  search?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  try {
    const where: any = {};

    if (params?.search) {
      where.OR = [
        { id: { contains: params.search, mode: "insensitive" } },
        {
          user: {
            OR: [
              { name: { contains: params.search, mode: "insensitive" } },
              { email: { contains: params.search, mode: "insensitive" } },
            ]
          }
        },
      ];
    }

    if (params?.status) {
      where.status = params.status;
    }

    const orderBy: any = {};
    if (params?.sortBy) {
      orderBy[params.sortBy] = params.sortOrder || "desc";
    } else {
      orderBy.createdAt = "desc";
    }

    const orders = await prisma.order.findMany({
      where,
      orderBy,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                images: true,
              },
            },
          },
        },
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

// Get single order by ID
export async function getOrderById(id: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      return { success: false, error: "Order not found" };
    }

    return { success: true, data: order };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { success: false, error: "Failed to fetch order" };
  }
}

// Update order status
export async function updateOrderStatus(data: UpdateOrderData) {
  try {
    const order = await prisma.order.update({
      where: { id: data.id },
      data: {
        status: data.status,
      },
      include: {
        user: true,
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${data.id}`);
    return { success: true, data: order };
  } catch (error) {
    console.error("Error updating order:", error);
    return { success: false, error: "Failed to update order" };
  }
}

// Get order statistics
export async function getOrderStats() {
  try {
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      totalRevenue,
      recentOrders,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: { status: "PENDING" },
      }),
      prisma.order.count({
        where: { status: "COMPLETED" },
      }),
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: { status: "COMPLETED" },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
          _count: {
            select: {
              orderItems: true,
            },
          },
        },
      }),
    ]);

    return {
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        recentOrders,
      },
    };
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return { success: false, error: "Failed to fetch order statistics" };
  }
}

// Get orders by status
export async function getOrdersByStatus(status: string) {
  try {
    const orders = await prisma.order.findMany({
      where: { status },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: orders };
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}