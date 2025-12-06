import Link from 'next/link';
import { Shirt, Home, Search, ShoppingBag } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full mx-auto text-center">
        {/* Header with logo */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Shirt className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">TeeStore</h1>
          </div>
          <p className="text-gray-500">Premium T-Shirts & Apparel</p>
        </div>

        {/* Main 404 Content */}
        <div className="relative">
          {/* Animated floating t-shirts */}
          <div className="absolute top-10 left-10 md:left-20 animate-float-slow">
            <div className="w-16 h-20 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-lg rotate-12"></div>
          </div>
          <div className="absolute top-5 right-10 md:right-20 animate-float">
            <div className="w-14 h-18 bg-gradient-to-r from-green-200 to-teal-200 rounded-lg -rotate-12"></div>
          </div>
          <div className="absolute bottom-10 left-1/3 animate-float-slower">
            <div className="w-12 h-16 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg rotate-6"></div>
          </div>

          {/* 404 Number Display */}
          <div className="relative mb-10">
            <div className="text-9xl font-bold text-gray-800 tracking-tighter">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">4</span>
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">0</span>
              <span className="bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">4</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-8">
            The page you&apos;re looking for seems to have wandered off like a lost t-shirt in the laundry. 
            But don&apos;t worry, we&apos;ve got plenty of great designs waiting for you!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-3 px-8 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <ShoppingBag className="h-5 w-5" />
            Browse Collection
          </Link>
          
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 bg-white text-gray-800 font-semibold py-3 px-8 rounded-full border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Search className="h-5 w-5" />
            Search Products
          </Link>
        </div>

        {/* Popular Collections Section */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Popular Collections You Might Like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {[
              { name: 'Graphic Tees', color: 'bg-blue-100', hover: 'hover:bg-blue-200' },
              { name: 'Limited Edition', color: 'bg-purple-100', hover: 'hover:bg-purple-200' },
              { name: 'Summer Collection', color: 'bg-yellow-100', hover: 'hover:bg-yellow-200' },
              { name: 'Minimalist', color: 'bg-gray-100', hover: 'hover:bg-gray-200' },
            ].map((collection) => (
              <Link
                key={collection.name}
                href={`/collection/${collection.name.toLowerCase().replace(' ', '-')}`}
                className={`${collection.color} ${collection.hover} p-4 rounded-2xl transition-all duration-300 text-gray-800 font-medium`}
              >
                {collection.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-2xl p-6 max-w-2xl mx-auto">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Need Help Finding Something?
          </h4>
          <p className="text-gray-600 mb-4">
            Our customer service team is here to help you find the perfect t-shirt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              href="/faq"
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Visit FAQ
            </Link>
            <Link
              href="/size-guide"
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Size Guide
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} TeeStore. All designs are exclusive to our store.
          </p>
        </div>
      </div>
    </div>
  );
}