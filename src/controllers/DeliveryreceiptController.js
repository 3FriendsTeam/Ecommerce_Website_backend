const { Sequelize } = require("sequelize");
const { DeliveryReceipt,
    DeliveryReceiptDetail,
    Product
 } = require("../models");

const createDeliveryReceipt = async (req, res) => {
    const { DeliveryDate, Notes, SupplierID, EmployeeID,Status = "Chờ xử lý", Products } = req.body;
    try {
      const receipt = await DeliveryReceipt.create({ DeliveryDate: DeliveryDate, Notes : Notes, SupplierID: SupplierID, EmployeeID: EmployeeID,Status: Status, Details: Products });
      if (Products && Products.length > 0) {
        const receiptDetails = Products.map((detail) => ({
          ...detail,
          ReceiptID: receipt.id,
          TotalPrice: detail.Quantity * parseFloat(detail.UnitPrice),
        }));
        await DeliveryReceiptDetail.bulkCreate(receiptDetails);
      }
      res.status(201).json({ message: 'Delivery receipt created successfully!', receipt });
    } catch (error) {
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
