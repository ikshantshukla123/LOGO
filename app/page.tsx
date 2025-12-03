import Image from "next/image";

export default function Home() {
  const tshirts = [
    { id: 1, src: "/images/tshirts/one.jpeg", name: "Classic Black" },
    { id: 2, src: "/images/tshirts/two.jpeg", name: "Classic White" },
    { id: 3, src: "/images/tshirts/three.jpeg", name: "Logo Black Tee" },
    { id: 4, src: "/images/tshirts/four.jpeg", name: "Logo White Tee" },
    { id: 5, src: "/images/tshirts/five.jpeg", name: "Premium Black" },
    { id: 6, src: "/images/tshirts/six.jpeg", name: "Premium White" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-20 gap-10">
        <div className="flex flex-col gap-6 max-w-lg">
          <h1 className="text-5xl font-bold text-black dark:text-white">
            Premium <span className="text-blue-600">LOGO</span> T-Shirts
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            High-quality black & white tees designed for comfort and style.  
            You can also create <span className="font-semibold">customized T-Shirts</span> with your own designs.
          </p>

          <div className="flex gap-4 mt-4">
            <a
              href="#products"
              className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition"
            >
              Shop Now
            </a>
            <a
              href="/custom"
              className="px-6 py-3 rounded-full border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition"
            >
              Customize
            </a>
          </div>
        </div>

        {/* Model Image */}
        <div className="relative">
          <Image
            src="/images/models/modelone.jpeg"
            alt="Model wearing T-shirt"
            width={450}
            height={450}
            className="rounded-2xl shadow-lg object-cover"
            priority
          />
        </div>
      </section>

      {/* T-Shirt Grid */}
      <section id="products" className="px-8 md:px-20 py-16">
        <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">
          Our Collection
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {tshirts.map((tshirt) => (
            <div key={tshirt.id} className="group">
              <div className="w-full h-64 overflow-hidden rounded-xl shadow-md">
                <Image
                  src={tshirt.src}
                  alt={tshirt.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <p className="mt-3 text-lg font-medium text-center text-black dark:text-white">
                {tshirt.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Customization Section */}
      <section className="px-8 md:px-20 py-20 bg-zinc-100 dark:bg-zinc-900">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <Image
            src="/images/models/modaltwo.jpeg"
            alt="Custom T-shirt"
            width={450}
            height={450}
            className="rounded-xl shadow-lg object-cover"
          />

          <div className="max-w-lg flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-black dark:text-white">
              Want Something Unique?
            </h2>

            <p className="text-zinc-700 dark:text-zinc-300 text-lg">
              Upload your own design or text and we'll print a premium custom T-shirt just for you.
            </p>

            <a
              href="/custom"
              className="px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition self-start"
            >
              Customize Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
