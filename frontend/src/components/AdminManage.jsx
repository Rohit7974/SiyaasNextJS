"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminManage(){
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);
  const [featured, setFeatured] = useState([]);
  const [reel, setReel] = useState([]);

  useEffect(()=>{
    fetchAll();
    loadFeatured();
    loadReel();
  },[]);

  async function fetchAll(){
    try{
      setLoading(true);
      const candlesRes = await fetch('http://localhost:4000/api/products?category=candles');
      const diffusersRes = await fetch('http://localhost:4000/api/products?category=diffusers');
      const candles = candlesRes.ok ? await candlesRes.json() : [];
      const diffusers = diffusersRes.ok ? await diffusersRes.json() : [];
      const all = [...candles, ...diffusers];
      setProducts(all);
    }catch(err){
      console.error(err);
    }finally{setLoading(false)}
  }

  function loadFeatured(){
    try{ const f = JSON.parse(localStorage.getItem('siyaas_featured_products')||'[]'); setFeatured(f);}catch(e){console.error(e)}
  }
  function saveFeatured(arr){ localStorage.setItem('siyaas_featured_products', JSON.stringify(arr)); setFeatured(arr); }

  function loadReel(){
    try{ const r = JSON.parse(localStorage.getItem('siyaas_reel_products')||'[]'); setReel(r);}catch(e){console.error(e)}
  }
  function saveReel(arr){ localStorage.setItem('siyaas_reel_products', JSON.stringify(arr)); setReel(arr); }

  function toggleFeatured(id){
    const next = featured.includes(id) ? featured.filter(x=>x!==id) : [...featured,id];
    saveFeatured(next);
  }
  function toggleReel(id){
    const next = reel.includes(id) ? reel.filter(x=>x!==id) : [...reel,id];
    saveReel(next);
  }

  async function handleDelete(id){
    if(!confirm('Delete this product?')) return;
    try{
      const res = await fetch(`http://localhost:4000/api/products/${id}`,{method:'DELETE'});
      if(res.ok){ fetchAll(); alert('Deleted'); }
      else { const j=await res.json(); alert(j.error||'Delete failed'); }
    }catch(e){console.error(e); alert('Error deleting');}
  }

  function handleEdit(id){
    // navigate to admin add/edit page with editId for prefill
    router.push(`/admin?editId=${id}`);
  }

  const filtered = products.filter(p=>{
    if(!q) return true;
    const s = q.toLowerCase();
    return (p.name||'').toLowerCase().includes(s) || (p.slug||'').toLowerCase().includes(s) || (p.category||'').toLowerCase().includes(s);
  });

  return (
    <div>
      <div className="flex gap-3 mb-4">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search products by name, slug, category" className="flex-1 p-2 border rounded" />
        <button onClick={fetchAll} className="px-4 py-2 bg-gray-800 text-white rounded">Refresh</button>
      </div>

      <div className="bg-white border rounded shadow-sm">
        <div className="p-3 border-b flex items-center font-medium text-sm">
          <div className="w-8">#</div>
          <div className="w-12">Img</div>
          <div className="flex-1">Product</div>
          <div className="w-40 text-right">Actions</div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center">Loading...</div>
          ) : filtered.length===0 ? (
            <div className="p-4 text-center text-gray-500">No results</div>
          ) : (
            filtered.map((p,i)=> (
              <div key={p._id} className="p-3 flex items-center gap-3 border-b hover:bg-gray-50">
                <div className="w-8 text-sm text-gray-600">{i+1}</div>
                <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                  {p.images && p.images[0] ? <img src={p.images[0]} className="w-full h-full object-cover"/> : <div className="text-xs text-gray-400">No</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category} • ₹{p.price}</div>
                </div>
                <div className="w-40 flex items-center justify-end gap-2">
                  <label className="text-xs flex items-center gap-2"><input type="checkbox" checked={featured.includes(p._id)} onChange={()=>toggleFeatured(p._id)} /> Featured</label>
                  <label className="text-xs flex items-center gap-2"><input type="checkbox" checked={reel.includes(p._id)} onChange={()=>toggleReel(p._id)} /> Reel</label>
                  <button onClick={()=>handleEdit(p._id)} className="px-2 py-1 bg-yellow-500 text-white rounded text-xs">Edit</button>
                  <button onClick={()=>handleDelete(p._id)} className="px-2 py-1 bg-red-600 text-white rounded text-xs">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
