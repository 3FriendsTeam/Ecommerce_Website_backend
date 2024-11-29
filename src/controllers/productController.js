const { Op } = require('sequelize');
const { Product, Category, WarrantyPolicy, CountryOfOrigin, Manufacturer, ProductAttributeDetail,ProductAttribute, Image, Color, Customer, Review, sequelize } = require('../models');
const admin = require('../config/firebaseAdmin.js');

const getProductsByIdCategory = async (req, res) => {
  try {
    const { id } = req.query;
    const products = await Product.findAll({
      where: {
        CategoryID: id,
        IsDeleted: false
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
        { model: ProductAttributeDetail, include: [{ model: ProductAttribute }] },
        { model: Image },
        { model: Color },
        { model: Review, include: [{ model: Customer, attributes: ['CustomerName'] }] },
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
      const products = await Product.findAll(
        {where:{IsDeleted:false}}
      );
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

const getDiscontinuedProducts = async (req, res) => {
  try {
    const products = await Product.findAll(
      {where:{IsDeleted:true}}
    );
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
      Images,
    } = newProduct;
    const Stock = 0;
    const Status = true ;
    console.log(newProduct , nameEmployee);
    // Tạo sản phẩm mới
    const product = await Product.create({ProductName: ProductName, ListedPrice: ListedPrice, RepresentativeImage: RepresentativeImage, Stock: Stock, Description: Description, PromotionalPrice: PromotionalPrice, Status: Status, CategoryID: CategoryID, WarrantyPolicyID: WarrantyPolicyID, ManufacturerID: ManufacturerID, CountryID: CountryID, CreatedBy: nameEmployee}, { transaction });
  
    const productID = product.id;
  
      // Lưu ảnh vào bảng Image
    if (Images && Images.length > 0) {
      for (const img of Images) {
        await Image.create(
          {
            ProductID: productID,
            ThuTu: img.ThuTu,
            FilePath: img.FilePath,
          },
          { transaction })
      }};
  
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
  
const deleteProduct = async (req, res) => {
  try{
  const { key } = req.query;
  console.log(key);
  const product = await Product.findByPk(key);
  if (!product) {
    return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
    }
    product.IsDeleted = 1;
    await product.save();
    res.status(200).json({ message: 'Xóa sản phẩm thành công' });
  }catch(error){
    console.error('Lỗi khi xóa sản phẩm:', error);
    res.status(500).json({ message: 'Lỗi khi xóa sản phẩm' });
  }
  }
const SearchProduct = async (req, res) => {
    try {
        const { name, category } = req.query;
        const searchConditions = {};
        if (name) {
            searchConditions.ProductName = { [Op.like]: `%${name}%` }; 
        }
        if (category) {
            searchConditions.ProductTypeID = category; 
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

const updateProduct = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { id } = req.query; 
    const { updatedProduct, nameEmployee } = req.body;
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
      Colors,
      ProductAttributeDetails,
      Images,
    } = updatedProduct;

    console.log(updatedProduct);
    if (!id) {
      return res.status(400).json({ message: "Product ID is required." });
    }

    const product = await Product.findByPk(id, { transaction });
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    await product.update(
      {
        ProductName,
        ListedPrice,
        PromotionalPrice,
        Description,
        ManufacturerID,
        CategoryID,
        WarrantyPolicyID,
        CountryID,
        RepresentativeImage,
        UpdatedBy: nameEmployee,
      },
      { transaction }
    );

    if (Colors && Array.isArray(Colors)) {
      await Color.destroy({ where: { ProductID: id }, transaction });
      const colorData = Colors.map((color) => ({
        ProductID: id,
        ColorName: color.ColorName,
      }));
      await Color.bulkCreate(colorData, { transaction });
    }
    

    if (Images && Array.isArray(Images)) {
      await Image.destroy({ where: { ProductID: id }, transaction });
      for (const img of Images) {
        await Image.create(
          {
            ProductID: id,
            ThuTu: img.ThuTu,
            FilePath: img.FilePath,
          },
          { transaction })
      }
    }

    if (ProductAttributeDetails && Array.isArray(ProductAttributeDetails)) {
      await ProductAttributeDetail.destroy({ where: { ProductID: id }, transaction });
      for (const spec of ProductAttributeDetails) {
        const [attribute] = await ProductAttribute.findOrCreate({
          where: { AttributeName: spec.AttributeName },
          defaults: { AttributeName: spec.AttributeName },
          transaction,
        });
        await ProductAttributeDetail.create(
          {
            ProductID: id,
            AttributeID: attribute.id,
            AttributeValue: spec.AttributeValue,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    // Trả về phản hồi thành công
    return res.status(200).json({ message: "Product updated successfully." });

  } catch (error) {
    // Nếu có lỗi, rollback giao dịch
    await transaction.rollback();
    console.error(error);
    return res.status(500).json({ message: "An error occurred while updating the product.", error: error.message });
  }
};




const getLowStockProucts = async (req, res) => {
  try {
    const lowStockProducts = await Product.findAll({
      where: {
        Stock: { [Op.lt]: 10 },
        IsDeleted: false
      }
    });
    res.status(200).json(lowStockProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const reView = async(req,res)=>
{
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    console.log(uid);
    if (!uid) {
      return res.status(400).json({ message: 'Customer ID is required.' });
    }
    const {id} = req.query;
    const {RatingLevel,ReviewContent, ReviewDate} = req.body;
    const review = await Review.create({
      RatingLevel: RatingLevel,
      ReviewContent: ReviewContent,
      ReviewDate: ReviewDate,
      ProductID: id,
      CustomerID: uid
    });
    res.status(200).json({message: 'Cảm ơn bạn đã đánh giá sản phẩm của chúng tôi'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const getProductsByManufacturer = async (req, res) => {
  try {
    const { id } = req.query;
    const products = await Product.findAll({
      where: {
        ManufacturerID: id,
        IsDeleted: false
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  getProducts,
  createProduct,
  SearchProduct,
  getProductsByIdCategory,
  getProductsById,
  getLowStockProucts,
  deleteProduct,
  getDiscontinuedProducts,
  updateProduct,
  reView,
  getProductsByManufacturer
};