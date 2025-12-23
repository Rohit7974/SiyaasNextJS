// // import React, { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";

// // const Header = () => {
// //   const [isOpen, setIsOpen] = useState(false);
// //   const [isScrolled, setIsScrolled] = useState(false);

// //   // Detect scroll
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       if (window.scrollY > 10) {
// //         setIsScrolled(true);
// //       } else {
// //         setIsScrolled(false);
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   return (
// //     <header
// //       className={`
// //         fixed top-0 left-0 w-full z-50 transition-all duration-300 
// //         ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}
// //       `}
// //     >
// //       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
// //         {/* Logo */}
// //         <div className={`text-2xl font-bold transition-all duration-300 
// //           ${isScrolled ? "text-blue-600" : "text-white"}
// //         `}>
// //           MyBrand
// //         </div>

// //         {/* Navigation */}
// //         <nav className="hidden md:flex space-x-8 flex-1 justify-center">
// //           {["Home", "Products", "About", "Contact"].map((item) => (
// //             <Link
// //               key={item}
// //               to={`#${item.toLowerCase()}`}
// //               className={`font-medium transition-all duration-300 
// //                 ${isScrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-gray-200"}
// //               `}
// //             >
// //               {item}
// //             </Link>
// //           ))}
// //         </nav>

// //         {/* Icons */}
// //         <div className="hidden md:flex items-center space-x-6">
// //           {/* Search */}
// //           <div className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search..."
// //               className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 
// //                 ${isScrolled ? "border border-gray-300 text-black" : "bg-white/20 border-white/40 text-white placeholder-white"}
// //               `}
// //             />
// //             <svg
// //               className={`w-5 h-5 absolute right-3 top-2.5 transition-all duration-300 
// //                 ${isScrolled ? "text-gray-400" : "text-white"}
// //               `}
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
// //               />
// //             </svg>
// //           </div>

// //           {/* User Icon */}
// //           <button
// //             className={`${isScrolled ? "text-gray-700" : "text-white"} hover:text-blue-600`}
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
// //               />
// //             </svg>
// //           </button>

// //           {/* Cart Icon */}
// //           <button
// //             className={`${isScrolled ? "text-gray-700" : "text-white"} hover:text-blue-600 relative`}
// //           >
// //             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
// //               />
// //             </svg>
// //             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
// //           </button>
// //         </div>

// //         {/* Mobile Menu Toggle */}
// //         <button
// //           className={`md:hidden ${isScrolled ? "text-gray-700" : "text-white"}`}
// //           onClick={() => setIsOpen(!isOpen)}
// //         >
// //           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //           </svg>
// //         </button>
// //       </div>

// //       {/* Mobile Menu */}
// //       {isOpen && (
// //         <div className="md:hidden bg-white border-t">
// //           <Link to="#home" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
// //           <Link to="#products" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Products</Link>
// //           <Link to="#about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
// //           <Link to="#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
// //         </div>
// //       )}
// //     </header>
// //   );
// // };

// // export default Header;/




// // // import React, { useState, useEffect } from 'react';
// // // import { Link } from 'react-router-dom';

// // // export default function Navbar() {
// // //   const [scrolled, setScrolled] = useState(false);
// // //   const [active, setActive] = useState('home');

// // //   useEffect(() => {
// // //     const handleScroll = () => setScrolled(window.scrollY > 20);
// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => window.removeEventListener('scroll', handleScroll);
// // //   }, []);

// // //   const navItems = [
// // //     { id: 'product', label: 'Product' },
// // //     { id: '', label: 'Customers' },
// // //     { id: 'company', label: 'Company' },
// // //     { id: 'resources', label: 'Resources' }
// // //   ];

// // //   return (
// // //     <header
// // //       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-xl ${
// // //         scrolled ? 'bg-white/80 shadow-md' : 'bg-transparent'
// // //       }`}
// // //     >
// // //       <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
// // //         {/* Logo */}
// // //         <div className="text-2xl font-bold tracking-wide">SIYA</div>

// // //         {/* Center Navigation */}
// // //         <nav className="hidden md:flex space-x-6 items-center">
// // //           {navItems.map((item) => (
// // //             <button
// // //               key={item.id}
// // //               onClick={() => setActive(item.id)}
// // //               className={`relative px-4 py-1 rounded-full transition-all duration-300 text-sm font-medium ${
// // //                 active === item.id ? 'bg-black text-white' : 'text-gray-800'
// // //               }`}
// // //             >
// // //               {item.label}
// // //             </button>
// // //           ))}
// // //         </nav>

// // //         {/* Right Icons */}
// // //         <div className="flex items-center space-x-6 text-gray-800">
// // //           {/* Search */}
// // //           <button>
// // //             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m.85-4.9A7 7 0 1110 3a7 7 0 017.5 8.75z" />
// // //             </svg>
// // //           </button>

// // //           {/* User */}
// // //           <button>
// // //             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a5 5 0 100-10 5 5 0 000 10zm7 9H5a7 7 0 0114 0z" />
// // //             </svg>
// // //           </button>

// // //           {/* Cart */}
// // //           <button className="relative">
// // //             <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
// // //               <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l3 12h10l3-8H6" />
// // //             </svg>
// // //             <span className="absolute -top-2 -right-2 text-xs bg-black text-white rounded-full px-1.5">0</span>
// // //           </button>

// // //           {/* Schedule Button */}
// // //           <button className="hidden md:flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
// // //             Schedule
// // //             <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// // //               <path d="M3 11l8-8m0 0H5m6 0v6" />
// // //             </svg>
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // }
// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 56);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navItems = ["Home", "Products", "About", "Contact"];

//   return (
//   <header
//     className={`
//       fixed left-0 w-full transition-all duration-300 backdrop-blur-xl
//       ${isScrolled ? "top-0 bg-[#8B5A2B] shadow-sm z-50" : "top-12 bg-transparent z-40"}
//     `}
//   >
//       <div className="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
       
//         <div className="flex items-center gap-3">
         
//           <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30">
//             <span className="w-6 h-6 rounded-full bg-white" />
//           </div>
//           <span
//             className={`
//               tracking-[0.2em] text-sm font-light uppercase
//               ${isScrolled ? "text-white" : "text-white"}
//             `}
//           >
//             SIYA
//           </span>
//         </div>

        
//         <nav className="hidden md:flex flex-1 justify-center gap-12 lg:gap-14">
//           {navItems.map((item) => (
//             <Link
//               key={item}
//               to={`#${item.toLowerCase()}`}
//               className={`
//                 text-sm font-light tracking-widest transition-all duration-300
//                 ${isScrolled
//                   ? "text-white hover:text-gray-200"
//                   : "text-white/80 hover:text-white"}
//               `}
//             >
//               {item}
//             </Link>
//           ))}
//         </nav>

 
//         <div className="hidden md:flex items-center gap-6">
      
//           <button
//             className={`
//               transition-colors
//               ${isScrolled ? "text-white" : "text-white"}
//               hover:text-gray-200
//             `}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
//               />
//             </svg>
//           </button>

       
//           <button
//             className={`
//               transition-colors
//               ${isScrolled ? "text-white" : "text-white"}
//               hover:text-gray-200
//             `}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 19a7 7 0 0114 0H5z"
//               />
//             </svg>
//           </button>

//           <button
//             className={`
//               relative transition-colors
//               ${isScrolled ? "text-white" : "text-white"}
//               hover:text-gray-200
//             `}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 4h2l2.4 9h11.2L21 7H6"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 20a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm9 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
//               />
//             </svg>
//             <span className="absolute -top-2 -right-2 bg-green-800 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
//               0
//             </span>
//           </button>
//         </div>

       
//         <button
//           className={`
//             md:hidden transition-colors
//             ${isScrolled ? "text-white" : "text-white"}
//           `}
//           onClick={() => setIsOpen((prev) => !prev)}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {isOpen && (
//         <div className="md:hidden bg-white/95 border-t border-slate-100">
//           {navItems.map((item) => (
//             <Link
//               key={item}
//               to={`#${item.toLowerCase()}`}
//               className="block px-6 py-3 text-sm text-slate-800 hover:bg-slate-50"
//               onClick={() => setIsOpen(false)}
//             >
//               {item}
//             </Link>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { COLORS } from "@/constants/colors";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 56);
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Products", "About", "Contact"];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`
          fixed left-0 w-full transition-all duration-300 backdrop-blur-xl
          ${isScrolled ? "top-0 shadow-sm z-50" : "top-12 bg-transparent z-40"}
        `}
        style={isScrolled ? { backgroundColor: COLORS.white } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between relative">

        
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden absolute left-0 px-2 transition-colors
              ${isScrolled ? "text-black" : "text-white"}
            `}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          
          <nav className="hidden md:flex items-center gap-10 mr-auto">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`
                  text-sm font-light tracking-widest transition-all
                  ${isScrolled
                    ? "text-black hover:text-gray-600"
                    : "text-white/80 hover:text-white"}
                `}
              >
                {item}
              </Link>
            ))}
          </nav>

        
          <div className="absolute left-1/2 -translate-x-1/2">
            <img
              src="/siyaas-removebg-preview.png"
              alt="Siya logo"
              className="w-24 object-contain cursor-pointer hover:opacity-90 transition-opacity"
            />
          </div>

      
          <div className="flex items-center gap-6 ml-auto">
            {["search", "user", "cart"].map((_, i) => (
              <button
                key={i}
                className={`transition-colors
                  ${isScrolled
                    ? "text-black hover:text-gray-600"
                    : "text-white hover:text-gray-200"}
                `}
              >
             
                {i === 0 && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )}
                {i === 1 && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  </svg>
                )}
                {i === 2 && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

     
        {isOpen && (
          <div className="md:hidden backdrop-blur-xl bg-black/40">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-6 py-4 text-sm tracking-widest text-white hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </header>

      
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/80 text-white hover:bg-black transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

export default Header;
