const express = require('express');
const router = express.Router();
const { addCandle, addDiffuser, getProducts, getProductById } = require('../controllers/productController');

router.post('/add-candle', addCandle);
router.post('/add-diffuser', addDiffuser);
router.get('/', getProducts);
router.get('/:id', getProductById);

module.exports = router;