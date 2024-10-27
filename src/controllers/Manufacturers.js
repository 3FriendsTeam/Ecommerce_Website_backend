const { Manufacturer } = require('../models');

const createManufacturer = async(req, res) => {
    try {
        const { ManufacturerName } = req.body;
        const manufacturer = await Manufacturer.create({ ManufacturerName: ManufacturerName });
        res.status(201).json(manufacturer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getManufacturers = async(req, res) => {
    try {
        const manufacturers = await Manufacturer.findAll();
        res.json(manufacturers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deleteManufacturer = async(req, res) => {
    try {
        const { id } = req.query;
        const manufacturer = await Manufacturer.destroy({ where: { id: id } });
        res.status(200).json(manufacturer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateManufacturer = async(req, res) => {
    try {
        const { id } = req.query;
        const { ManufacturerName } = req.body;
        const manufacturer = await Manufacturer.update({ ManufacturerName: ManufacturerName }, { where: { id: id } });
        res.status(200).json(manufacturer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createManufacturer,
    getManufacturers,
    deleteManufacturer,
    updateManufacturer
}