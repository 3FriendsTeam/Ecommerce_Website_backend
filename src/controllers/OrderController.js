const { OrderCustomer, OrderProductDetail, Product,ShippingAddress, sequelize } = require('../models');
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
        if(OrderStatus === "Đã hoàn thành"){
            order.PaymentStatus = 1;
        }else{
            order.OrderStatus = OrderStatus;
        }
        
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
    let transaction; // Khai báo biến giao dịch
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        transaction = await sequelize.transaction(); // Khởi tạo giao dịch
        const {TotalAmount, PaymentMethodID, PromotionID, AddressID, ListProduct } = req.body;
        // Tạo đơn hàng trong bảng OrderCustomer
        const order = await OrderCustomer.create({
            OrderDate: new Date(),
            OrderStatus: "Chờ xác nhận",
            TotalAmount:TotalAmount,
            PaymentMethodID:PaymentMethodID,
            PromotionID:PromotionID,
            CustomerID: uid,
            PaymentStatus: PaymentMethodID === 1 ? 0 : 1,
            PaymentDate: new Date(),
            AddressID:AddressID,
        }, { transaction }); // Gắn giao dịch vào lệnh tạo đơn hàng

        // Nếu có sản phẩm, tạo chi tiết đơn hàng trong bảng OrderProductDetail
        if (ListProduct && ListProduct.length > 0) {
            const orderProductDetails = ListProduct.map(product => ({
                OrderID: order.id,
                ProductID: product.id,
                UnitPrice: product.price,
                Quantity: product.quantity,
                Notes: product.Notes,
            }));
            await OrderProductDetail.bulkCreate(orderProductDetails, { transaction, returning: false }); 
        }

        // Nếu không có lỗi, commit giao dịch
        await transaction.commit();
        res.status(201).json(order); // Trả về đơn hàng vừa tạo
    } catch (error) {
        if (transaction) {
            try {
                await transaction.rollback(); // Rollback giao dịch nếu có lỗi
            } catch (rollbackError) {
                console.error("Rollback failed: ", rollbackError.message);
            }
        }
        console.error("Error creating order: ", error.message); // Ghi lỗi vào console để dễ dàng debug
        res.status(500).json({ error: error.message }); // Trả về lỗi
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
                        attributes:["RecipientName", "PhoneNumber", "Address", "SpecificAddress"],
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