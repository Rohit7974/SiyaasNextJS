const express = require('express');
const router = express.Router();
const { addCandle, addDiffuser, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');

router.post('/add-candle', addCandle);
router.post('/add-diffuser', addDiffuser);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', getProductById);
router.get('/', getProducts);

module.exports = router;