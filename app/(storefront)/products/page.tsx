import Link from "next/link";
import { Image } from "@imagekit/next";
import { prisma } from "@/lib/db";

export default async function ProductsPage() {
  const products = await prisma.product.findMany();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((p) => (
        <Link href={`/products/${p.id}`} key={p.id}>
          <div className="relative w-full h-80 rounded-xl overflow-hidden bg-zinc-100">

            {p.images?.[0] ? (
              <Image
                src={p.images[0]}
                alt={p.name}
                width={500}
                height={500}
                transformation={[{ width: 500, height: 500 }]}
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-zinc-400">
                No Image
              </div>
            )}

          </div>

          <h2 className="mt-2 text-lg font-bold">{p.name}</h2>
          <p className="text-zinc-600">₹{p.price}</p>
        </Link>
      ))}
    </div>
  );
}
