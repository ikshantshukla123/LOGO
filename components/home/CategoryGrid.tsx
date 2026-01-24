// components/home/CategoryGrid.tsx
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Oversized Fits",
    image: "/images/tshirts/one.jpeg",
    link: "/products?category=oversized",
    cta: "Shop Now",
  },
  {
    title: "Design Your Own",
    image: "/images/models/modaltwo.jpeg",
    link: "/custom",
    cta: "Start Creating",
  },
  {
    title: "Essentials",
    image: "/images/tshirts/two.jpeg",
    link: "/products?category=essentials",
    cta: "View Collection",
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 border-b border-zinc-900">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.link}
            className="group block relative h-[400px] overflow-hidden bg-zinc-900"
          >
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute bottom-6 left-6">
              <h3 className="text-xl font-bold uppercase">{category.title}</h3>
              <span className="text-xs text-zinc-300 border-b border-zinc-500 pb-1">
                {category.cta}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
