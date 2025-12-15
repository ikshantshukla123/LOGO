// app/(storefront)/products/[id]/page.tsx
import { prisma } from "@/lib/db";
import { Suspense } from 'react'
import ProductDetailsClient from "./ProductDetailsClient";
import ProductDetailsSkeleton from "@/components/products/ProductDetailsSkeleton";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function ProductDetailsContent({ productId }: { productId: string }) {
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

  return <ProductDetailsClient product={product} />;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  // Resolve params first
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent productId={productId} />
    </Suspense>
  );
}