'use client'

import { useState, useEffect } from "react"
import Link from "next/link"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/#products" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ]

  return (
    <header
      className={`
        fixed left-0 w-full transition-all duration-300 backdrop-blur-xl
        top-12
        ${isScrolled ? "bg-white shadow-sm z-40" : "bg-transparent z-40"}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-emerald-700/40">
            <span className="w-6 h-6 rounded-full bg-emerald-700" />
          </div>
          <span
            className={`
              tracking-[0.35em] text-xs font-semibold uppercase
              ${isScrolled ? "text-emerald-900" : "text-white"}
            `}
          >
            SIYA
          </span>
        </div>

        <nav className="hidden md:flex flex-1 justify-center gap-8 lg:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                text-sm font-medium tracking-wide transition-colors
                ${isScrolled
                  ? "text-slate-800 hover:text-emerald-700"
                  : "text-white/90 hover:text-white"}
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <button
            className={`
              transition-colors
              ${isScrolled ? "text-slate-800" : "text-white"}
              hover:text-emerald-700
            `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
          </button>

          <button
            className={`
              transition-colors
              ${isScrolled ? "text-slate-800" : "text-white"}
              hover:text-emerald-700
            `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 19a7 7 0 0114 0H5z"
              />
            </svg>
          </button>

          <button
            className={`
              relative transition-colors
              ${isScrolled ? "text-slate-800" : "text-white"}
              hover:text-emerald-700
            `}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h2l2.4 9h11.2L21 7H6"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-emerald-700 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
              0
            </span>
          </button>
        </div>

        <button
          className={`
            md:hidden transition-colors
            ${isScrolled ? "text-slate-800" : "text-white"}
          `}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white/95 border-t border-slate-100">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-6 py-3 text-sm text-slate-800 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header