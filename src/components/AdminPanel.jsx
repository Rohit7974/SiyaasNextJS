"use client";
import { useState } from "react";

export default function AddProduct() {
  const [productType, setProductType] = useState("candle");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleVideo = (e) => {
    setVideo(e.target.files[0]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Add Product — Siyaas</h1>

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
      <form className="space-y-10">

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid>
            <Input label="Product Name" />
            <Input label="SKU" />
            <Input label="Slug" placeholder="auto-generate" />
            <Select label="Category" options={["Candles", "Diffusers"]} />
          </Grid>
          <Textarea label="Description" />
        </Section>

        {/* PRICING */}
        <Section title="Pricing & Stock">
          <Grid>
            <Input label="Price (₹)" type="number" />
            <Input label="MRP (₹)" type="number" />
            <Input label="Stock Quantity" type="number" />
            <Input label="Weight / Volume" placeholder="200g / 100ml" />
          </Grid>
        </Section>

        {/* CANDLE */}
        {productType === "candle" && (
          <Section title="Candle Specification">
            <Grid>
              <Select label="Wax Type" options={["Soy", "Beeswax", "Coconut"]} />
              <Select label="Wick Type" options={["Cotton", "Wooden"]} />
              <Input label="Burn Time (hrs)" type="number" />
              <Input label="Fragrance Notes" placeholder="Lavender, Vanilla" />
              <Select label="Container" options={["Glass Jar", "Tin"]} />
            </Grid>
          </Section>
        )}

       
        {productType === "diffuser" && (
          <Section title="Diffuser Specification">
            <Grid>
              <Input label="Oil Type" />
              <Input label="Volume (ml)" type="number" />
              <Select label="Diffuser Type" options={["Reed", "Electric"]} />
              <Select label="Refill Available" options={["Yes", "No"]} />
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
                    <div key={idx} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        className="h-24 w-full object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-black text-white text-xs px-2 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            
            <div>
              <label className="font-medium text-sm">Product Video</label>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideo}
                className="mt-2 w-full border rounded p-2"
              />

              {video && (
                <video
                  controls
                  src={URL.createObjectURL(video)}
                  className="mt-4 rounded border w-full"
                />
              )}
            </div>
          </Grid>
        </Section>

        <Section title="Additional Information">
          <Textarea label="Ingredients" />
          <Textarea label="Safety Instructions" />
          <Textarea label="Care Instructions" />
          <Input label="Tags" placeholder="lavender, soy, calm" />
        </Section>

        <button className="bg-black text-white px-8 py-3 rounded">
          Add Product
        </button>
      </form>
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

const Textarea = ({ label }) => (
  <div>
    <label className="font-medium text-sm">{label}</label>
    <textarea className="mt-2 w-full border rounded p-2 h-28 focus:outline-none focus:ring" />
  </div>
);

const Select = ({ label, options }) => (
  <div>
    <label className="font-medium text-sm">{label}</label>
    <select className="mt-2 w-full border rounded p-2">
      {options.map((o) => (
        <option key={o}>{o}</option>
      ))}
    </select>
  </div>
);
