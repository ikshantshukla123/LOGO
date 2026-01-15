"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import LoadingSpinner from "@/components/admin/LoadingSpinner";
import { getUsers } from "@/actions/admin/users";
import toast from "react-hot-toast";

interface UserData {
  id: string;
  name: string | null;
  email: string | null;
  mobile: string | null;
  role: string;
  createdAt: Date;
  _count: {
    cartItems: number;
    orders: number;
  };
  orders: {
    totalAmount: number;
  }[];
  totalSpent: number;
}

export default function UsersClient() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const result = await getUsers();
      if (result.success && result.data) {
        setUsers(result.data);
      } else {
        toast.error(result.error || "Failed to load users");
      }
    } catch (error) {
      toast.error("Failed to load users");
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

  const getRoleBadge = (role: string) => {
    const isAdmin = role.toLowerCase() === "admin";
    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${isAdmin
          ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
          : "bg-zinc-100 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-300"
          }`}
      >
        {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
      </span>
    );
  };

  const columns = [
    {
      key: "avatar",
      label: "",
      render: (_: unknown, row: UserData) => (
        <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
        </div>
      ),
    },
    {
      key: "name",
      label: "User",
      sortable: true,
      render: (value: string | null, row: UserData) => (
        <div>
          <div className="font-medium text-zinc-900 dark:text-white">
            {value || "Anonymous"}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            {row.email && (
              <>
                <Mail className="w-3 h-3" />
                {row.email}
              </>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "mobile",
      label: "Phone",
      render: (value: string) => (
        <div className="text-zinc-700 dark:text-zinc-300">
          {value ? (
            <div className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {value}
            </div>
          ) : (
            <span className="text-zinc-400">—</span>
          )}
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (value: string) => getRoleBadge(value),
    },
    {
      key: "orders",
      label: "Orders",
      render: (_: unknown, row: UserData) => (
        <span className="text-zinc-700 dark:text-zinc-300">
          {row._count.orders}
        </span>
      ),
    },
    {
      key: "totalSpent",
      label: "Total Spent",
      sortable: true,
      render: (value: number) => (
        <span className="font-medium text-zinc-900 dark:text-white">
          {value > 0 ? formatPrice(value) : "₹0"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Joined",
      sortable: true,
      render: (value: Date) => (
        <div className="text-zinc-700 dark:text-zinc-300">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {value.toLocaleDateString()}
          </div>
        </div>
      ),
    },
  ];

  const roleOptions = [
    { value: "USER", label: "Customer" },
    { value: "ADMIN", label: "Admin" },
  ];

  if (loading) {
    return (
      <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-8">
        <div className="flex items-center justify-center">
          <LoadingSpinner size="lg" />
          <span className="ml-3 text-zinc-600 dark:text-zinc-400">Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {users.length}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Total Users</div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {users.filter(u => u._count.orders > 0).length}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Active Customers</div>
        </div>
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {users.filter(u => u.role === "ADMIN").length}
          </div>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Admin Users</div>
        </div>
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        {users.length} user{users.length !== 1 ? "s" : ""} found
      </div>

      {/* Users Table */}
      <DataTable
        data={users}
        columns={columns}
        searchable
        searchPlaceholder="Search users..."
        filters={[
          {
            key: "role",
            label: "Filter by Role",
            options: roleOptions,
          },
        ]}
        emptyMessage="No users found. User accounts will appear here when customers register."
      />
    </div>
  );
}