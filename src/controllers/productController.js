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
const SearchProduct = async (req, res) => {
    try {
        const { name, category } = req.query;

        // Tạo điều kiện tìm kiếm
        const searchConditions = {};
        
        if (name) {
            searchConditions.ProductName = { [Op.like]: `%${name}%` }; // Tìm tên gần đúng
        }

        if (category) {
            searchConditions.ProductTypeID = category; // Tìm theo danh mục
        }

        const products = await Product.findAll({
            where: searchConditions
        });

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tìm kiếm sản phẩm' });
    }
};

const getAllManufacturerOfProduct = async (req, res) => {
    try{
      const { id } = req.query;
      const policies = await Policy.findAll({where:{ProductID:id}}); 
      res.status(200).json(policies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

module.exports = {
  getProducts,
  createProduct,
  SearchProduct
};