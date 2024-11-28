const { OrderCustomer, OrderProductDetail, Product,ShippingAddress } = require('../models');
const admin = require('../config/firebaseAdmin.js');
const { Op, Sequelize } = require("sequelize"); 

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
                OrderStatus: {
                    [Op.or]: ["Chờ giao hàng", "Đang giao"],
                },
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
                OrderStatus: {
                    [Op.or]: ["Đã xác nhận", "Đang đóng hàng"],
                },
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getCompleteOrders = async (req, res) => {
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
                OrderStatus: "Đã hoàn thành",
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
const createOrder = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const { OrderDate, OrderStatus, TotalAmount, PaymentMethodID, PromotionID, CustomerID, PaymentStatus, PaymentDate, AddressID, ListProduct } = req.body;
        const order = await OrderCustomer.create({
            OrderDate: Sequelize.NOW,
            OrderStatus,
            TotalAmount,
            PaymentMethodID,
            PromotionID,
            CustomerID,
            PaymentStatus,
            PaymentDate: Sequelize.NOW,
            AddressID,
        }, { transaction });
        if (ListProduct) {
            await Promise.all(
                ListProduct.map(async (product) => {
                    await OrderProductDetail.create({
                        OrderID: order.id,
                        ProductID: product.ProductID,
                        UnitPrice: product.UnitPrice,
                        Quantity: product.Quantity,
                        Notes: product.Notes,
                    }, { transaction });
                })
            );
        }
        await transaction.commit();
        res.status(201).json(order);
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({ error: error.message });
    }
};



const getOrdersByIdCustomer = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        if (!uid) {
            return res.status(400).json({ message: 'Customer ID is required.' });
        }
        // Lấy danh sách đơn hàng của khách hàng
        const orders = await OrderCustomer.findAll({
            where: { CustomerID: uid },
            include: [
                {
                    model: OrderProductDetail,
                    include: [
                        {
                            model: Product,
                            attributes: ['ProductName', 'ListedPrice', 'PromotionalPrice', 'RepresentativeImage'],
                        },
                    ],
                },
            ],
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT SUM("TotalAmount")
                            FROM "OrderCustomers"
                            WHERE "CustomerID" = '${uid}'
                        )`),
                        'SumTotalAmount',
                    ],
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "OrderCustomers"
                            WHERE "CustomerID" = '${uid}'
                        )`),
                        'CountOrders',
                    ]
                ]
            }
        });

        return res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching customer orders:', error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const getOrderCustomerDetail = async(req, res)=>
{
    try {
        const id = req.query.id;
        const order =  await OrderCustomer.findByPk(id, {
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
                                "PromotionalPrice",
                                "RepresentativeImage",
                            ],
                        },
                    ],
                },
                {
                    model: ShippingAddress,
                    attributes:["RecipientName", "PhoneNumber", "City", "District", "Ward", "SpecificAddress"],
                }
            ],});
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }
            res.status(200).json(order);
        }catch(error){
            return res.status(404).json({ message: 'Order not found 1' , error:error.message});
        }
};
                    

module.exports = { 
    getAllOrders,
    getOrderById,
    getNewOrders,
    updateOrderStatus,
    getShipingOrders,
    getPackingOrders,
    getCompleteOrders,
    getOrdersByIdCustomer,
    getOrderCustomerDetail,
    createOrder
 };