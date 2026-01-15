
"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import AdminGuard from "@/components/admin/AdminGuard";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isCollapsed={sidebarCollapsed}
            setIsCollapsed={setSidebarCollapsed}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Header */}
            <Header onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />

            {/* Main Content */}
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </AdminGuard>
  );
}
