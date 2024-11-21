const { Op } = require('sequelize');
const { Product, Category, WarrantyPolicy, CountryOfOrigin, Manufacturer, ProductAttributeDetail,ProductAttribute, Image, Color, ReturnDetail, Review, sequelize } = require('../models');


const getProductsByIdCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const products = await Product.findAll({
      where: {
        CategoryID: id,
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};



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
    const transaction = await sequelize.transaction(); // Khởi tạo transaction
    try {
      // Lấy dữ liệu từ request body
      const {newProduct, nameEmployee} = req.body;
      const {
        ProductName,
        ListedPrice,
        RepresentativeImage,
        Description,
        PromotionalPrice,
        CategoryID,
        WarrantyPolicyID,
        ManufacturerID,
        CountryID,
        colors,
        specifications,
        Gallery,
      } = newProduct;
      const Stock = 0;
      const Status = true ;
      console.log(newProduct , nameEmployee);
      // Tạo sản phẩm mới
      const product = await Product.create({ProductName: ProductName, ListedPrice: ListedPrice, RepresentativeImage: RepresentativeImage, Stock: Stock, Description: Description, PromotionalPrice: PromotionalPrice, Status: Status, CategoryID: CategoryID, WarrantyPolicyID: WarrantyPolicyID, ManufacturerID: ManufacturerID, CountryID: CountryID, CreatedBy: nameEmployee}, { transaction });
  
      const productID = product.id;
  
      // Lưu ảnh vào bảng Image
      if (Gallery && Gallery.length > 0) {
        const images = Gallery.map((imageUrl, index) => ({
          ProductID: productID,
          ThuTu: index + 1,
          FilePath: imageUrl,
        }));
        await Image.bulkCreate(images, { transaction });
      }
  
      // Lưu màu sắc vào bảng Color
      if (colors && colors.length > 0) {
        const colorData = colors.map((colorName) => ({
          ProductID: productID,
          ColorName: colorName,
        }));
        await Color.bulkCreate(colorData, { transaction });
      }
  
      // Lưu thông số kỹ thuật
      if (specifications && specifications.length > 0) {
        for (const spec of specifications) {
          // Tìm hoặc tạo mới ProductAttribute
          const [attribute] = await ProductAttribute.findOrCreate({
            where: { AttributeName: spec.name },
            defaults: { AttributeName: spec.name },
            transaction,
          });
  
          // Tạo mới ProductAttributeDetail
          await ProductAttributeDetail.create(
            {
              ProductID: productID,
              AttributeID: attribute.id,
              AttributeValue: spec.value,
            },
            { transaction }
          );
        }
      }
  
      // Commit transaction nếu tất cả đều thành công
      await transaction.commit();
      res.status(201).json({ message: 'Thêm sản phẩm thành công', product });
    } catch (error) {
      // Rollback transaction nếu có lỗi
      await transaction.rollback();
      console.error('Lỗi khi thêm sản phẩm:', error);
      res.status(500).json({ message: 'Lỗi khi thêm sản phẩm', error });
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
        Stock: { [Op.lt]: 10 },
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