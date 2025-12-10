// app/(storefront)/products/[id]/page.tsx
import { prisma } from "@/lib/db";
import ProductDetailsClient from "./ProductDetailsClient";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  // Resolve params first
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  // Fetch product from database
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-400">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  // Pass product data to client component
  return <ProductDetailsClient product={product} />;
}