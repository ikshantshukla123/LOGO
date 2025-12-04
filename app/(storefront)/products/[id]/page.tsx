export const dynamic = "force-dynamic";

import Image from "next/image";
import { notFound } from "next/navigation";
import ProductClientSection from "@/components/products/ProductClientSection";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const products = [
  {
    id: "1",
    name: "Classic Black Tee",
    price: 799,
    description: "A premium quality black T-shirt perfect for everyday wear.",
    images: ["/images/tshirts/one.jpeg"],
  },
  {
    id: "2",
    name: "Classic White Tee",
    price: 799,
    description: "A clean and minimal white tee for any occasion.",
    images: ["/images/tshirts/two.jpeg"],
  },
];

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params; // 👍 now valid because this is server
  const product = products.find((p) => p.id === id);

  if (!product) return notFound();

  return (
    <div className="min-h-screen px-8 md:px-20 py-20 max-w-7xl mx-auto">

      <div className="flex flex-col md:flex-row gap-16">
        
        {/* LEFT IMAGES */}
        <div className="relative w-full md:w-1/2 h-[450px] rounded-2xl overflow-hidden">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>

        {/* RIGHT INFO (client logic separated) */}
        <ProductClientSection product={product} />

      </div>

    </div>
  );
}
