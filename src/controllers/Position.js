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
module.exports = {
    getAllPosition
}