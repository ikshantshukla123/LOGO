// app/admin/products/[id]/page.tsx
import { getProductById } from "@/actions/products";
import EditProductForm from "./EditProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The product you're trying to edit doesn't exist.
        </p>
      </div>
    );
  }

  return <EditProductForm product={product} />;
}