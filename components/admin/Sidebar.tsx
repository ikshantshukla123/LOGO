"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  ChevronLeft
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Users", path: "/admin/users", icon: Users },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`${isCollapsed ? "w-16" : "w-64"
        } bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 transition-all duration-300 ease-in-out flex flex-col`}
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
            Admin Panel
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                    ? "bg-blue-600 text-white"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
        <div className={`flex items-center gap-3 px-3 py-2 text-zinc-500 dark:text-zinc-400 ${isCollapsed ? "justify-center" : ""
          }`}>
          <Settings className="w-5 h-5" />
          {!isCollapsed && <span className="text-sm">Settings</span>}
        </div>
      </div>
    </aside>
  );
}