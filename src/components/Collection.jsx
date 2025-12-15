import React from "react"

const categories = [
  {
    title: "Soaps",
    youtube: "https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0",
  },
  {
    title: "Candles",
    youtube: "https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0",
  },
  {
    title: "Bracelets",
    youtube: "https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0",
  },
]

function Collection() {
  return (
    <div className="w-full py-12">
      <h2 className="text-center text-3xl font-bold mb-4">OUR COLLECTION</h2>
      <p className="text-center text-gray-600 mb-10">
        Explore our finest jewelry videos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-20">
        {categories.map((item, index) => (
          <div key={index} className="flex flex-col items-center group cursor-pointer">
            <div className="w-full h-60 rounded-xl overflow-hidden shadow-md">
              <iframe
                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                src={item.youtube}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collection