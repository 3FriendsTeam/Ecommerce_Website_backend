const {Position,Employee} = require('../models');

const { Sequelize } = require('sequelize'); // Make sure Sequelize is imported

const getAllPosition = async (req, res) => {
    try {
        const data = await Position.findAll({
            attributes: {
                include: [
                    [
                        Sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM Employees AS Employee
                            WHERE Employee.PositionID = Position.id
                        )`),
                        'employeeCount',
                    ],
                ],
            },
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllPosition
}