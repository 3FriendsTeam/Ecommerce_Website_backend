const { Product, Category, WarrantyPolicy, CountryOfOrigin, Manufacturer, ProductAttributeDetail, Image, Color, DeliveryReceiptDetail, ReturnDetail, Review, OrderProductDetail } = require('../models');


const getProductsByIdCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const products = await Product.find({ category: id });
    res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los productos' });
    }
}



const getProductsById = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id);
    const product = await Product.findByPk(id, {
      include: [
        { model: Category },
        { model: WarrantyPolicy },
        { model: CountryOfOrigin },
        { model: Manufacturer },
        { model: ProductAttributeDetail },
        { model: Image },
        { model: Color },
        { model: ReturnDetail },
        { model: Review },
      ],
    });
    if (!product) {
      return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    res.json(product);
  } catch (error) {
    console.error('Lỗi khi lấy sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi khi lấy sản phẩm' });
  }
};



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


const getLowStockProucts = async (req, res) => {
  try {
    const lowStockProducts = await Product.findAll({
      where: {
        quantity: { [Op.lt]: 10 },
      },
    });
    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


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
  SearchProduct,
  getProductsByIdCategory,
  getProductsById,
  getLowStockProucts
};