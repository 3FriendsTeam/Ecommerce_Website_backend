const { Supplier, Product, ProductSupplierDetails, sequelize } = require('../models');
const { Op } = require('sequelize');

// Hàm lấy tất cả nhà cung cấp với sản phẩm
const getAllSupplier = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
       // Chỉ lấy nhà cung cấp chưa bị xóa
      include: [
        {
          model: ProductSupplierDetails,
          include: [
            {
              model: Product,
              attributes: ['id', 'ProductName'],
            },
          ],
        },
      ],
    });

    const result = suppliers.map((supplier) => ({
      SupplierID: supplier.id,
      SupplierName: supplier.SupplierName,
      Address: supplier.Address,
      PhoneNumber: supplier.PhoneNumber,
      Email: supplier.Email,
      Products: supplier.ProductSupplierDetails.map((detail) => ({
        ProductID: detail.Product?.id,
        ProductName: detail.Product?.ProductName,
        StartDate: detail.StartDate,
        EndDate: detail.EndDate,
        Status: detail.Status,
      })),
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching suppliers with products:', error);
    return res.status(500).json({ message: error });
  }
};


const addSupplier = async (req, res) => {
  const { SupplierName, Address, PhoneNumber, Email, Products } = req.body;

  if (!SupplierName || !Email) {
    return res.status(400).json({ message: 'SupplierName and Email are required.' });
  }

  const t = await sequelize.transaction();

  try {
    const newSupplier = await Supplier.create(
      {
        SupplierName,
        Address,
        PhoneNumber,
        Email,
        IsDeleted: false,
      },
      { transaction: t }
    );

    if (Products && Array.isArray(Products)) {
      const productDetails = Products.map((product) => ({
        ProductID: product.ProductID,
        SupplierID: newSupplier.id,
        StartDate: product.StartDate || new Date(),
        EndDate: product.EndDate || null,
      }));

      // Tạo các bản ghi trong bảng ProductSupplierDetails
      await ProductSupplierDetails.bulkCreate(productDetails, { transaction: t });
    }

    // Commit transaction
    await t.commit();

    return res.status(201).json({ message: 'Supplier created successfully.', supplier: newSupplier });
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await t.rollback();
    console.error('Error adding supplier:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateSupplier = async (req, res) => {
  const { id } = req.query; // ID của nhà cung cấp cần cập nhật
  const { SupplierName, Address, PhoneNumber, Email, Products } = req.body;

  // Bắt đầu một transaction
  const t = await sequelize.transaction();

  try {
    // Tìm nhà cung cấp theo ID
    const supplier = await Supplier.findOne({ where: { id }, transaction: t });

    if (!supplier) {
      await t.rollback();
      return res.status(404).json({ message: 'Supplier not found.' });
    }

    // Cập nhật thông tin nhà cung cấp
    await supplier.update(
      {
        SupplierName: SupplierName || supplier.SupplierName,
        Address: Address || supplier.Address,
        PhoneNumber: PhoneNumber || supplier.PhoneNumber,
        Email: Email || supplier.Email,
      },
      { transaction: t }
    );

    // Nếu có danh sách sản phẩm hợp tác
    if (Products && Array.isArray(Products)) {
      // Lấy danh sách ProductID từ yêu cầu
      const newProductIDs = Products.map((product) => product.ProductID);

      // Lấy danh sách các bản ghi hiện tại trong ProductSupplierDetails
      const existingDetails = await ProductSupplierDetails.findAll({
        where: { SupplierID: supplier.id },
        transaction: t,
      });

      const existingProductIDs = existingDetails.map((detail) => detail.ProductID);

      // Xác định các sản phẩm cần thêm và cần xóa
      const productsToAdd = newProductIDs.filter((id) => !existingProductIDs.includes(id));
      const productsToRemove = existingProductIDs.filter((id) => !newProductIDs.includes(id));

      // Thêm các sản phẩm mới
      if (productsToAdd.length > 0) {
        const newDetails = productsToAdd.map((productId) => ({
          ProductID: productId,
          SupplierID: supplier.id,
          StartDate: new Date(),
        }));
        await ProductSupplierDetails.bulkCreate(newDetails, { transaction: t });
      }

      // Xóa các sản phẩm không còn hợp tác
      if (productsToRemove.length > 0) {
        await ProductSupplierDetails.destroy({
          where: {
            SupplierID: supplier.id,
            ProductID: { [Op.in]: productsToRemove },
          },
          transaction: t,
        });
      }

      // Cập nhật thông tin cho các sản phẩm còn lại (nếu cần)
      for (const product of Products) {
        if (existingProductIDs.includes(product.ProductID)) {
          // Cập nhật các thông tin khác nếu cần
          await ProductSupplierDetails.update(
            {
              StartDate: product.StartDate || null,
              EndDate: product.EndDate || null,
            },
            {
              where: {
                SupplierID: supplier.id,
                ProductID: product.ProductID,
              },
              transaction: t,
            }
          );
        }
      }
    }

    // Commit transaction
    await t.commit();

    return res.status(200).json({ message: 'Supplier updated successfully.', supplier });
  } catch (error) {
    // Rollback transaction nếu có lỗi
    await t.rollback();
    console.error('Error updating supplier:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Hàm xóa nhà cung cấp (cập nhật trạng thái)
const updateSupplierStatus = async (req, res) => {
  const { id } = req.query; // ID của nhà cung cấp cần cập nhật
  const { Status } = req.body; // Trạng thái mới

  try {
    // Tìm nhà cung cấp theo ID
    const supplier = await Supplier.findOne({ where: { id } });

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }

    // Cập nhật trạng thái
    await supplier.update({ Status: Status });

    return res.status(200).json({ message: 'Supplier status updated successfully.', supplier });
  } catch (error) {
    console.error('Error updating supplier status:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  getAllSupplier,
  addSupplier,
  updateSupplier,
  updateSupplierStatus,
};
