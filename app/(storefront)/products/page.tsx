// app/(storefront)/products/page.tsx
import { Suspense } from "react";
import ProductListSkeleton from "@/components/products/ProductListSkeleton";
import ProductsContent from "./ProductsContent";
import PageHeader from "@/components/shared/PageHeader";

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="All Products"
          description="Discover our premium collection"
          badge={{ text: "Latest Collection", animated: true }}
        />

        <Suspense fallback={<ProductListSkeleton />}>
          <ProductsContent />
        </Suspense>
      </div>
    </div>
  );
}