const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productType: { type: String, required: true, enum: ['candle', 'diffuser'] },
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  weightVolume: { type: String, required: true },
  // Candle specific
  waxType: { type: String },
  wickType: { type: String },
  burnTime: { type: Number },
  fragranceNotes: { type: String },
  container: { type: String },
  // Diffuser specific
  oilType: { type: String },
  volume: { type: Number },
  diffuserType: { type: String },
  refillAvailable: { type: Boolean },
  // Media
  images: [{ type: String }],
  video: { type: String },
  // Additional
  ingredients: { type: String },
  safetyInstructions: { type: String },
  careInstructions: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);