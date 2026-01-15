"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Shield, AlertTriangle } from "lucide-react";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const { user, isAdmin } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  useEffect(() => {
    // Check auth status after component mounts
    const checkAuth = async () => {
      try {
        // Check if user exists and is admin
        if (!user) {
          setShowUnauthorized(true);
          setIsLoading(false);
          return;
        }

        if (!isAdmin()) {
          setShowUnauthorized(true);
          setIsLoading(false);
          return;
        }

        // User is authenticated and is admin
        setIsLoading(false);
      } catch (error) {
        setShowUnauthorized(true);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [user, isAdmin]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Verifying admin access...
          </p>
        </div>
      </div>
    );
  }

  // Show unauthorized page
  if (showUnauthorized) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>

          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            Access Denied
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            You don't have permission to access the admin dashboard.
            Please sign in with admin credentials.
          </p>

          <div className="space-y-3">
            <button
              onClick={() => router.push("/")}
              className="w-full px-6 py-3 bg-zinc-600 hover:bg-zinc-700 text-white rounded-lg transition-colors"
            >
              Go to Homepage
            </button>

            <div className="flex items-center justify-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Shield className="w-4 h-4" />
              <span>Admin access required</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and is admin, show the protected content
  return <>{children}</>;
}