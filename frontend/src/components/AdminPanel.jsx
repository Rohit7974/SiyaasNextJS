// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { getProducts, saveProducts, getCategories, saveCategories } from "@/utils/adminStorage";
// // import { COLORS } from "@/constants/colors";

// // export default function AdminPanel() {
// //   const [isAdmin, setIsAdmin] = useState(false);
// //   const [password, setPassword] = useState("");
// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);

 
// //   const [name, setName] = useState("");
// //   const [desc, setDesc] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [imageData, setImageData] = useState("");

// //   useEffect(() => {
// //     const ok = typeof window !== "undefined" && sessionStorage.getItem("siya_is_admin") === "true";
// //     setIsAdmin(Boolean(ok));
// //     setProducts(getProducts());
// //     setCategories(getCategories());
// //   }, []);

// //   function handleLogin(e) {
// //     e.preventDefault();
// //     const envPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "admin123";
// //     if (password === envPass) {
// //       sessionStorage.setItem("siya_is_admin", "true");
// //       setIsAdmin(true);
// //     } else {
// //       alert("Incorrect password");
// //     }
// //   }

// //   function handleImageUpload(file) {
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = () => setImageData(reader.result);
// //     reader.readAsDataURL(file);
// //   }

// //   function addCategory(e) {
// //     e.preventDefault();
// //     if (!category) return;
// //     const next = Array.from(new Set([...categories, category]));
// //     setCategories(next);
// //     saveCategories(next);
// //     setCategory("");
// //   }

// //   function addProduct(e) {
// //     e.preventDefault();
// //     const prod = {
// //       id: Date.now(),
// //       name,
// //       description: desc,
// //       price,
// //       category: category || (categories[0] || "default"),
// //       image: imageData,
// //       reviews: [],
// //     };
// //     const next = [prod, ...products];
// //     setProducts(next);
// //     saveProducts(next);
// //     setName("");
// //     setDesc("");
// //     setPrice("");
// //     setImageData("");
// //   }

// //   function removeProduct(id) {
// //     const next = products.filter((p) => p.id !== id);
// //     setProducts(next);
// //     saveProducts(next);
// //   }

// //   if (!isAdmin) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <form onSubmit={handleLogin} className="p-8 rounded shadow max-w-sm w-full">
// //           <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
// //           <input
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //             placeholder="Enter admin password"
// //             className="w-full p-2 border rounded mb-3"
// //             type="password"
// //           />
// //           <button type="submit" className="w-full py-2 rounded text-white" style={{ backgroundColor: COLORS.primary }}>
// //             Unlock
// //           </button>
// //           <p className="text-xs text-gray-500 mt-3">Set env var NEXT_PUBLIC_ADMIN_PASS to change the password.</p>
// //         </form>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen py-10">
// //       <div className="max-w-5xl mx-auto">
// //         <h1 className="text-2xl font-semibold mb-6">Admin Panel</h1>

// //         <section className="mb-6 p-4 border rounded">
// //           <h2 className="font-medium mb-3">Categories</h2>
// //           <form onSubmit={addCategory} className="flex gap-2">
// //             <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category name" className="p-2 border rounded flex-1" />
// //             <button className="px-4 rounded text-white" style={{ backgroundColor: COLORS.primary }}>Add</button>
// //           </form>
// //           <div className="mt-3 flex gap-2 flex-wrap">
// //             {categories.map((c) => (
// //               <span key={c} className="px-3 py-1 bg-gray-100 rounded text-sm">{c}</span>
// //             ))}
// //           </div>
// //         </section>

// //         <section className="mb-6 p-4 border rounded">
// //           <h2 className="font-medium mb-3">Add Product</h2>
// //           <form onSubmit={addProduct} className="grid grid-cols-1 gap-3">
// //             <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className="p-2 border rounded" />
// //             <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="p-2 border rounded" />
// //             <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="p-2 border rounded" />
// //             <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border rounded">
// //               <option value="">Select category</option>
// //               {categories.map((c) => (
// //                 <option key={c} value={c}>{c}</option>
// //               ))}
// //             </select>
// //             <div>
// //               <input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={(e) => handleImageUpload(e.target.files?.[0])}
// //               />
// //               {imageData && <img src={imageData} alt="preview" className="mt-2 w-32 h-32 object-cover" />}
// //             </div>
// //             <button className="py-2 rounded text-white w-32" style={{ backgroundColor: COLORS.primary }}>Save product</button>
// //           </form>
// //         </section>

// //         <section className="p-4 border rounded">
// //           <h2 className="font-medium mb-3">Products ({products.length})</h2>
// //           <div className="grid grid-cols-1 gap-3">
// //             {products.map((p) => (
// //               <div key={p.id} className="p-3 border rounded flex items-center gap-4">
// //                 <div className="w-20 h-20 bg-gray-50 flex items-center justify-center">
// //                   {p.image ? <img src={p.image} className="w-full h-full object-cover" /> : <div className="text-xs text-gray-400">No image</div>}
// //                 </div>
// //                 <div className="flex-1">
// //                   <div className="font-medium">{p.name}</div>
// //                   <div className="text-sm text-gray-600">{p.description}</div>
// //                   <div className="text-sm mt-1">Price: ₹{p.price} • {p.category}</div>
// //                 </div>
// //                 <div className="flex flex-col gap-2">
// //                   <button onClick={() => removeProduct(p.id)} className="px-3 py-1 rounded text-white" style={{ backgroundColor: COLORS.primary }}>Delete</button>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </section>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import React, { useEffect, useState } from "react";
// import { getProducts, saveProducts } from "@/utils/adminStorage";
// import { COLORS } from "@/constants/colors";

// export default function AdminPanel() {
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [password, setPassword] = useState("");

//   const [products, setProducts] = useState([]);

//   /* BASIC */
//   const [name, setName] = useState("");
//   const [sku, setSku] = useState("");
//   const [slug, setSlug] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [brand, setBrand] = useState("");

//   /* VARIANT */
//   const [price, setPrice] = useState("");
//   const [mrp, setMrp] = useState("");
//   const [stock, setStock] = useState("");
//   const [weight, setWeight] = useState("");

//   /* SPECIFICATIONS */
//   const [wax, setWax] = useState("");
//   const [wick, setWick] = useState("");
//   const [burnTime, setBurnTime] = useState("");
//   const [container, setContainer] = useState("");
//   const [fragrance, setFragrance] = useState("");
//   const [madeIn, setMadeIn] = useState("");

//   /* SAFETY */
//   const [childSafe, setChildSafe] = useState(false);
//   const [petSafe, setPetSafe] = useState(false);
//   const [flammable, setFlammable] = useState(true);

//   /* CARE */
//   const [ingredients, setIngredients] = useState("");
//   const [care, setCare] = useState("");

//   /* MEDIA */
//   const [images, setImages] = useState([]);
//   const [video, setVideo] = useState("");

//   useEffect(() => {
//     setIsAdmin(sessionStorage.getItem("siya_is_admin") === "true");
//     setProducts(getProducts());
//   }, []);

//   function handleLogin(e) {
//     e.preventDefault();
//     if (password === (process.env.NEXT_PUBLIC_ADMIN_PASS || "admin123")) {
//       sessionStorage.setItem("siya_is_admin", "true");
//       setIsAdmin(true);
//     } else alert("Wrong password");
//   }

//   function handleImageUpload(files) {
//     Promise.all(
//       Array.from(files).map(
//         (file) =>
//           new Promise((res) => {
//             const r = new FileReader();
//             r.onload = () => res(r.result);
//             r.readAsDataURL(file);
//           })
//       )
//     ).then(setImages);
//   }

//   function handleVideoUpload(file) {
//     const r = new FileReader();
//     r.onload = () => setVideo(r.result);
//     r.readAsDataURL(file);
//   }

//   function addProduct(e) {
//     e.preventDefault();

//     const product = {
//       id: Date.now(),

//       sku,
//       slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
//       name,
//       description,
//       brand,
//       category: [category],

//       images,
//       video,

//       variants: [
//         {
//           variantId: "default",
//           size: weight,
//           price: Number(price),
//           mrp: Number(mrp),
//           stock: Number(stock),
//         },
//       ],

//       specifications: {
//         wax,
//         wick,
//         burn_time_hours: Number(burnTime),
//         container,
//         fragrance_notes: fragrance.split(",").map((f) => f.trim()),
//         made_in: madeIn,
//       },

//       ingredients: ingredients.split(",").map((i) => i.trim()),
//       care_instructions: care.split(",").map((c) => c.trim()),

//       safety: {
//         child_safe: childSafe,
//         pet_safe: petSafe,
//         flammable,
//       },

//       createdAt: new Date(),
//     };

//     const next = [product, ...products];
//     setProducts(next);
//     saveProducts(next);

//     alert("Product added");
//   }

//   if (!isAdmin) {
//     return (
//       <form onSubmit={handleLogin} className="min-h-screen flex items-center justify-center">
//         <input
//           type="password"
//           placeholder="Admin password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </form>
//     );
//   }

//   return (
//     <div className="max-w-5xl mx-auto py-10">
//       <h1 className="text-2xl font-semibold mb-6">Siyaas Admin</h1>

//       <form onSubmit={addProduct} className="grid gap-3">

//         <input placeholder="Product Name" onChange={(e) => setName(e.target.value)} />
//         <input placeholder="SKU" onChange={(e) => setSku(e.target.value)} />
//         <input placeholder="Slug" onChange={(e) => setSlug(e.target.value)} />
//         <input placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
//         <input placeholder="Category (Candles)" onChange={(e) => setCategory(e.target.value)} />
//         <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />

//         <h3 className="font-semibold">Variant</h3>
//         <input placeholder="Weight / Size" onChange={(e) => setWeight(e.target.value)} />
//         <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
//         <input placeholder="MRP" onChange={(e) => setMrp(e.target.value)} />
//         <input placeholder="Stock" onChange={(e) => setStock(e.target.value)} />

//         <h3 className="font-semibold">Specifications</h3>
//         <input placeholder="Wax Type" onChange={(e) => setWax(e.target.value)} />
//         <input placeholder="Wick Type" onChange={(e) => setWick(e.target.value)} />
//         <input placeholder="Burn Time (hrs)" onChange={(e) => setBurnTime(e.target.value)} />
//         <input placeholder="Container" onChange={(e) => setContainer(e.target.value)} />
//         <input placeholder="Fragrance Notes (comma separated)" onChange={(e) => setFragrance(e.target.value)} />
//         <input placeholder="Made In" onChange={(e) => setMadeIn(e.target.value)} />

//         <h3 className="font-semibold">Safety</h3>
//         <label><input type="checkbox" onChange={(e) => setChildSafe(e.target.checked)} /> Child Safe</label>
//         <label><input type="checkbox" onChange={(e) => setPetSafe(e.target.checked)} /> Pet Safe</label>
//         <label><input type="checkbox" defaultChecked onChange={(e) => setFlammable(e.target.checked)} /> Flammable</label>

//         <textarea placeholder="Ingredients (comma separated)" onChange={(e) => setIngredients(e.target.value)} />
//         <textarea placeholder="Care Instructions (comma separated)" onChange={(e) => setCare(e.target.value)} />

//         <h3 className="font-semibold">Media</h3>
//         <input type="file" multiple accept="image/*" onChange={(e) => handleImageUpload(e.target.files)} />
//         <input type="file" accept="video/mp4" onChange={(e) => handleVideoUpload(e.target.files[0])} />

//         <button className="py-2 text-white rounded" style={{ backgroundColor: COLORS.primary }}>
//           Save Product
//         </button>
//       </form>
//     </div>
//   );
// }



"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';

export default function AddProduct() {
  const [productType, setProductType] = useState("candle");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState([]);


  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Candles');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [stock, setStock] = useState('');
  const [weightVolume, setWeightVolume] = useState('');
  const [waxType, setWaxType] = useState('');
  const [wickType, setWickType] = useState('');
  const [burnTime, setBurnTime] = useState('');
  const [fragranceNotes, setFragranceNotes] = useState('');
  const [container, setContainer] = useState('');
  const [oilType, setOilType] = useState('');
  const [volume, setVolume] = useState('');
  const [diffuserType, setDiffuserType] = useState('');
  const [refill, setRefill] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [safetyInstructions, setSafetyInstructions] = useState('');
  const [careInstructions, setCareInstructions] = useState('');
  const [tags, setTags] = useState('');

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleVideo = (e) => {
    const files = Array.from(e.target.files);
    setVideo((prev) => [...(Array.isArray(prev) ? prev : (prev ? [prev] : [])), ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const removeVideo = (index) => {
    setVideo(Array.isArray(video) ? video.filter((_, i) => i !== index) : null);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const candlesRes = await fetch('http://localhost:4000/api/products?category=candles');
      const diffusersRes = await fetch('http://localhost:4000/api/products?category=diffusers');
      const candles = candlesRes.ok ? await candlesRes.json() : [];
      const diffusers = diffusersRes.ok ? await diffusersRes.json() : [];

      const mapped = [
        ...candles.map(p => ({ ...p, _type: 'candle' })),
        ...diffusers.map(p => ({ ...p, _type: 'diffuser' })),
      ];
      setProducts(mapped);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  }

  

  const handleEdit = (prod) => {

    setIsEditing(true);
    setEditingId(prod._id || prod.id);
    setProductType(prod._type || (prod.waxType ? 'candle' : 'diffuser'));
    setName(prod.name || '');
    setSku(prod.sku || '');
    setSlug(prod.slug || '');
    setCategory(prod.category || (prod._type === 'candle' ? 'Candles' : 'Diffusers'));
    setDescription(prod.description || '');
    setPrice(prod.price ? String(prod.price) : '');
    setMrp(prod.mrp ? String(prod.mrp) : '');
    setStock(prod.stockQuantity ? String(prod.stockQuantity) : prod.stock ? String(prod.stock) : '');
    setWeightVolume(prod.weightVolume || prod.size || '');
    setWaxType(prod.waxType || 'Soy');
    setWickType(prod.wickType || 'Cotton');
    setBurnTime(prod.burnTime ? String(prod.burnTime) : '');
    setFragranceNotes(prod.fragranceNotes || '');
    setContainer(prod.container || 'Glass Jar');
    setOilType(prod.oilType || '');
    setVolume(prod.volume ? String(prod.volume) : '');
    setDiffuserType(prod.diffuserType || 'Reed');
    setRefill(prod.refillAvailable ? 'Yes' : 'No');
    setIngredients(prod.ingredients || '');
    setSafetyInstructions(prod.safetyInstructions || '');
    setCareInstructions(prod.careInstructions || '');
    setTags((prod.tags && prod.tags.join(',')) || '');
    
    // Set existing images
    if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
      setImages(prod.images);
    } else {
      setImages([]);
    }
    
    // Set existing videos (as array)
    if (prod.video) {
      if (Array.isArray(prod.video) && prod.video.length > 0) {
        setVideo(prod.video);
      } else if (typeof prod.video === 'string') {
        setVideo([prod.video]);
      } else {
        setVideo([]);
      }
    } else {
      setVideo([]);
    }
  };

  const handleDelete = async (prod) => {
    if (!confirm(`Delete ${prod.name}? This cannot be undone.`)) return;
    try {
      const id = prod._id || prod.id;
      const res = await fetch(`http://localhost:4000/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Deleted');
        fetchProducts();
      } else {
        const json = await res.json();
        alert(json.error || 'Failed to delete');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

 
  useEffect(() => {
    const editId = searchParams?.get?.('editId');
    if (!editId) return;
   
    (async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/products/${editId}`);
        if (!res.ok) return;
        const prod = await res.json();
        if (prod) handleEdit(prod);
      } catch (err) {
        console.error('Failed to fetch product for editing', err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !sku || !slug || !category || !description) {
      alert('Please fill in all required fields: Name, SKU, Slug, Category, and Description');
      return;
    }
    
    const data = {
      name,
      sku,
      slug,
      category,
      description,
      price: Number(price),
      mrp: Number(mrp),
      stockQuantity: Number(stock),
      weightVolume,
      ingredients,
      safetyInstructions,
      careInstructions,
      tags: tags.split(',').map(t => t.trim()),
    };
    console.log('Submitting data:', data);

    if (productType === 'candle') {
      data.waxType = waxType;
      data.wickType = wickType;
      data.burnTime = Number(burnTime);
      data.fragranceNotes = fragranceNotes;
      data.container = container;
    } else {
      data.oilType = oilType;
      data.volume = Number(volume);
      data.diffuserType = diffuserType;
      data.refillAvailable = refill === 'Yes';
    }

   
    const imagePromises = images.map(file => {
      if (typeof file === 'string') {
        return Promise.resolve(file); 
      }
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    data.images = await Promise.all(imagePromises);

   
    if (video && Array.isArray(video) && video.length > 0) {
      const videoPromises = video.map(vid => {
        if (typeof vid === 'string') {
          return Promise.resolve(vid); 
        }
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(vid);
        });
      });
      data.video = await Promise.all(videoPromises);
    } else if (video && !Array.isArray(video)) {
      // fallback for old single video
      const videoPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(video);
      });
      data.video = [await videoPromise];
    } else {
      data.video = [];
    }

    try {
      let response, result;
      if (isEditing && editingId) {
        response = await fetch(`http://localhost:4000/api/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        result = await response.json();
        if (response.ok) {
          alert('Product updated successfully');
          setIsEditing(false);
          setEditingId(null);
        } else {
          alert(result.error || 'Failed to update');
        }
      } else {
        const endpoint = productType === 'candle' ? '/api/products/add-candle' : '/api/products/add-diffuser';
        response = await fetch(`http://localhost:4000${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        result = await response.json();
        if (response.ok) {
          alert('Product added successfully');
        } else {
          alert(result.error || 'Error adding product');
        }
      }

      // Reset form and refresh list
      setName('');
      setSku('');
      setSlug('');
      setCategory('Candles');
      setDescription('');
      setPrice('');
      setMrp('');
      setStock('');
      setWeightVolume('');
      setWaxType('');
      setWickType('');
      setBurnTime('');
      setFragranceNotes('');
      setContainer('');
      setOilType('');
      setVolume('');
      setDiffuserType('');
      setRefill('');
      setIngredients('');
      setSafetyInstructions('');
      setCareInstructions('');
      setTags('');
      setImages([]);
      setVideo([]);

      fetchProducts();
    } catch (error) {
      alert('Error saving product');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {isEditing ? (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-yellow-900">Editing: {name}</h1>
            <p className="text-sm text-yellow-700 mt-1">Make changes and click "Save Changes" to update</p>
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditingId(null);
              setName('');
              setSku('');
              setSlug('');
              setCategory('Candles');
              setDescription('');
              setPrice('');
              setMrp('');
              setStock('');
              setWeightVolume('');
              setWaxType('');
              setWickType('');
              setBurnTime('');
              setFragranceNotes('');
              setContainer('');
              setOilType('');
              setVolume('');
              setDiffuserType('');
              setRefill('');
              setIngredients('');
              setSafetyInstructions('');
              setCareInstructions('');
              setTags('');
              setImages([]);
              setVideo([]);
            }}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          >
            Cancel
          </button>
        </div>
      ) : (
        <h1 className="text-2xl font-semibold mb-6">Add Product — Siyaas</h1>
      )}

      {/* Featured/Reel management moved to /admin/manage */}

      {/* SWITCH */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setProductType("candle")}
          className={`px-6 py-2 rounded border ${
            productType === "candle"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Candle
        </button>

        <button
          onClick={() => setProductType("diffuser")}
          className={`px-6 py-2 rounded border ${
            productType === "diffuser"
              ? "bg-black text-white"
              : "bg-white text-black"
          }`}
        >
          Diffuser
        </button>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-10">

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid>
            <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="SKU" value={sku} onChange={(e) => setSku(e.target.value)} />
            <Input label="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generate" />
            <Select label="Category" options={["Candles", "Diffusers"]} value={category} onChange={(e) => setCategory(e.target.value)} />
          </Grid>
          <Textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </Section>

        {/* PRICING */}
        <Section title="Pricing & Stock">
          <Grid>
            <Input label="Price (₹)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input label="MRP (₹)" type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} />
            <Input label="Stock Quantity" type="number" value={stock} onChange={(e) => setStock(e.target.value)} />
            <Input label="Weight / Volume" value={weightVolume} onChange={(e) => setWeightVolume(e.target.value)} placeholder="200g / 100ml" />
          </Grid>
        </Section>

        {/* CANDLE */}
        {productType === "candle" && (
          <Section title="Candle Specification">
            <Grid>
              <Select label="Wax Type" options={["Soy", "Beeswax", "Coconut"]} value={waxType} onChange={(e) => setWaxType(e.target.value)} />
              <Select label="Wick Type" options={["Cotton", "Wooden"]} value={wickType} onChange={(e) => setWickType(e.target.value)} />
              <Input label="Burn Time (hrs)" type="number" value={burnTime} onChange={(e) => setBurnTime(e.target.value)} />
              <Input label="Fragrance Notes" value={fragranceNotes} onChange={(e) => setFragranceNotes(e.target.value)} placeholder="Lavender, Vanilla" />
              <Select label="Container" options={["Glass Jar", "Tin"]} value={container} onChange={(e) => setContainer(e.target.value)} />
            </Grid>
          </Section>
        )}

       
        {productType === "diffuser" && (
          <Section title="Diffuser Specification">
            <Grid>
              <Input label="Oil Type" value={oilType} onChange={(e) => setOilType(e.target.value)} />
              <Input label="Volume (ml)" type="number" value={volume} onChange={(e) => setVolume(e.target.value)} />
              <Select label="Diffuser Type" options={["Reed", "Electric"]} value={diffuserType} onChange={(e) => setDiffuserType(e.target.value)} />
              <Select label="Refill Available" options={["Yes", "No"]} value={refill} onChange={(e) => setRefill(e.target.value)} />
            </Grid>
          </Section>
        )}

        <Section title="Product Media">
          <Grid>
          
            <div>
              <label className="font-medium text-sm">Product Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImages}
                className="mt-2 w-full border rounded p-2"
              />

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      {typeof img === 'string' && (img.startsWith('data:') || img.startsWith('http')) ? (
                        <img
                          src={img.startsWith('data:') ? img : img}
                          alt={`preview-${idx}`}
                          className="h-24 w-full object-cover rounded border"
                        />
                      ) : (
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`preview-${idx}`}
                          className="h-24 w-full object-cover rounded border"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            <div>
              <label className="font-medium text-sm">Product Videos</label>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleVideo}
                className="mt-2 w-full border rounded p-2"
              />

              {video && Array.isArray(video) && video.length > 0 && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {video.map((vid, idx) => (
                    <div key={idx} className="relative group rounded border overflow-hidden">
                      {typeof vid === 'string' ? (
                        <video
                          controls
                          src={vid}
                          className="w-full h-32 bg-black"
                        />
                      ) : (
                        <video
                          controls
                          src={URL.createObjectURL(vid)}
                          className="w-full h-32 bg-black"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => removeVideo(idx)}
                        className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded hover:bg-red-700 opacity-0 group-hover:opacity-100 transition"
                      >
                        ✕ Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Grid>
        </Section>

        <Section title="Additional Information">
          <Textarea label="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
          <Textarea label="Safety Instructions" value={safetyInstructions} onChange={(e) => setSafetyInstructions(e.target.value)} />
          <Textarea label="Care Instructions" value={careInstructions} onChange={(e) => setCareInstructions(e.target.value)} />
          <Input label="Tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="lavender, soy, calm" />
        </Section>

        <button type="submit" className="bg-black text-white px-8 py-3 rounded">
          {isEditing ? 'Save Changes' : 'Add Product'}
        </button>
      </form>

      {/* Product list and selection controls moved to /admin/manage */}

    </div>
  );
}



const Section = ({ title, children }) => (
  <div>
    <h2 className="text-lg font-semibold mb-4 border-b pb-2">{title}</h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="font-medium text-sm">{label}</label>
    <input
      {...props}
      className="mt-2 w-full border rounded p-2 focus:outline-none focus:ring"
    />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="font-medium text-sm">{label}</label>
    <textarea {...props} className="mt-2 w-full border rounded p-2 h-28 focus:outline-none focus:ring" />
  </div>
);

const Select = ({ label, options, ...props }) => (
  <div>
    <label className="font-medium text-sm">{label}</label>
    <select {...props} className="mt-2 w-full border rounded p-2">
      <option value="">-- Select {label} --</option>
      {options.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  </div>
);
