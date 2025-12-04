"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavItem {
  name: string;
  path: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <nav className="w-full backdrop-blur-lg bg-white/70 dark:bg-black/40 shadow-md sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          LOGO
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-[16px] font-medium transition-all duration-200 ${
                pathname === item.path
                  ? "text-zinc-900 dark:text-white font-semibold border-b-2 border-zinc-900 dark:border-white pb-1"
                  : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-4xl text-zinc-800 dark:text-zinc-100"
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="md:hidden bg-white/90 dark:bg-black/60 backdrop-blur-lg shadow-lg border-t border-zinc-200 dark:border-zinc-700 animate-fade-down">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className="block w-full px-6 py-4 text-lg font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800 transition-all"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
