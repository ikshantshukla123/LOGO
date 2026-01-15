import { Suspense } from "react";
import { Package, ShoppingCart, Users, DollarSign } from "lucide-react";
import Link from "next/link";
import StatsCard from "@/components/admin/StatsCard";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { getProductStats } from "@/actions/admin/products";
import { getOrderStats } from "@/actions/admin/orders";
import { getUserStats } from "@/actions/admin/users";
import { requireAdmin } from "@/lib/admin-auth";

async function DashboardStats() {
  const [productStats, orderStats, userStats] = await Promise.all([
    getProductStats(),
    getOrderStats(),
    getUserStats(),
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price / 100); // Convert from cents
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard
        title="Total Products"
        value={productStats.success && productStats.data ? productStats.data.totalProducts : 0}
        icon={Package}
        color="blue"
        href="/admin/products"
      />
      <StatsCard
        title="Total Orders"
        value={orderStats.success && orderStats.data ? orderStats.data.totalOrders : 0}
        icon={ShoppingCart}
        color="purple"
        href="/admin/orders"
      />
      <StatsCard
        title="Total Revenue"
        value={orderStats.success && orderStats.data ? formatPrice(orderStats.data.totalRevenue) : "₹0"}
        icon={DollarSign}
        color="green"
      />
      <StatsCard
        title="Total Users"
        value={userStats.success && userStats.data ? userStats.data.totalUsers : 0}
        icon={Users}
        color="orange"
        href="/admin/users"
      />
    </div>
  );
}

async function RecentOrders() {
  const orderStats = await getOrderStats();

  if (!orderStats.success || !orderStats.data?.recentOrders) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
          Recent Orders
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-center py-8">
          No orders found
        </p>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price / 100);
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

  return (
    <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          Recent Orders
        </h2>
        <Link
          href="/admin/orders"
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="space-y-4">
        {orderStats.data?.recentOrders?.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-700 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Order #{order.id.slice(-8)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {order.user?.name || order.user?.email || "Guest"} • {order._count.orderItems} item{order._count.orderItems !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                {order.status}
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function AdminDashboard() {
  // Server-side admin check
  await requireAdmin();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-1">
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-zinc-200 dark:bg-zinc-700 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      }>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <Suspense fallback={
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
              <div className="flex justify-center py-8">
                <LoadingSpinner size="lg" />
              </div>
            </div>
          }>
            <RecentOrders />
          </Suspense>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/products/new"
                className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Package className="w-5 h-5" />
                Add New Product
              </Link>
              <Link
                href="/admin/orders"
                className="flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                View All Orders
              </Link>
              <Link
                href="/admin/users"
                className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
              >
                <Users className="w-5 h-5" />
                Manage Users
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Store Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">System Status</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  ● Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Order Processing</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  ● Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-600 dark:text-zinc-400">Store Visibility</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  ● Public
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}