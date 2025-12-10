// app/(storefront)/page.tsx
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import ProductCard from "@/components/products/ProductCard";


export const revalidate = 60;

export default async function Home() {
  // Fetch featured products from database
  const featuredProducts = await prisma.product.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      sizes: true,
    }
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Gradient */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-blue-400">New Collection 2024</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Wear Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Personality
                </span>
              </h1>
              
              <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                Premium quality tees with unmatched comfort. Customize your own design 
                or choose from our exclusive collection. Made with love, delivered with care.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/products"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="relative z-10">Shop Collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Link>
                
                <Link
                  href="/custom"
                  className="group px-8 py-4 border-2 border-gray-700 rounded-lg font-semibold text-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-300"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Custom Design
                  </span>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">500+</div>
                  <div className="text-sm text-gray-500">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">24h</div>
                  <div className="text-sm text-gray-500">Delivery Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-sm text-gray-500">Quality Guarantee</div>
                </div>
              </div>
            </div>

            {/* Hero Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative h-64 rounded-2xl overflow-hidden border border-gray-800 group">
                    <Image
                      src="/images/tshirts/one.jpeg"
                      alt="Classic Black"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden border border-gray-800 group">
                    <Image
                      src="/images/tshirts/three.jpeg"
                      alt="Logo Black"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="relative h-48 rounded-2xl overflow-hidden border border-gray-800 group">
                    <Image
                      src="/images/tshirts/two.jpeg"
                      alt="Classic White"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden border border-gray-800 group">
                    <Image
                      src="/images/models/modelone.jpeg"
                      alt="Model"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-sm font-semibold">Featured Model</div>
                        <div className="text-xs text-gray-400">Premium Cotton Fit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-4">
              <span className="text-blue-400">★</span>
              <span className="text-sm font-medium">Featured Collection</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Discover Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Premium Tees
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Handpicked selection of our best-selling t-shirts. Quality, comfort, and style combined.
            </p>
          </div>

          {/* Product Grid */}
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No Products Yet</h3>
              <p className="text-gray-400">Check back soon for new arrivals!</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 border-2 border-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-400 transition-all group"
            >
              View All Products
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black to-blue-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <Image
                  src="/images/models/modaltwo.jpeg"
                  alt="Custom T-shirt Design"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Design Overlay Elements */}
                <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-sm font-semibold text-blue-400">Upload Design</div>
                  <div className="text-xs text-gray-400">PNG, JPG, SVG</div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
                  <div className="text-sm font-semibold text-purple-400">Live Preview</div>
                  <div className="text-xs text-gray-400">Real-time 3D View</div>
                </div>
              </div>
              
              {/* Floating Shapes */}
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-purple-400">Custom Design Studio</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold">
                Create Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Signature Style
                </span>
              </h2>
              
              <p className="text-xl text-gray-400 leading-relaxed">
                Unleash your creativity with our custom t-shirt designer. Upload your artwork, 
                choose colors, add text, and see your design come to life in real-time.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Upload Your Art</h4>
                    <p className="text-gray-400">Bring your own designs, logos, or artwork</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Customize Everything</h4>
                    <p className="text-gray-400">Choose colors, placement, size, and fabric</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                    <span className="text-2xl">🚚</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Fast Delivery</h4>
                    <p className="text-gray-400">Get your custom tee delivered in 3-5 days</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <Link
                  href="/custom"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all transform hover:-translate-y-1"
                >
                  <span>Start Designing</span>
                  <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="relative rounded-3xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900/50 to-black p-12">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
            
            <h2 className="text-4xl font-bold mb-6 relative z-10">
              Ready to Make Your Mark?
            </h2>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of customers who trust us for premium quality and 
              exceptional service. Your perfect tee is just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all"
              >
                Shop Now
              </Link>
              
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-gray-700 rounded-lg font-semibold text-lg hover:border-blue-500 hover:text-blue-400 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}