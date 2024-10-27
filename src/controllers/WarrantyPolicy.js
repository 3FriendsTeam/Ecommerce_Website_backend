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
const getAllWarrantyPolicy = async (req, res) => {
    try {
        const data = await WarrantyPolicy.findAll();
        res.send(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteWarrantyPolicy = async (req, res) => {
    try {
        const { id } = req.query;
        const warrantyPolicy = await WarrantyPolicy.destroy({ where: { id: id } });
        res.status(200).json(warrantyPolicy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateWarrantyPolicy = async (req, res) => {
    try {
        const { id } = req.query;
        const { WarrantyProvider, WarrantyConditions, PolicyContent } = req.body;
        const warrantyPolicy = await WarrantyPolicy.update({ WarrantyProvider, WarrantyConditions, PolicyContent }, { where: { id: id } });
        res.status(200).json(warrantyPolicy);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    createWarrantyPolicy,
    getAllWarrantyPolicy,
    deleteWarrantyPolicy,
    updateWarrantyPolicy
}