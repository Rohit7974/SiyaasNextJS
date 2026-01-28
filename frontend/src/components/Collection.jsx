"use client";

import { useRouter } from "next/navigation";

const categories = [
  {
    title: "Soaps",
    youtube:
      "https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0",
  },
  {
    title: "Candles",
    youtube:
      "https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0",
  },
  {
    title: "Bracelets",
    youtube:
      "https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0",
  },
];

const Collection = () => {
  const router = useRouter();

  return (
    <section className="w-full py-16 bg-white">
      <h2 className="text-center text-4xl md:text-5xl font-light tracking-widest mb-4 text-gray-900">
        OUR COLLECTION
      </h2>

      <p className="text-center text-gray-700 mb-12 text-lg tracking-wide font-light">
        Explore our finest curated selections.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-20">
        {categories.map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center group cursor-pointer"
            onClick={() => router.push(`/categories/${item.title.toLowerCase()}`)}
          >
            <div className="w-full aspect-square rounded-xl overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                src={item.youtube}
                title={item.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>

            <h3 className="mt-4 text-xl md:text-2xl font-light tracking-widest text-gray-900 transition-colors duration-300 group-hover:text-green-600">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Collection;
