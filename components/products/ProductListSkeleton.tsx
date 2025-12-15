// components/products/ProductListSkeleton.tsx
export default function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-xl p-4 border border-gray-800 animate-pulse">
          <div className="h-64 bg-gray-800 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-gray-800 rounded"></div>
        </div>
      ))}
    </div>
  )
}