"use client";

import { useState, useEffect } from "react";
import { Eye, Package } from "lucide-react";
import Link from "next/link";
import DataTable from "@/components/admin/DataTable";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { getOrders } from "@/actions/admin/orders";
import toast from "react-hot-toast";

interface Order {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: Date;
  user?: {
    id: string;
    name: string | null;
    email: string | null;
  } | null;
  orderItems: {
    id: string;
    price: number;
    quantity: number;
    productId: string;
    orderId: string;
    product: {
      id: string;
      name: string;
      images: string[];
    };
  }[];
  _count: {
    orderItems: number;
  };
}

export default function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const result = await getOrders();
      if (result.success && result.data) {
        setOrders(result.data);
      } else {
        toast.error(result.error || "Failed to load orders");
      }
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price / 100); // Convert from cents
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300";
    }
  };

  const columns = [
    {
      key: "id",
      label: "Order ID",
      render: (value: string) => (
        <span className="font-mono text-sm">#{value.slice(-8)}</span>
      ),
    },
    {
      key: "customer",
      label: "Customer",
      render: (_: unknown, row: Order) => (
        <div>
          <div className="font-medium text-zinc-900 dark:text-white">
            {row.user?.name || "Guest"}
          </div>
          {row.user?.email && (
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {row.user.email}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "items",
      label: "Items",
      render: (_: unknown, row: Order) => (
        <span className="text-zinc-700 dark:text-zinc-300">
          {row._count.orderItems} item{row._count.orderItems !== 1 ? "s" : ""}
        </span>
      ),
    },
    {
      key: "totalAmount",
      label: "Total",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-zinc-900 dark:text-white">
          {formatPrice(value)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(value)}`}>
          {value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (value: Date) => (
        <span className="text-zinc-700 dark:text-zinc-300">
          {value.toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: unknown, row: Order) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/orders/${row.id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "COMPLETED", label: "Completed" },
    { value: "CANCELLED", label: "Cancelled" },
  ];

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-zinc-600 dark:text-zinc-400">Loading orders...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {orders.length} order{orders.length !== 1 ? "s" : ""} found
      </div>

      {/* Orders Table */}
      <DataTable
        data={orders}
        columns={columns}
        searchable
        searchPlaceholder="Search orders..."
        filters={[
          {
            key: "status",
            label: "Filter by Status",
            options: statusOptions,
          },
        ]}
        emptyMessage="No orders found. Orders will appear here when customers place them."
      />
    </div>
  );
}