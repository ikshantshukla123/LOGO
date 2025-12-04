import Image from "next/image";
import Link from "next/link";



export default function ProductsPage(){

 const products = [
    { id: "1", name: "Classic Black Tee", price: 799, image: "/images/tshirts/one.jpeg" },
    { id: "2", name: "Classic White Tee", price: 799, image: "/images/tshirts/two.jpeg" },
    { id: "3", name: "Logo Black Tee", price: 999, image: "/images/tshirts/three.jpeg" },
    { id: "4", name: "Premium Black Tee", price: 1299, image: "/images/tshirts/four.jpeg" },
    { id: "5", name: "Premium White Tee", price: 1299, image: "/images/tshirts/five.jpeg" },
    { id: "6", name: "Graphic White Tee", price: 999, image: "/images/tshirts/six.jpeg" },
  ];


  
    return (
    <div className="min-h-screen px-8 md:px-20 py-20 max-w-7xl mx-auto bg-white dark:bg-black text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-10 text-center">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center">
        {products.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="group w-full max-w-xs cursor-pointer"
          >
            {/* Image */}
            <div className="relative w-full h-80 overflow-hidden rounded-2xl shadow-lg bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-110 transition-all duration-500 ease-out"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>

            {/* Details */}
            <div className="mt-4 text-center">
              <p className="text-xl font-semibold">{product.name}</p>
              <p className="text-lg text-zinc-600 dark:text-zinc-300">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

