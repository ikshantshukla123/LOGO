"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Search, Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Standard Tailwind class merger utility

export default function Navbar() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const cartCount = items.reduce((t, i) => t + i.quantity, 0);

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        isScrolled 
          ? "bg-black/80 backdrop-blur-md border-zinc-800 h-16" 
          : "bg-black border-transparent h-20"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        
        {/* LEFT: LOGO & DESKTOP NAV */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-black tracking-tighter uppercase">
            LOGO
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <NavItem label="Home" href="/" active={pathname === "/"} />
            
            {/* MEGA MENU TRIGGER */}
            <div
              onMouseEnter={() => setOpenMenu("bottom")}
              onMouseLeave={() => setOpenMenu(null)}
              className="relative py-4"
            >
              <button className="flex items-center gap-1 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Shop <ChevronDown className={cn("w-4 h-4 transition-transform", openMenu && "rotate-180")} />
              </button>

              {/* MEGA MENU PANEL */}
              {openMenu === "bottom" && (
                <div className="absolute left-0 top-full pt-2 w-[600px] animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-zinc-950 border border-zinc-800 p-8 grid grid-cols-3 gap-8 rounded-xl shadow-2xl">
                    <MegaColumn title="Bottoms" items={["Joggers", "Shorts", "Cargos"]} />
                    <MegaColumn title="Tops" items={["Hoodies", "T-Shirts", "Sweatshirts"]} />
                    <MegaColumn title="Featured" items={["New Arrivals", "Best Sellers"]} />
                  </div>
                </div>
              )}
            </div>

            <NavItem label="All Products" href="/products" active={pathname === "/products"} />
          </nav>
        </div>

        {/* RIGHT: SEARCH & CART */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-lg focus-within:ring-1 ring-zinc-500 transition-all">
            <Search className="w-4 h-4 text-zinc-500" />
            <input
              placeholder="Search..."
              className="bg-transparent border-none outline-none text-sm ml-2 w-40 focus:w-56 transition-all text-white"
            />
          </div>

          <Link href="/cart" className="relative p-2 hover:bg-zinc-900 rounded-full transition-colors">
            <ShoppingBag className="w-6 h-6 text-zinc-200" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* MOBILE TOGGLE */}
          <button 
            className="lg:hidden p-2 text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU PANEL */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] bg-black z-40 p-6 flex flex-col gap-6 animate-in slide-in-from-right">
           <NavItem label="Home" href="/" active={pathname === "/"} />
           <NavItem label="All Products" href="/products" active={pathname === "/products"} />
           <NavItem label="Cart" href="/cart" active={pathname === "/cart"} />
        </div>
      )}
    </header>
  );
}

function NavItem({ label, href, active }: { label: string; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-white",
        active ? "text-white" : "text-zinc-400"
      )}
    >
      {label}
    </Link>
  );
}

function MegaColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{title}</h3>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item}>
            <Link href="#" className="text-sm text-zinc-300 hover:text-blue-400 transition-colors">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}