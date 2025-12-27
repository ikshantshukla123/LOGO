import { prisma } from "@/lib/db";
import ProductCard from "@/components/products/ProductCard";

export default async function ProductsContent() {
  // 1. Fetch products
  const data = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      // We don't need 'sizes' for the card, so we can omit it or keep it
    },
  });

  // 2. Handle Empty State (Styled nicely)
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl">🧥</span>
        </div>
        <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-2">
            No Products Found
        </h3>
        <p className="text-zinc-500 max-w-sm">
            We are currently updating our collection. Please check back later.
        </p>
      </div>
    );
  }

  // 3. Render the Grid (Matches Home Page Style)
  return (
    <>
      <div className="flex items-center justify-between mb-10 border-b border-zinc-900 pb-4">
        <h1 className="text-xl font-bold uppercase tracking-widest text-white">
            All Products
        </h1>
        <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {data.length} Items
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
        {data.map((item) => {
            // FIX: Normalize data to satisfy ProductCard types
            const formattedProduct = {
                ...item,
                price: Number(item.price), // Converts Prisma Decimal to Number
                description: item.description || "", // Handles null description
            };

            return (
                <ProductCard key={item.id} product={formattedProduct} />
            );
        })}
      </div>
    </>
  );
}