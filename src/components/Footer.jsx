import React from "react"
import Link from "next/link"
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa"
import { MdEmail, MdLocationOn } from "react-icons/md"

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#CFA36F] text-gray-700 pt-12 pb-6 border-t">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/siyaas-removebg-preview.png"
                alt="Siya logo"
                className="w-24 object-contain cursor-pointer hover:opacity-90 transition-opacity"
              />
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Scented Candles.
            </p>

            <div className="flex space-x-4 mt-4">
              <a className="p-3 rounded-full border hover:bg-gray-100 cursor-pointer">
                <FaInstagram size={18} />
              </a>
              <a className="p-3 rounded-full border hover:bg-gray-100 cursor-pointer">
                <FaFacebookF size={18} />
              </a>
              <a className="p-3 rounded-full border hover:bg-gray-100 cursor-pointer">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Candles</li>
              <li className="hover:text-gray-900 cursor-pointer">Soaps</li>
              <li className="hover:text-gray-900 cursor-pointer">Combos</li>
              <li className="hover:text-gray-900 cursor-pointer">Bestsellers</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">About Us</li>
              <li className="hover:text-gray-900 cursor-pointer">Blog</li>
              <li className="hover:text-gray-900 cursor-pointer">Contact Us</li>
              <li className="hover:text-gray-900 cursor-pointer">Shipping Policy</li>
              <li className="hover:text-gray-900 cursor-pointer">Cancellation & Refund</li>
              <li className="hover:text-gray-900 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-gray-900 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>

            <div className="flex items-center space-x-2 mb-3">
              <MdEmail className="text-green-700" size={20} />
              <p className="text-gray-700">siya.com</p>
            </div>

            <a
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full text-sm font-medium shadow hover:bg-green-600 cursor-pointer mb-5"
            >
              <FaWhatsapp size={20} />
              Chat on WhatsApp
            </a>

            <div className="flex items-start space-x-2">
              <MdLocationOn className="text-green-700 mt-1" size={22} />
              <p className="text-gray-700 text-sm leading-relaxed">
                IT park Bhopal
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-6 border-t">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            © 2025 Siya. All rights reserved.
          </p>

          <div className="flex space-x-3">
            <img src="/visa.png" className="h-6" alt="visa" />
            <img src="/mastercard.png" className="h-6" alt="master" />
            <img src="/paytm.png" className="h-6" alt="amex" />
            <img src="/rupay.png" className="h-6" alt="rupay" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-green-600 z-50">
        <FaWhatsapp size={30} />
      </div>
    </footer>
  )
}

export default Footer