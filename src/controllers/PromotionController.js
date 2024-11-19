const { Promotion } = require('../models');
const getPromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findByPk(id);
        res.status(200).json(promotion);
    } catch (error) {
        console.error(error);
            res.status(500).json({ error: 'Internal server error' });
    }
};
const createPromotion = async (req, res) => {
    try {
        const { PromotionName, DiscountValue, Quantity, MinValue, MaxDiscount, Code,StartDate,EndDate,CreatedBy } = req.body;
        const promotion = await Promotion.create({ PromotionName: PromotionName, DiscountValue: DiscountValue, Quantity : Quantity, MinValue: MinValue, MaxDiscount: MaxDiscount, Code,StartDate:StartDate,EndDate:EndDate,CreatedBy:CreatedBy });
        res.status(200).json({message: 'Promotion created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const deletePromotion = async (req, res) => {
    try {
        const { id } = req.params; 
        const deletedPromotion = await Promotion.destroy({ where: { id } });

        if (deletedPromotion) {
            res.status(200).json({ message: 'Promotion deleted successfully' });
        } else {
            res.status(404).json({ error: 'Promotion not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const { PromotionName, DiscountValue, Quantity, MinValue, MaxDiscount, Code, StartDate, EndDate, CreatedBy } = req.body;

        const promotion = await Promotion.findOne({ where: { id } });

        if (promotion) {
            await promotion.update({
                PromotionName,
                DiscountValue,
                Quantity,
                MinValue,
                MaxDiscount,
                Code,
                StartDate,
                EndDate,
                CreatedBy
            });

            res.status(200).json(promotion);
        } else {
            res.status(404).json({ error: 'Promotion not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { 
    getPromotionById, 
    createPromotion,
    deletePromotion,
    updatePromotion
};