const { PaymentMethod } = require('../models');




const getAllMethodPayment = async (req, res) => {
    try {
        const paymentMethod = await PaymentMethod.findAll({
            attributes: ['id','PaymentMethodName', 'Description', 'Status']
        });

        if (!paymentMethod || paymentMethod.length === 0) {
            return res.status(404).json({ message: "Không có phương thức thanh toán nào." });
        }

        res.status(200).json(paymentMethod);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStatusMethodPayment = async (req, res) => {
    try {
        const { id } = req.body;
        const paymentMethod = await PaymentMethod.findByPk(id);

        if (paymentMethod) {
            const Status = paymentMethod.Status === "hoạt động" ? "ngừng hoạt động" : "hoạt động";
            await PaymentMethod.update(
                { Status }, 
                { where: { id } } 
            );
            res.status(200).json({ message: 'Cập nhật trạng thái thành công' });
        } else {
            res.status(404).json({ message: 'Không tìm thấy phương thức thanh toán' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    getAllMethodPayment, 
    updateStatusMethodPayment 
};