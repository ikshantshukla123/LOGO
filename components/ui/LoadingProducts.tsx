export default function LoadingProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col gap-4 animate-pulse">
          {/* Matches the 3:4 Aspect Ratio of the new card */}
          <div className="aspect-[3/4] w-full bg-zinc-900 rounded-sm" />
          
          <div className="flex flex-col gap-2">
            <div className="h-4 w-2/3 bg-zinc-900 rounded" />
            <div className="h-3 w-1/3 bg-zinc-900 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}