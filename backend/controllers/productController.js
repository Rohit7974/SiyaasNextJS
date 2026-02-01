const Candle = require('../models/Candle');
const Diffuser = require('../models/Diffuser');

exports.addCandle = async (req, res) => {
  try {
    const candle = new Candle(req.body);
    await candle.save();
    res.status(201).json({ message: 'Candle added successfully', candle });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addDiffuser = async (req, res) => {
  try {
    const diffuser = new Diffuser(req.body);
    await diffuser.save();
    res.status(201).json({ message: 'Diffuser added successfully', diffuser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let products = [];
    if (category === 'candles') {
      products = await Candle.find();
    } else if (category === 'diffusers') {
      products = await Diffuser.find();
    } else {
      // If no category specified, return all products from both collections
      const candles = await Candle.find();
      const diffusers = await Diffuser.find();
      products = [...candles, ...diffusers];
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Candle.findById(id);
    if (!product) {
      product = await Diffuser.findById(id);
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    let product = await Candle.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!product) {
      product = await Diffuser.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    }

    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json({ message: 'Product updated', product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Candle.findByIdAndDelete(id);
    if (!product) {
      product = await Diffuser.findByIdAndDelete(id);
    }
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};