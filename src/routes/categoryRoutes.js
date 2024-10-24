// src/routes/catelogyRoutes.js
const express = require('express');
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController'); // Đảm bảo hàm này tồn tại

const router = express.Router();

router.get('/categories', getCategories);
router.post('/create-categories', createCategory);
router.patch('/update-categories', updateCategory);
router.delete('/delete-categories', deleteCategory);
module.exports = router;
