// app/(storefront)/products/page.tsx
import { Suspense } from 'react'
import ProductListSkeleton from '@/components/products/ProductListSkeleton'
import ProductsContent from './ProductsContent'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header - This can stay outside Suspense since it's static */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-gray-300">Latest Collection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            All Products
          </h1>
          <p className="text-gray-400">
            Discover our premium collection
          </p>
        </div>

        {/* Products Grid with Suspense */}
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductsContent />
        </Suspense>
      </div>
    </div>
  );
}