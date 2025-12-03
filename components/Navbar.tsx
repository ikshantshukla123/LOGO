"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";



interface NavItem {
  name: string,
  path:string;
}



export default function Navbar(){
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

const navItems: NavItem[] = [
  {name: "Home", path: "/"},
  {name: "Products", path: "/products"},
  {name: "About", path: "/about"},
  {name: "Contact", path: "/contact"},
];





return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          MyBrand
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium transition ${
                pathname === item.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Hamburger Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
          aria-label="Open Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 border-b text-gray-700 hover:bg-gray-100"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}