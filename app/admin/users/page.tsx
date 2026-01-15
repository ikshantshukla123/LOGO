import { Suspense } from "react";
import UsersClient from "./UsersClient";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Users
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-1">
            Manage customer accounts and user data
          </p>
        </div>
      </div>

      <Suspense fallback={
        <div className="flex justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      }>
        <UsersClient />
      </Suspense>
    </div>
  );
}