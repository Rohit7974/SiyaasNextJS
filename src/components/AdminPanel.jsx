// "use client";

// import React, { useEffect, useState } from "react";
// import { getProducts, saveProducts, getCategories, saveCategories } from "@/utils/adminStorage";
// import { COLORS } from "@/constants/colors";

// export default function AdminPanel() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [password, setPassword] = useState("");
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);

 
//   const [name, setName] = useState("");
//   const [desc, setDesc] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [imageData, setImageData] = useState("");

//   useEffect(() => {
//     const ok = typeof window !== "undefined" && sessionStorage.getItem("siya_is_admin") === "true";
//     setIsAdmin(Boolean(ok));
//     setProducts(getProducts());
//     setCategories(getCategories());
//   }, []);

//   function handleLogin(e) {
//     e.preventDefault();
//     const envPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "admin123";
//     if (password === envPass) {
//       sessionStorage.setItem("siya_is_admin", "true");
//       setIsAdmin(true);
//     } else {
//       alert("Incorrect password");
//     }
//   }

//   function handleImageUpload(file) {
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => setImageData(reader.result);
//     reader.readAsDataURL(file);
//   }

//   function addCategory(e) {
//     e.preventDefault();
//     if (!category) return;
//     const next = Array.from(new Set([...categories, category]));
//     setCategories(next);
//     saveCategories(next);
//     setCategory("");
//   }

//   function addProduct(e) {
//     e.preventDefault();
//     const prod = {
//       id: Date.now(),
//       name,
//       description: desc,
//       price,
//       category: category || (categories[0] || "default"),
//       image: imageData,
//       reviews: [],
//     };
//     const next = [prod, ...products];
//     setProducts(next);
//     saveProducts(next);
//     setName("");
//     setDesc("");
//     setPrice("");
//     setImageData("");
//   }

//   function removeProduct(id) {
//     const next = products.filter((p) => p.id !== id);
//     setProducts(next);
//     saveProducts(next);
//   }

//   if (!isAdmin) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <form onSubmit={handleLogin} className="p-8 rounded shadow max-w-sm w-full">
//           <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter admin password"
//             className="w-full p-2 border rounded mb-3"
//             type="password"
//           />
//           <button type="submit" className="w-full py-2 rounded text-white" style={{ backgroundColor: COLORS.primary }}>
//             Unlock
//           </button>
//           <p className="text-xs text-gray-500 mt-3">Set env var NEXT_PUBLIC_ADMIN_PASS to change the password.</p>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen py-10">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>

//         <section className="mb-6 p-4 border rounded">
//           <h2 className="font-medium mb-3">Categories</h2>
//           <form onSubmit={addCategory} className="flex gap-2">
//             <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category name" className="p-2 border rounded flex-1" />
//             <button className="px-4 rounded text-white" style={{ backgroundColor: COLORS.primary }}>Add</button>
//           </form>
//           <div className="mt-3 flex gap-2 flex-wrap">
//             {categories.map((c) => (
//               <span key={c} className="px-3 py-1 bg-gray-100 rounded text-sm">{c}</span>
//             ))}
//           </div>
//         </section>

//         <section className="mb-6 p-4 border rounded">
//           <h2 className="font-medium mb-3">Add Product</h2>
//           <form onSubmit={addProduct} className="grid grid-cols-1 gap-3">
//             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className="p-2 border rounded" />
//             <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="p-2 border rounded" />
//             <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="p-2 border rounded" />
//             <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
//               <option value="">Select category</option>
//               {categories.map((c) => (
//                 <option key={c} value={c}>{c}</option>
//               ))}
//             </select>
//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e.target.files?.[0])}
//               />
//               {imageData && <img src={imageData} alt="preview" className="mt-2 w-32 h-32 object-cover" />}
//             </div>
//             <button className="py-2 rounded text-white w-32" style={{ backgroundColor: COLORS.primary }}>Save product</button>
//           </form>
//         </section>

//         <section className="p-4 border rounded">
//           <h2 className="font-medium mb-3">Products ({products.length})</h2>
//           <div className="grid grid-cols-1 gap-3">
//             {products.map((p) => (
//               <div key={p.id} className="p-3 border rounded flex items-center gap-4">
//                 <div className="w-20 h-20 bg-gray-50 flex items-center justify-center">
//                   {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">No image</div>}
//                 </div>
//                 <div className="flex-1">
//                   <div className="font-medium">{p.name}</div>
//                   <div className="text-sm text-gray-600">{p.description}</div>
//                   <div className="text-sm mt-1">Price: ₹{p.price} • {p.category}</div>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <button onClick={() => removeProduct(p.id)} className="px-3 py-1 rounded text-white" style={{ backgroundColor: COLORS.primary }}>Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { getProducts, saveProducts } from "@/utils/adminStorage";
import { COLORS } from "@/constants/colors";

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");

  const [products, setProducts] = useState([]);

  /* BASIC */
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  /* VARIANT */
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");

  /* SPECIFICATIONS */
  const [wax, setWax] = useState("");
  const [wick, setWick] = useState("");
  const [burnTime, setBurnTime] = useState("");
  const [container, setContainer] = useState("");
  const [fragrance, setFragrance] = useState("");
  const [madeIn, setMadeIn] = useState("");

  /* SAFETY */
  const [childSafe, setChildSafe] = useState(false);
  const [petSafe, setPetSafe] = useState(false);
  const [flammable, setFlammable] = useState(true);

  /* CARE */
  const [ingredients, setIngredients] = useState("");
  const [care, setCare] = useState("");

  /* MEDIA */
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState("");

  useEffect(() => {
    setIsAdmin(sessionStorage.getItem("siya_is_admin") === "true");
    setProducts(getProducts());
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASS || "admin123")) {
      sessionStorage.setItem("siya_is_admin", "true");
      setIsAdmin(true);
    } else alert("Wrong password");
  }

  function handleImageUpload(files) {
    Promise.all(
      Array.from(files).map(
        (file) =>
          new Promise((res) => {
            const r = new FileReader();
            r.onload = () => res(r.result);
            r.readAsDataURL(file);
          })
      )
    ).then(setImages);
  }

  function handleVideoUpload(file) {
    const r = new FileReader();
    r.onload = () => setVideo(r.result);
    r.readAsDataURL(file);
  }

  function addProduct(e) {
    e.preventDefault();

    const product = {
      id: Date.now(),

      sku,
      slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
      name,
      description,
      brand,
      category: [category],

      images,
      video,

      variants: [
        {
          variantId: "default",
          size: weight,
          price: Number(price),
          mrp: Number(mrp),
          stock: Number(stock),
        },
      ],

      specifications: {
        wax,
        wick,
        burn_time_hours: Number(burnTime),
        container,
        fragrance_notes: fragrance.split(",").map((f) => f.trim()),
        made_in: madeIn,
      },

      ingredients: ingredients.split(",").map((i) => i.trim()),
      care_instructions: care.split(",").map((c) => c.trim()),

      safety: {
        child_safe: childSafe,
        pet_safe: petSafe,
        flammable,
      },

      createdAt: new Date(),
    };

    const next = [product, ...products];
    setProducts(next);
    saveProducts(next);

    alert("Product added");
  }

  if (!isAdmin) {
    return (
      <form onSubmit={handleLogin} className="min-h-screen flex items-center justify-center">
        <input
          type="password"
          placeholder="Admin password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Siyaas Admin</h1>

      <form onSubmit={addProduct} className="grid gap-3">

        <input placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="SKU" onChange={(e) => setSku(e.target.value)} />
        <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />
        <input placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
        <input placeholder="Category (Candles)" onChange={(e) => setCategory(e.target.value)} />
        <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

        <h3 className="font-semibold">Variant</h3>
        <input placeholder="Weight / Size" onChange={(e) => setWeight(e.target.value)} />
        <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
        <input placeholder="MRP" onChange={(e) => setMrp(e.target.value)} />
        <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />

        <h3 className="font-semibold">Specifications</h3>
        <input placeholder="Wax Type" onChange={(e) => setWax(e.target.value)} />
        <input placeholder="Wick Type" onChange={(e) => setWick(e.target.value)} />
        <input placeholder="Burn Time (hrs)" onChange={(e) => setBurnTime(e.target.value)} />
        <input placeholder="Container" onChange={(e) => setContainer(e.target.value)} />
        <input placeholder="Fragrance Notes (comma separated)" onChange={(e) => setFragrance(e.target.value)} />
        <input placeholder="Made In" onChange={(e) => setMadeIn(e.target.value)} />

        <h3 className="font-semibold">Safety</h3>
        <label><input type="checkbox" onChange={(e) => setChildSafe(e.target.checked)} /> Child Safe</label>
        <label><input type="checkbox" onChange={(e) => setPetSafe(e.target.checked)} /> Pet Safe</label>
        <label><input type="checkbox" defaultChecked onChange={(e) => setFlammable(e.target.checked)} /> Flammable</label>

        <textarea placeholder="Ingredients (comma separated)" onChange={(e) => setIngredients(e.target.value)} />
        <textarea placeholder="Care Instructions (comma separated)" onChange={(e) => setCare(e.target.value)} />

        <h3 className="font-semibold">Media</h3>
        <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e.target.files)} />
        <input type="file" accept="video/mp4" onChange={(e) => handleVideoUpload(e.target.files[0])} />

        <button className="py-2 text-white rounded" style={{ backgroundColor: COLORS.primary }}>
          Save Product
        </button>
      </form>
    </div>
  );
}
