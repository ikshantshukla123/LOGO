"use client";

import { Bell, Search, User, Menu } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-zinc-50 dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
            >
              <Bell className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-zinc-200 dark:border-zinc-700">
                  <h3 className="font-medium text-zinc-900 dark:text-white">Notifications</h3>
                </div>
                <div className="p-4 space-y-3">
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    New order #1234 received
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Product inventory low: T-Shirt XL
                  </div>
                  <div className="text-center text-sm text-zinc-500 dark:text-zinc-400 py-2">
                    No more notifications
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-medium text-zinc-900 dark:text-white">
                Admin User
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">
                admin@tshirt.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}