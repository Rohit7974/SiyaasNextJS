"use client"

import React, { useState, useEffect } from "react"
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaChevronDown,
  FaArrowUp,
} from "react-icons/fa"
import { MdEmail, MdLocationOn } from "react-icons/md"

const Footer = () => {
  const [openPolicy, setOpenPolicy] = useState(false)
  const [openSupport, setOpenSupport] = useState(false)
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer
      id="contact"
      className="bg-[#CFA36F] text-gray-700 pt-12 pb-6 border-t"
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

         
          <div>
            <img src="/siyaas-removebg-preview.png" className="w-24 mb-4" />
            <p className="text-gray-600 mb-6">Scented Candles.</p>

            <div className="flex space-x-4">
              <IconWrap><FaInstagram /></IconWrap>
              <IconWrap><FaFacebookF /></IconWrap>
              <IconWrap><FaYoutube /></IconWrap>
            </div>
          </div>

       
          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li className="hover:text-gray-900 cursor-pointer">Candles</li>
              <li className="hover:text-gray-900 cursor-pointer">Soaps</li>
              <li className="hover:text-gray-900 cursor-pointer">Combos</li>
              <li className="hover:text-gray-900 cursor-pointer">Bestsellers</li>
            </ul>
          </div>

         
          <div>
            <button
              onClick={() => setOpenPolicy(!openPolicy)}
              className="w-full flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-lg font-semibold">Policy</h3>
              <FaChevronDown
                className={`md:hidden transition-transform ${
                  openPolicy ? "rotate-180" : ""
                }`}
              />
            </button>

            <ul
              className={`mt-4 space-y-2 overflow-hidden transition-all
                ${openPolicy ? "max-h-96" : "max-h-0 md:max-h-96"}
              `}
            >
              <li className="hover:text-gray-900 cursor-pointer">Shipping Policy</li>
              <li className="hover:text-gray-900 cursor-pointer">Cancellation & Refund</li>
              <li className="hover:text-gray-900 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-gray-900 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

       
          <div>
            <button
              onClick={() => setOpenSupport(!openSupport)}
              className="w-full flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-lg font-semibold">Support</h3>
              <FaChevronDown
                className={`md:hidden transition-transform ${
                  openSupport ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`mt-4 space-y-4 overflow-hidden transition-all
                ${openSupport ? "max-h-96" : "max-h-0 md:max-h-96"}
              `}
            >
              <div className="flex items-center gap-2">
                <MdEmail className="text-green-700" />
                <span>siya.com</span>
              </div>

              <a className="inline-flex items-center gap-2 bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600">
                <FaWhatsapp /> Chat on WhatsApp
              </a>

              <div className="flex items-start gap-2">
                <MdLocationOn className="text-green-700 mt-1" />
                <p className="text-sm">IT Park, Bhopal</p>
              </div>
            </div>
          </div>
        </div>

       
        <div className="flex flex-col md:sflex-row justify-between items-center mt-12 pt-6 border-t">
          <p className="text-sm">© 2025 Siya. All rights reserved.</p>

          <div className="flex space-x-3 mt-4 md:mt-0">
            <img src="/visa.png" className="h-6" />
            <img src="/mastercard.png" className="h-6" />
            <img src="/paytm.png" className="h-6" />
            <img src="/rupay.png" className="h-6" />
          </div>
        </div>
      </div>

     
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        
        {showTop && (
          <button
            onClick={scrollToTop}
            className="bg-black/70 text-white p-3 rounded-full shadow hover:bg-black transition"
          >
            <FaArrowUp size={18} />
          </button>
        )}

        
        <button className="bg-green-500 text-white p-4 rounded-full shadow hover:bg-green-600">
          <FaWhatsapp size={26} />
        </button>
      </div>
    </footer>
  )
}

const IconWrap = ({ children }) => (
  <div className="p-3 rounded-full border hover:bg-gray-100 cursor-pointer">
    {children}
  </div>
)

export default Footer
