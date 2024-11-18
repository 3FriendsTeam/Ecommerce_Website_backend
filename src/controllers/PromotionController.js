const { Promotion } = require('../models');
const getPromotionById = async (req, res) => {
    try {
        const { id } = req.body;
        const promotion = await Promotion.findByPk(id);
        res.status(200).json(promotion);
    } catch (error) {
        console.error(error);
            res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getPromotionById = getPromotionById;