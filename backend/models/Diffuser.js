const mongoose = require('mongoose');

const diffuserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  weightVolume: { type: String, required: true },
  oilType: { type: String },
  volume: { type: Number },
  diffuserType: { type: String },
  refillAvailable: { type: Boolean },
  images: [{ type: String }],
  video: [{ type: String }],
  ingredients: { type: String },
  safetyInstructions: { type: String },
  careInstructions: { type: String },
  tags: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Diffuser', diffuserSchema);