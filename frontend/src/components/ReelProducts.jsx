// 'use client';

// import React, { useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const products = [
//   {
//     id: 5,
//     video: "/video/video1.mp4",
//     name: "Aromatic Soy Wax Candle – Vanilla Bliss",
//     price: "599",
//   },
//   {
//     id: 6,
//     video: "/video/video2.mp4",
//     name: "Handmade Beeswax Candle – Pure Honey Aroma",
//     price: "799",
//   },
//   {
//     id: 7,
//     video: "/video/video3.mp4",
//     name: "Luxury 3-Wick Candle – Fresh Lavender",
//     price: "1,299",
//   },
//   {
//     id: 8,
//     video: "/video/video1.mp4",
//     name: "Meditation Candle – Sandalwood Calm",
//     price: "999",
//   },
//   {
//     id: 9,
//     video: "/video/video2.mp4",
//     name: "Decorative Jar Candle – Rose Garden",
//     price: "699",
//   },
//   {
//     id: 10,
//     video: "/video/video3.mp4",
//     name: "Decorative Jar Candle – Rose Garden",
//     price: "699",
//   },
//   {
//     id: 11,
//     video: "/video/video1.mp4",
//     name: "Decorative Jar Candle – Rose Garden",
//     price: "699",
//   },
//   {
//     id: 12,
//     video: "/video/video2.mp4",
//     name: "Decorative Jar Candle – Rose Garden",
//     price: "699",
//   },
// ];

// const ReelProducts = () => {
//   const scrollRef = useRef(null);
//   const router = useRouter();

//   const scrollLeft = () => {
//     scrollRef.current?.scrollBy({ left: -260, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     scrollRef.current?.scrollBy({ left: 260, behavior: "smooth" });
//   };

//   const handleBuyNow = (productId) => {
//     router.push(`/products/${productId}`);
//   };

//   return (
//     <div className="relative w-full py-10 px-4">
//       <h2 className="text-3xl font-bold text-center mb-6">
//         Premium Candle Collection
//       </h2>

//       {/* Left Scroll Button */}
//       <button
//         onClick={scrollLeft}
//         aria-label="Scroll left"
//         className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-xl items-center justify-center transition shadow-lg"
//       >
//         <span className="text-2xl text-black">‹</span>
//       </button>

//       {/* Right Scroll Button */}
//       <button
//         onClick={scrollRight}
//         aria-label="Scroll right"
//         className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-xl items-center justify-center transition shadow-lg"
//       >
//         <span className="text-2xl text-black">›</span>
//       </button>

//       {/* Product Scroll Container */}
//       <div
//         ref={scrollRef}
//         className="px-6 flex gap-5 overflow-x-scroll pb-4 snap-x snap-mandatory scrollbar-hide"
//         style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//       >
//         {products.map((item) => (
//           <div
//             key={item.id}
//             className="min-w-[250px] max-w-[260px] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden snap-start flex flex-col transition-transform duration-300 hover:scale-105"
//           >
//             {/* Video */}
//             <video
//               src={item.video}
//               autoPlay
//               loop
//               muted
//               playsInline
//               className="w-full h-72 object-cover"
//               preload="metadata"
//             />

//             {/* Product Info */}
//             <div className="p-3 flex flex-col justify-between flex-1">
//               <div>
//                 <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
//                   {item.name}
//                 </h3>
//                 <p className="font-semibold text-lg mt-1 text-gray-900">
//                   ₹{item.price}
//                 </p>
//               </div>

//               <button
//                 onClick={() => router.push(`/products/${item.id}`)}
//                 className="mt-3 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-900 transition"
//               >
//                 Buy Now
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>


//     </div>
//   );
// };

// export default ReelProducts;
 'use client';

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Clean single-component ReelProducts

const ReelProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetchReelProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchReelProducts() {
    try {
      const reelIds = JSON.parse(localStorage.getItem('siyaas_reel_products') || '[]');
      if (!reelIds || reelIds.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const res = await fetch('http://localhost:4000/api/products');
      const all = res.ok ? await res.json() : [];

      // Preserve admin order
      const reel = reelIds.map(id => all.find(p => String(p._id) === String(id))).filter(Boolean);
      setProducts(reel);
    } catch (err) {
      console.error('Failed to load reel products', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -260, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 260, behavior: 'smooth' });

  if (loading) return <div className="p-8 text-center">Loading reel...</div>;
  if (products.length === 0) return <div className="p-8 text-center text-gray-500">No reel products selected.</div>;

  return (
    <div className="relative w-full py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-6">Premium Candle Collection</h2>

      <button onClick={scrollLeft} className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-xl items-center justify-center shadow-lg">‹</button>
      <button onClick={scrollRight} className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/10 hover:bg-black/20 backdrop-blur-xl items-center justify-center shadow-lg">›</button>

      <div ref={scrollRef} className="px-6 flex gap-5 overflow-x-scroll pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {products.map((item) => {
          const videoSrc = Array.isArray(item.video) ? item.video[0] : item.video;
          return (
            <div key={item._id} className="min-w-[250px] max-w-[260px] snap-start flex-shrink-0">
              <div className="group perspective-1000">
                <div className="transition-transform duration-300 transform-gpu hover:scale-105 rounded-xl shadow-md overflow-hidden bg-white flex flex-col">
                  {videoSrc ? (
                    <video src={videoSrc} autoPlay loop muted playsInline preload="metadata" className="w-full h-72 object-cover cursor-pointer" onClick={() => setActiveVideo(videoSrc)} />
                  ) : (
                    <div className="w-full h-72 bg-gray-100 flex items-center justify-center">No video</div>
                  )}

                  <div className="p-3 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                      <p className="font-semibold text-lg mt-1">₹{item.price}</p>
                    </div>

                    <button onClick={(e) => { e.stopPropagation(); router.push(`/products/${item._id}`); }} className="mt-3 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-900 transition">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setActiveVideo(null)}>
          <div className="relative w-[90%] max-w-md" onClick={(e) => e.stopPropagation()}>
            <button className="absolute -top-10 right-0 text-white text-3xl" onClick={() => setActiveVideo(null)}>✕</button>
            <video src={activeVideo} controls autoPlay className="w-full rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReelProducts;

