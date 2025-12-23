'use client'

import React, { useState, useEffect } from "react"

const reviews = [
  {
    video: "/video/video1.mp4",
    author: "Aarushi Mehta",
    review: "Soft lavender aroma, burns clean and fills the room beautifully.",
    stars: 5,
  },
  {
    video: "/video/video2.mp4",
    author: "Riyan Sood",
    review: "Elegant jar, subtle fragrance, perfect for cozy evenings.",
    stars: 4,
  },
  {
    video: "/video/video3.mp4",
    author: "Naina Kapoor",
    review: "Adds warmth to the space, fragrance is balanced and calming.",
    stars: 5,
  },
  {
    video: "/video/video4.mp4",
    author: "Karan Malhotra",
    review: "Long burn time and premium feel, easily one of my favorites.",
    stars: 5,
  },
  {
    video: "/video/video1.mp4",
    author: "Aarushi Mehta",
    review: "Clean burn with no smoke, very relaxing scent.",
    stars: 5,
  },
  {
    video: "/video/video2.mp4",
    author: "Riyan Sood",
    review: "Looks luxurious and smells amazing without being overpowering.",
    stars: 4,
  },
  {
    video: "/video/video3.mp4",
    author: "Naina Kapoor",
    review: "Perfect for modern interiors, fragrance feels natural.",
    stars: 5,
  },
  {
    video: "/video/video4.mp4",
    author: "Karan Malhotra",
    review: "Even burn and rich aroma, worth every rupee.",
    stars: 5,
  },
  {
    video: "/video/video1.mp4",
    author: "Aarushi Mehta",
    review: "Creates a spa-like vibe at home, absolutely love it.",
    stars: 5,
  },
  {
    video: "/video/video2.mp4",
    author: "Riyan Sood",
    review: "Great fragrance throw, ideal for gifting too.",
    stars: 4,
  },
  {
    video: "/video/video3.mp4",
    author: "Naina Kapoor",
    review: "Premium candle that enhances mood and ambiance.",
    stars: 5,
  },
  {
    video: "/video/video4.mp4",
    author: "Karan Malhotra",
    review: "Smooth burn, soothing scent, highly recommended.",
    stars: 5,
  },
];




export default function ReelReviewSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-[#8B5A2B] text-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">

        
        <div className="text-yellow-300 text-2xl mb-8 flex justify-center">
          {Array.from({ length: reviews[index].stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

       
        <div className="relative flex justify-center">
  <div
    className="flex transition-transform duration-700 ease-in-out"
    style={{
      transform: `translateX(calc(50% - ${index * 260 + 130}px))`,
    }}
  >

            {reviews.map((item, i) => (
              <div
                key={i}
                className={`flex-shrink-0 w-[220px] mx-5 transition-all duration-500
                  ${i === index ? "scale-105" : "scale-95 opacity-70"}
                `}
              >
                <video
                  className="w-full h-[390px] rounded-2xl object-cover shadow-xl"
                  src={item.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                />
                <p className="text-sm leading-relaxed text-white italic">
  “{item.review}”
</p>

<p className="mt-3 text-sm text-white tracking-wide">
  — {item.author}
</p>

              </div>
            ))}
          </div>
        </div>

      
        <div className="flex justify-center mt-10 space-x-3">
          {reviews.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all
                ${i === index ? "bg-white" : "bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
