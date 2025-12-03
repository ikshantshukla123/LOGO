import Image from "next/image";

export default function Home() {
  const tshirts = [
    { id: 1, src: "/images/tshirts/one.jpeg", name: "Classic Black", price: "₹799" },
    { id: 2, src: "/images/tshirts/two.jpeg", name: "Classic White", price: "₹799" },
    { id: 3, src: "/images/tshirts/three.jpeg", name: "Logo Black Tee", price: "₹999" },
    { id: 4, src: "/images/tshirts/four.jpeg", name: "Logo White Tee", price: "₹999" },
    { id: 5, src: "/images/tshirts/five.jpeg", name: "Premium Black", price: "₹1299" },
    { id: 6, src: "/images/tshirts/six.jpeg", name: "Premium White", price: "₹1299" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans">
      
      {/* Hero Section */}
      <section className="px-8 md:px-20 py-24 flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
        
        {/* Left Text Area */}
        <div className="flex flex-col gap-6 max-w-xl">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Premium <span className="text-blue-600">LOGO</span> T-Shirts
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-300 leading-7">
            High-quality black & white tees designed for comfort and style.  
            Build your own <span className="font-semibold text-black dark:text-white">custom T-Shirt</span> with your text, design, logo, or artwork.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="#products"
              className="px-8 py-3 text-lg rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition-all shadow-md"
            >
              Shop Now
            </a>

            <a
              href="/custom"
              className="px-8 py-3 text-lg rounded-full border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow"
            >
              Customize
            </a>
          </div>
        </div>

        {/* Right Model Image */}
        <div className="relative">
          <Image
            src="/images/models/modelone.jpeg"
            alt="Model wearing T-shirt"
            width={480}
            height={480}
            className="rounded-3xl shadow-2xl object-cover ring-1 ring-zinc-300 dark:ring-zinc-700"
            priority
          />
        </div>
      </section>

      {/* T-Shirt Grid */}
      <section id="products" className="px-8 md:px-20 py-20 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center">Our Collection</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 place-items-center">
          {tshirts.map((tshirt) => (
            <div 
              key={tshirt.id} 
              className="group w-full max-w-xs cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative w-full h-80 overflow-hidden rounded-2xl shadow-lg bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={tshirt.src}
                  alt={tshirt.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-500 ease-out"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              </div>

              {/* Details */}
              <div className="mt-4 text-center">
                <p className="text-xl font-semibold">{tshirt.name}</p>
                <p className="text-lg text-zinc-600 dark:text-zinc-300">{tshirt.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Section */}
      <section className="px-8 md:px-20 py-24 bg-zinc-100 dark:bg-zinc-900 mt-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          
          <Image
            src="/images/models/modaltwo.jpeg"
            alt="Custom T-shirt"
            width={480}
            height={480}
            className="rounded-3xl shadow-xl object-cover ring-1 ring-zinc-300 dark:ring-zinc-700"
          />

          <div className="flex flex-col gap-6 max-w-xl">
            <h2 className="text-4xl font-extrabold">Want Something Unique?</h2>

            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-7">
              Upload your design, choose your T-shirt style, pick color, size, and we'll print a premium custom tee just for you.
            </p>

            <a
              href="/custom"
              className="mt-4 px-10 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all text-lg shadow-md self-start"
            >
              Customize Now
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}
