import Image from "next/image";
import { prisma } from "@/lib/db";

export default async function ProductDetailsPage({ params }: any) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto py-20 px-8">
      <div className="flex flex-col md:flex-row gap-16">

        {/* Images */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <div className="relative w-full h-[450px] rounded-2xl overflow-hidden">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                fill
                className="object-cover"
                alt={product.name}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                No Image Available
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-blue-600 mt-4">₹{product.price}</p>
          <p className="mt-6">{product.description}</p>
        </div>

      </div>
    </div>
  );
}
