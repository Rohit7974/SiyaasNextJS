"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
          ALL PRODUCTS
        </h2>

        <p className="text-center text-gray-600 mb-12 font-light tracking-wide">
          Explore our complete collection
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="
                text-center cursor-pointer group flex flex-col
                border border-gray-200/60
                rounded-xl
                p-3
                transition-all duration-300
                hover:border-gray-300
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]
              "
              onClick={() => router.push(`/products/${product._id}`)}
            >

              <div className="w-full aspect-square rounded-lg overflow-hidden relative mb-4 md:mb-6">

                <Image
                  src={product.images && product.images[0] ? product.images[0] : (product.image || "/candle.webp")}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                />

                <Image
                  src={product.images && product.images[0] ? product.images[0] : (product.image || "/candle.webp")}
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
                {product.oldPrice && (
                  <span className="text-gray-400 line-through mr-2 text-sm">
                    Rs. {product.oldPrice}
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
      </div>
    </section>
  );
}
