const express = require('express');
const {
  createProduct,
  getProducts,
} = require('../controllers/productController');

const router = express.Router();
router.get('/products', getProducts)
//router.post('/products', createProduct);


module.exports = router;