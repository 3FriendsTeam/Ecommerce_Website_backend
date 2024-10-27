const { WarrantyPolicy } = require('../models');
const createWarrantyPolicy = async (req, res) => {

    try {
        const { WarrantyProvider, WarrantyConditions, PolicyContent } = req.body;
        const warrantyPolicy = await WarrantyPolicy.create({ WarrantyProvider, WarrantyConditions, PolicyContent });
        res.status(201).json(warrantyPolicy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {

}