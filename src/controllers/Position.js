const {Position} = require('../models');

const getAllPosition = async (req, res) => {
    try {
    const data = await Position.findAll();
    res.send(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const createPosition = async (req, res) => {
    try {
        const { PositionName, Notes } = req.body;
        const position = await Position.create({ PositionName: PositionName, Notes: Notes });
        res.status(201).json(position);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deletePosition = async (req, res) => {
    try {
        const { id } = req.query;
        const position = await Position.destroy({ where: { id: id } });
        res.status(200).json(position);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updatePosition = async (req, res) => {
    try {
        const { id } = req.query;
        const { PositionName , Notes} = req.body;
        const position = await Position.update({ PositionName: PositionName, Notes: Notes }, { where: { id: id } });
        res.status(200).json(position);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createPosition,
    getAllPosition,
    deletePosition,
    updatePosition
}