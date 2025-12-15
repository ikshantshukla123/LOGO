// app/(storefront)/page.tsx
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/lib/db"
import ProductCard from "@/components/products/ProductCard"
import { Suspense } from 'react'
import LoadingProducts from '@/components/ui/LoadingProducts'

export const revalidate = 60

// Separate component for the product fetching
async function FeaturedProducts() {
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
    },
  })

  return (
    <>
      {featuredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6">
            <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-gray-200">No Products Yet</h3>
          <p className="text-lg text-gray-400">Check back soon for new arrivals!</p>
        </div>
      )}
    </>
  )
}

export default async function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-blue-300">New Collection 2024</span>
              </div>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[1.1] text-balance">
                Wear Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-gradient">
                  Personality
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed text-pretty">
                Premium quality tees with unmatched comfort. Customize your own design or choose from our exclusive
                collection.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16">
                <Link
                  href="/products"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40"
                >
                  <span className="relative z-10">Shop Collection</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/custom"
                  className="group px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Create Custom Design
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    500+
                  </div>
                  <div className="text-sm text-gray-400 leading-tight">Happy Customers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    24h
                  </div>
                  <div className="text-sm text-gray-400 leading-tight">Delivery Time</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                    100%
                  </div>
                  <div className="text-sm text-gray-400 leading-tight">Quality Guarantee</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group shadow-lg hover:shadow-blue-500/20 transition-shadow duration-500">
                    <Image
                      src="/images/tshirts/one.jpeg"
                      alt="Classic Black"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 group shadow-lg hover:shadow-purple-500/20 transition-shadow duration-500">
                    <Image
                      src="/images/tshirts/three.jpeg"
                      alt="Logo Black"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="relative h-48 rounded-2xl overflow-hidden border border-white/10 group shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-500">
                    <Image
                      src="/images/tshirts/two.jpeg"
                      alt="Classic White"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group shadow-lg hover:shadow-pink-500/20 transition-shadow duration-500">
                    <Image
                      src="/images/models/modelone.jpeg"
                      alt="Model"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/70 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <div className="text-sm font-semibold">Featured Model</div>
                        <div className="text-xs text-gray-300">Premium Cotton Fit</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
              <span className="text-blue-400">★</span>
              <span className="text-sm font-medium text-gray-300">Featured Collection</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Discover Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400">
                Premium Tees
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed text-pretty">
              Handpicked selection of our best-selling t-shirts. Quality, comfort, and style combined.
            </p>
          </div>

          {/* Product Grid with Suspense */}
          <Suspense fallback={<LoadingProducts />}>
            <FeaturedProducts />
          </Suspense>

          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300 group"
            >
              View All Products
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-500/10">
                <Image
                  src="/images/models/modaltwo.jpeg"
                  alt="Custom T-shirt Design"
                  width={600}
                  height={600}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                  <div className="text-sm font-semibold text-blue-300 mb-1">Upload Design</div>
                  <div className="text-xs text-gray-400">PNG, JPG, SVG</div>
                </div>
                <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-lg">
                  <div className="text-sm font-semibold text-purple-300 mb-1">Live Preview</div>
                  <div className="text-xs text-gray-400">Real-time 3D View</div>
                </div>
              </div>

              {/* Floating Shapes */}
              <div className="absolute -top-8 -left-8 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

         <div className="space-y-8 order-1 lg:order-2">
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
    <span className="text-sm font-medium text-blue-300">Custom Design Studio</span>
  </div>

  <h2 className="text-5xl lg:text-6xl font-bold text-balance">
    Create Your
    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
      Signature Style
    </span>
  </h2>

  <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed text-pretty">
    Unleash your creativity with our custom t-shirt designer. Upload your artwork, choose colors, add text,
    and see your design come to life in real-time.
  </p>

  <div className="space-y-6 pt-4">
    <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group">
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-xl mb-2 text-gray-100">Upload Your Art</h4>
        <p className="text-gray-400 leading-relaxed">Bring your own designs, logos, or artwork</p>
      </div>
    </div>

    <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group">
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-xl mb-2 text-gray-100">Customize Everything</h4>
        <p className="text-gray-400 leading-relaxed">Choose colors, placement, size, and fabric</p>
      </div>
    </div>

    <div className="flex items-start gap-5 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group">
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h4 className="font-semibold text-xl mb-2 text-gray-100">Fast Delivery</h4>
        <p className="text-gray-400 leading-relaxed">Get your custom tee delivered in 3-5 days</p>
      </div>
    </div>
  </div>
              <div className="pt-6">
                <Link
                  href="/custom"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-400 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"
                >
                  <span>Start Designing</span>
                 
                   
                  
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-gray-900/80 via-black to-gray-900/80 backdrop-blur-sm p-16 lg:p-20 text-center shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]"></div>

            <h2 className="text-5xl lg:text-6xl font-bold mb-8 relative z-10 text-balance">Ready to Make Your Mark?</h2>

            <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed text-pretty">
              Join thousands of customers who trust us for premium quality and exceptional service. Your perfect tee is
              just a click away.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-semibold text-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40"
              >
                Shop Now
              </Link>

              <Link
                href="/contact"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-blue-400/50 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>

            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}