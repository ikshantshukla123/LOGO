// components/ui/LoadingProducts.tsx
export default function LoadingProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800 animate-pulse">
          <div className="h-64 bg-gray-800 rounded-xl mb-4"></div>
          <div className="h-4 bg-gray-800 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-800 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-800 rounded"></div>
        </div>
      ))}
    </div>
  )
}