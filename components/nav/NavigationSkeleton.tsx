// components/nav/NavigationSkeleton.tsx
export default function NavigationSkeleton() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo skeleton */}
        <div className="flex items-center gap-8">
          <div className="h-8 w-32 bg-gray-800 rounded animate-pulse"></div>
          
          {/* Navigation items skeleton */}
          <div className="hidden md:flex items-center gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        
        {/* Right side skeleton */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block h-10 w-24 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
          <div className="h-10 w-10 bg-gray-800 rounded-full animate-pulse"></div>
        </div>
      </div>
    </header>
  );
}