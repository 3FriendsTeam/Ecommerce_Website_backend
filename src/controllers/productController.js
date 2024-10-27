const { Product } = require('../models');

const getProducts = async (req, res) => {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

const createProduct = async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await Product.create({ name, description, price, quantity });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };

module.exports = {
  getProducts,
  createProduct,
};