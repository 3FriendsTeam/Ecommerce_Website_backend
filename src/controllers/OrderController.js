const { OrderCustomer, OrderProductDetail, Product } = require('../models');

const { Op } = require("sequelize"); 

const getAllOrders = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90); 

        const orders = await OrderCustomer.findAll({
            attributes: [
                "id",
                "OrderDate", 
                "OrderStatus", 
                "TotalAmount", 
                "PaymentMethodID", 
                "PaymentStatus", 
                "PaymentDate", 
                "CustomerID"
            ],
            where: {
                OrderDate: {
                    [Op.gte]: thirtyDaysAgo 
                }
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getNewOrders = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90); 

        const orders = await OrderCustomer.findAll({
            attributes: [
                "id",
                "OrderDate", 
                "OrderStatus", 
                "TotalAmount", 
                "PaymentMethodID", 
                "PaymentStatus", 
                "PaymentDate", 
                "CustomerID"
            ],
            where: {
                OrderStatus: "Chờ xác nhận",
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getShipingOrders = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90); 

        const orders = await OrderCustomer.findAll({
            attributes: [
                "id",
                "OrderDate", 
                "OrderStatus", 
                "TotalAmount", 
                "PaymentMethodID", 
                "PaymentStatus", 
                "PaymentDate", 
                "CustomerID"
            ],
            where: {
                OrderStatus: "Chờ giao hàng",
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getPackingOrders = async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 90); 

        const orders = await OrderCustomer.findAll({
            attributes: [
                "id",
                "OrderDate", 
                "OrderStatus", 
                "TotalAmount", 
                "PaymentMethodID", 
                "PaymentStatus", 
                "PaymentDate", 
                "CustomerID"
            ],
            where: {
                OrderStatus: "Đã xác nhận",
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.query;
        const { OrderStatus } = req.body;

        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }

        const order = await OrderCustomer.findByPk(id);
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        order.OrderStatus = OrderStatus;
        await order.save();

        res.status(200).json({message: "Order status updated successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getOrderById = async (req, res) => {
    try {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "ID is required" });
        }

        const order = await OrderCustomer.findByPk(id, {
            attributes: [
                "id", 
                "OrderDate", 
                "OrderStatus", 
                "TotalAmount", 
                "PaymentMethodID", 
                "PaymentStatus", 
                "PaymentDate", 
                "CustomerID",
            ],
            include: [
                {
                    model: OrderProductDetail,
                    attributes: ["OrderID", "ProductID", "UnitPrice", "Quantity", "Notes"],
                    include: [
                        {
                            model: Product,
                            attributes: [
                                "ProductName",
                                "ListedPrice",
                                "PromotionalPrice",
                                "RepresentativeImage",
                                "Stock",
                                "Description",
                            ],
                        },
                    ],
                },
            ],
        });
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { 
    getAllOrders,
    getOrderById,
    getNewOrders,
    updateOrderStatus,
    getShipingOrders,
    getPackingOrders
 };