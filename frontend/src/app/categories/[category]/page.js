"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function CategoryPage() {
  const { category } = useParams();
  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`http://localhost:4000/api/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, [category]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl md:text-5xl font-light text-center mb-4 tracking-widest">
          {category.toUpperCase()}
        </h2>

        <p className="text-center text-gray-600 mb-12 font-light tracking-wide">
          Explore our {category} collection
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

                {product.images && product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
                )}
              </div>

              <h3 className="
                text-sm md:text-lg font-light mb-1 md:mb-2 tracking-wide truncate
                transition-all duration-300
                group-hover:text-green-600
                group-hover:drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]
              ">
                {product.name}
              </h3>

              <p className="text-[11px] md:text-base text-gray-600 mb-2 md:mb-3 font-light line-clamp-2 min-h-[2.5rem]">
                {product.description}
              </p>

              <div className="mt-2">
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