// app/(storefront)/products/[id]/page.tsx
import { getProductById } from "@/lib/api/products";
import { Suspense } from "react";
import ProductDetailsClient from "./ProductDetailsClient";
import ProductDetailsSkeleton from "@/components/products/ProductDetailsSkeleton";
import { notFound } from "next/navigation";

// ISR: Revalidate every 5 minutes
export const revalidate = 300;

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>;
}

async function ProductDetailsContent({ productId }: { productId: string }) {
  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  // Convert Prisma Decimal to number for client component
  const formattedProduct = {
    ...product,
    price: Number(product.price),
  };

  return <ProductDetailsClient product={formattedProduct} />;
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const resolvedParams = await params;
  const productId = resolvedParams.id;

  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetailsContent productId={productId} />
    </Suspense>
  );
}