const { Sequelize } = require("sequelize");
const { DeliveryReceipt,
    DeliveryReceiptDetail,
    Product,
    sequelize
 } = require("../models");

  const createDeliveryReceipt = async (req, res) => {
    const transaction = await sequelize.transaction(); 
    try {
      const { DeliveryDate, Notes, SupplierID, EmployeeID, Status = "Chờ xử lý", Products } = req.body;
  
      // Xác thực dữ liệu đầu vào
      if (!DeliveryDate || !SupplierID || !EmployeeID) {
        await transaction.rollback();
        return res.status(400).json({ message: 'Thiếu các trường bắt buộc: DeliveryDate, SupplierID, EmployeeID.' });
      }

      const receipt = await DeliveryReceipt.create(
        { 
          DeliveryDate, 
          Notes, 
          SupplierID, 
          EmployeeID, 
          Status 
        }, 
        { 
          transaction
        }
      );
  
      // Nếu có Products, tạo DeliveryReceiptDetail
      if (Products && Array.isArray(Products) && Products.length > 0) {
        // Chuẩn bị dữ liệu cho DeliveryReceiptDetail
        const receiptDetails = Products.map((detail) => {
          // Xác thực từng chi tiết sản phẩm
          if (!detail.ProductID || !detail.Quantity || !detail.UnitPrice) {
            throw new Error('Thiếu các trường bắt buộc trong Products: ProductID, Quantity, UnitPrice.');
          }
  
          return {
            ProductID: detail.ProductID,
            Quantity: detail.Quantity,
            UnitPrice: parseFloat(detail.UnitPrice),
            TotalPrice: detail.Quantity * parseFloat(detail.UnitPrice),
            ReceiptID: receipt.id, // Gán ReceiptID từ Receipt vừa tạo
            // Thêm các trường khác nếu có
          };
        });
  
        // Tạo các chi tiết đơn hàng bằng bulkCreate với `returning: false`
        await DeliveryReceiptDetail.bulkCreate(receiptDetails, { transaction, returning: false });
      }
  
      // Commit transaction nếu tất cả đều thành công
      await transaction.commit();
  
      // Trả về phản hồi thành công
      res.status(201).json({ message: 'Delivery receipt created successfully!', receipt });
    } catch (error) {
      // Rollback transaction nếu có lỗi
      if (transaction) {
        try {
          await transaction.rollback();
        } catch (rollbackError) {
          console.error("Rollback failed: ", rollbackError.message);
        }
      }
      console.error('Error creating delivery receipt:', error);
      res.status(500).json({ message: 'Error creating delivery receipt', error: error.message });
    }
  };
  

  const getDeliveryReceipts = async (req, res) => {
    try {
        const receipts = await DeliveryReceipt.findAll({
            include: [
                {
                    model: DeliveryReceiptDetail,
                    attributes: []
                },
            ],
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT SUM("TotalPrice")
                            FROM "DeliveryReceiptDetails"
                            WHERE "DeliveryReceiptDetails"."ReceiptID" = "DeliveryReceipt"."id"
                        )`),
                        'TotalPrice',
                    ],
                ],
            },
        });

        res.status(200).json(receipts);
    } catch (error) {    
        res.status(500).json({ message: 'Error fetching delivery receipts', error: error.message });
    }
};



  const updateDeliveryReceipt = async (req, res) => {
    const { id } = req.query;
    const { DeliveryDate, Notes, Details } = req.body;
    try {
      const receipt = await DeliveryReceipt.findByPk(id);
      if (!receipt) return res.status(404).json({ message: 'Receipt not found' });
  
      await receipt.update({ DeliveryDate, Notes });
  
      if (Details && Details.length > 0) {
        await DeliveryReceiptDetail.destroy({ where: { ReceiptID: id } });
        const updatedDetails = Details.map((detail) => ({
          ...detail,
          ReceiptID: id,
          TotalPrice: detail.Quantity * parseFloat(detail.UnitPrice),
        }));
        await DeliveryReceiptDetail.bulkCreate(updatedDetails);
      }
      res.status(200).json({ message: 'Delivery receipt updated successfully!', receipt });
    } catch (error) {
      res.status(500).json({ message: 'Error updating delivery receipt', error });
    }
  };

  const getDeliveryReceiptDetails = async (req, res) => {
    const { id } = req.query; // Lấy id từ URL
    try {
      // Lấy thông tin phiếu nhập hàng
      const receipt = await DeliveryReceipt.findByPk(id, {
        include: [
          {
            model: DeliveryReceiptDetail,
            include: [
              {
                model: Product, 
                attributes: ['ProductName', 'RepresentativeImage'],
              },
            ],
          },
        ],
      });
  
      if (!receipt) {
        return res.status(404).json({ message: 'Delivery receipt not found' });
      }
  
      res.status(200).json({
        message: 'Delivery receipt details retrieved successfully!',
        data: receipt,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving delivery receipt details', error:error.message });
    }
  };
  
  const updateStatusDeliveryreceipt = async (req, res) => {
    const { id } = req.query; // Lấy id từ URL
    const { status } = req.body; // Lấy trạng thái từ body
    try {
      // Cập nhật trạng thái phiếu nhập hàng
      const receipt = await DeliveryReceipt.update({ Status: status }, {
        where: { ID: id },
      });
      if (!receipt) {
        return res.status(404).json({ message: 'Delivery receipt not found' });
      }
        res.status(200).json({ message: 'Delivery receipt status updated successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating delivery receipt status', error });
    }
};



  module.exports = { 
    createDeliveryReceipt,
    getDeliveryReceipts,
    updateDeliveryReceipt,
    getDeliveryReceiptDetails,
    updateStatusDeliveryreceipt
  };
