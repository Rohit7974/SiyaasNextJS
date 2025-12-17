'use client'

import React, { useState, useEffect } from "react"

const reviews = [
  {
    video: "/video/video1.mp4",
    author: "Aarushi Mehta — Lifestyle Blogger",
    stars: 5,
  },
  {
    video: "/video/video2.mp4",
    author: "Riyan Sood — Home Decor Enthusiast",
    stars: 4,
  },
  {
    video: "/video/video3.mp4",
    author: "Naina Kapoor — Interior Designer",
    stars: 5,
  },
  {
    video: "/video/video4.mp4",
    author: "Karan Malhotra — Candle Lover",
    stars: 5,
  },
   {
    video: "/video/video1.mp4",
    author: "Aarushi Mehta — Lifestyle Blogger",
    stars: 5,
  },
  {
    video: "/video/video2.mp4",
    author: "Riyan Sood — Home Decor Enthusiast",
    stars: 4,
  },
  {
    video: "/video/video3.mp4",
    author: "Naina Kapoor — Interior Designer",
    stars: 5,
  },
  {
    video: "/video/video4.mp4",
    author: "Karan Malhotra — Candle Lover",
    stars: 5,
  },
   {
    video: "/video/video1.mp4",
    author: "Aarushi Mehta — Lifestyle Blogger",
    stars: 5,
  },
  {
    video: "/video/video2.mp4",
    author: "Riyan Sood — Home Decor Enthusiast",
    stars: 4,
  },
  {
    video: "/video/video3.mp4",
    author: "Naina Kapoor — Interior Designer",
    stars: 5,
  },
  {
    video: "/video/video4.mp4",
    author: "Karan Malhotra — Candle Lover",
    stars: 5,
  }
]

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
                <p className="mt-4 text-sm opacity-90">
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
