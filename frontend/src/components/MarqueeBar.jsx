import React from "react"
import { FaTruck, FaUndo, FaTag } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"

const MarqueeBar = () => {
  const items = [
    { icon: <FaUndo />, text: "6 Days Easy Return" },
    { icon: <MdLocationOn />, text: "Cash On Delivery Available" },
    { icon: <FaTruck />, text: "Free Domestic Shipping" },
    { icon: <FaTag />, text: "EMI Option Available" },
  ]

  const row = (
    <div className="flex items-center gap-12 whitespace-nowrap">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 text-sm font-medium mx-6"
        >
          <span className="text-lg">{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="fixed top-0 left-0 w-full bg-[#8B5A2B] text-white py-3 overflow-hidden z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {row}
          {row}
        </div>
      </div>
    </div>
  )
}

export default MarqueeBar