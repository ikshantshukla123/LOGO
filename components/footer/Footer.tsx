import Link from 'next/link';
import { Shirt, Heart, Shield, Truck, RefreshCw } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-gray-300 border-t border-gray-800">
      
      {/* Features Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Shield, title: 'Secure Payment', desc: '100% secure transactions' },
              { icon: Heart, title: 'Premium Quality', desc: 'Ethically sourced materials' }
            ].map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center">
                <div className="p-3 border border-gray-700 bg-gray-900 rounded-full mb-3">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-white">{feature.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shirt className="h-8 w-8 text-white" />
              <span className="text-2xl font-black tracking-tighter text-white">MONOCHROME</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Elevating everyday essentials through thoughtful design and exceptional craftsmanship.
            </p>
          </div>

          {/* Collections */}
          <div>
            <h3 className="font-semibold text-white mb-4">COLLECTIONS</h3>
            <ul className="space-y-2">
              {['Essential Tees', 'Oversized Fit', 'Classic Crew', 'Premium Cotton', 'Limited Capsule', 'Collaborations'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-white mb-4">INFORMATION</h3>
            <ul className="space-y-2">
              {['About Us', 'Our Process', 'Sustainability', 'Careers', 'Press', 'Wholesale'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">STAY CONNECTED</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for updates on new drops and exclusive offers.
            </p>

            {/* Input */}
            <div className="flex border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-gray-900 text-gray-300 text-sm focus:outline-none"
              />
              <button className="bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-200 transition-colors">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <p className="text-gray-500 text-sm">
              © {currentYear} MONOCHROME. All designs are exclusive to our store.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                {['Visa', 'Mastercard', 'Amex', 'PayPal'].map((method) => (
                  <span key={method} className="text-gray-500 text-sm font-medium">
                    {method}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 text-sm">
                <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
