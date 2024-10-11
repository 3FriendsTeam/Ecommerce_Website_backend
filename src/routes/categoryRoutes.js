// src/routes/catelogyRoutes.js
const express = require('express');
const { getCategories } = require('../controllers/categoryController'); // Đảm bảo hàm này tồn tại

const router = express.Router();

router.get('/categories', getCategories); // Đảm bảo 'getCategories' không phải là undefined

module.exports = router;
