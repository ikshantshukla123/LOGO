// components/products/ProductDetailsSkeleton.tsx
export default function ProductDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-8 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-800 rounded"></div>
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 w-20 bg-gray-800 rounded"></div>
            <div className="h-4 w-4 bg-gray-800 rounded"></div>
            <div className="h-4 w-32 bg-gray-800 rounded"></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery skeleton */}
          <div className="space-y-4">
            {/* Main Image skeleton */}
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800 animate-pulse">
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-gray-800"></div>
                  <div className="absolute left-0 top-0 h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                </div>
              </div>
            </div>

            {/* Thumbnail skeletons */}
            <div className="grid grid-cols-4 gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-lg bg-gray-900 border border-gray-800 animate-pulse">
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info skeleton */}
          <div className="space-y-8">
            <div>
              <div className="h-12 bg-gray-800 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-10 bg-gray-800 rounded w-1/4 mb-6 animate-pulse"></div>
              <div className="inline-block h-10 w-32 bg-gray-800 rounded-full animate-pulse"></div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-4">
              <div className="h-6 bg-gray-800 rounded w-32 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-4/6 animate-pulse"></div>
              </div>
            </div>

            {/* Size Selector skeleton */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-800 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-800 rounded w-20 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-800 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart skeleton */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-700 rounded-lg">
                  <div className="w-12 h-12 bg-gray-800 animate-pulse"></div>
                  <div className="w-12 h-12 bg-gray-800 border-x border-gray-700 animate-pulse"></div>
                  <div className="w-12 h-12 bg-gray-800 animate-pulse"></div>
                </div>
                <div className="h-4 w-32 bg-gray-800 rounded animate-pulse"></div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-14 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg animate-pulse"></div>
                <div className="w-32 h-14 bg-gray-800 rounded-lg animate-pulse"></div>
              </div>

              {/* Additional Info skeleton */}
              <div className="pt-6 border-t border-gray-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-gray-800 rounded animate-pulse"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 bg-gray-800 rounded animate-pulse"></div>
                  <div className="h-4 w-40 bg-gray-800 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}