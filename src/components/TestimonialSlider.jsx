'use client'

import React, { useState, useEffect } from "react"

const testimonials = [
  {
    quote:
      "Scented Scandal candles transform my entire room. The fragrances last so long and feel incredibly premium.",
    author: "Aarushi Mehta — Lifestyle Blogger",
    stars: 5,
  },
  {
    quote:
      "These are the only candles I use now. The scents are rich yet soothing, and the jars look aesthetic on my shelf.",
    author: "Riyan Sood — Home Decor Enthusiast",
    stars: 4,
  },
  {
    quote:
      "Scented Scandal has mastered luxury fragrances at an affordable price. My favourite discovery this year!",
    author: "Naina Kapoor — Interior Designer",
    stars: 5,
  },
]

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const current = testimonials[index]

  return (
    <div className="w-full bg-[#8B5A2B] text-white py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-yellow-300 text-2xl mb-4 flex justify-center">
          {Array.from({ length: current.stars }).map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>

        <p className="text-xl md:text-2xl font-light leading-relaxed">
          "{current.quote}"
        </p>

        <p className="mt-6 text-sm md:text-base opacity-90">
          — {current.author}
        </p>

        <div className="flex justify-center mt-8 space-x-3">
          {testimonials.map((_, i) => (
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