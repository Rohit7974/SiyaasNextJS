"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Products = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      // Get featured product IDs from localStorage
      const featuredIds = JSON.parse(localStorage.getItem('siyaas_featured_products') || '[]');

      if (featuredIds.length === 0) {
        // If no featured products, show empty state or default
        setProducts([]);
        setLoading(false);
        return;
      }

      // Fetch all products and filter by featured IDs
      const candlesRes = await fetch('http://localhost:4000/api/products?category=candles');
      const diffusersRes = await fetch('http://localhost:4000/api/products?category=diffusers');
      
      const candles = candlesRes.ok ? await candlesRes.json() : [];
      const diffusers = diffusersRes.ok ? await diffusersRes.json() : [];
      const allProducts = [...candles, ...diffusers];

      // Filter to only featured products
      const featured = allProducts.filter(p => featuredIds.includes(p._id));
      setProducts(featured);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-light text-center mb-4 tracking-widest">
          NEW LAUNCHES
        </h2>

        <p className="text-center text-gray-600 mb-12 font-light tracking-wide">
          Explore our carefully curated selections
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="text-center cursor-pointer group flex flex-col border border-gray-200/60 rounded-xl p-3 transition-all duration-300 hover:border-gray-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
              onClick={() => router.push(`/products/${product._id}`)}
            >


              <div className="w-full aspect-square rounded-lg overflow-hidden relative mb-4 md:mb-6">

                <Image
                  src={product.images && product.images[0] ? product.images[0] : "/candle.webp"}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                />

                <Image
                  src={product.images && product.images[1] ? product.images[1] : (product.images && product.images[0] ? product.images[0] : "/loading.gif")}
                  alt="hover"
                  fill
                  className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              <h3 className="text-sm md:text-lg font-light mb-1 md:mb-2 tracking-wide truncate transition-all duration-300 group-hover:text-green-600 group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]">
                {product.name}
              </h3>

              <p className="text-[11px] md:text-base text-gray-600 mb-2 md:mb-3 font-light line-clamp-2 min-h-[2.5rem]">
                {product.description}
              </p>

              <div className="mt-2">
                {product.mrp && (
                  <span className="text-gray-400 line-through mr-2 text-sm">
                    Rs. {product.mrp}
                  </span>
                )}
                <span className="text-gray-900 font-light tracking-wide text-base">
                  Rs. {product.price}
                </span>
              </div>

             <button className="mt-auto w-full bg-[#8B5A2B] text-white py-2 px-4 rounded tracking-tight text-sm hover:bg-[#7A4920] transition-all duration-200 shadow-sm">
               Buy Now
             </button>


            </div>
          ))}
        </div>
           <div className="flex justify-center mt-10 md:mt-12">
          <button 
            onClick={() => router.push('/products')}
            className="bg-[#8B5A2B] text-white px-6 md:px-8 py-2 md:py-3 rounded-md hover:bg-gray-800 transition text-sm md:text-base"
          >
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
