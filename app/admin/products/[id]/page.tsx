import { Suspense } from "react";
import { getProductById } from "@/actions/admin/products";
import EditProductForm from "./EditProductForm";
import LoadingSpinner from "@/components/admin/LoadingSpinner";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

async function ProductEditor({ productId }: { productId: string }) {
  const result = await getProductById(productId);

  if (!result.success || !result.data) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          {result.error || "The product you're trying to edit doesn't exist."}
        </p>
      </div>
    );
  }

  return <EditProductForm product={result.data} />;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  return (
    <Suspense fallback={
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <ProductEditor productId={productId} />
    </Suspense>
  );
}