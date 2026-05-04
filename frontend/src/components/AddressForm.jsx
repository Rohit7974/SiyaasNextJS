"use client";

import { useState, useEffect } from "react";

export default function AddressForm({ mode = "add", initialData = null, userId, onClose, onSaved }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [stateVal, setStateVal] = useState("");
  const [pincode, setPincode] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setFullName(initialData.fullName || "");
      setPhone(initialData.phone || "");
      setAddress(initialData.address || "");
      setCity(initialData.city || "");
      setStateVal(initialData.state || "");
      setPincode(initialData.pincode || "");
      setIsDefault(!!initialData.isDefault);
    } else {
      setFullName("");
      setPhone("");
      setAddress("");
      setCity("");
      setStateVal("");
      setPincode("");
      setIsDefault(false);
    }
  }, [initialData]);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!fullName.trim() || !phone.toString().trim() || !address.trim() || !city.trim() || !stateVal.trim() || !pincode.toString().trim()) {
      setError("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const payload = { fullName, phone, address, city, state: stateVal, pincode, isDefault, userId };
      let res;
      if (mode === "edit" && initialData && (initialData._id || initialData.id)) {
        const id = initialData._id || initialData.id;
        // res = await fetch(`http://localhost:4000/api/addresses/${id}`, {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addresses/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // res = await fetch("http://localhost:4000/api/addresses", {
          res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/addresses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const data = await res.json();
        onSaved && onSaved(data);
        onClose && onClose();
      } else {
        const d = await res.json();
        setError(d.error || d.message || "Failed to save address");
      }
    } catch (err) {
      console.error("AddressForm error", err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={() => onClose && onClose()} />
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md p-6">
        <h3 className="text-lg font-semibold mb-4">{mode === "edit" ? "Edit Address" : "Add Address"}</h3>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Full name</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Street / Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">State</label>
              <input value={stateVal} onChange={(e) => setStateVal(e.target.value)} className="w-full border px-3 py-2 rounded" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Pincode</label>
            <input value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full border px-3 py-2 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
            <label className="text-sm">Set as default address</label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => onClose && onClose()} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-black text-white rounded disabled:opacity-60">{loading ? 'Saving...' : 'Save'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
