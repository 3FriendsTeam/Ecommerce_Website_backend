const { Sequelize, Op } = require("sequelize");
const { OrderCustomer } = require("../models");

const revenueByDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.fn('DATE', Sequelize.col('OrderDate')), 'date'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [
                        new Date(startDate || '1900-01-01'),
                        new Date(endDate || '2100-12-31'),
                    ],
                },
            },
            group: [Sequelize.fn('DATE', Sequelize.col('OrderDate'))],
            order: [[Sequelize.fn('DATE', Sequelize.col('OrderDate')), 'ASC']],
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve revenue by day' });
    }
};

const revenueByWeek = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('OrderDate')), 'year'],
                [Sequelize.fn('WEEK', Sequelize.col('OrderDate')), 'week'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [
                        new Date(startDate || '1900-01-01'),
                        new Date(endDate || '2100-12-31'),
                    ],
                },
            },
            group: [
                Sequelize.fn('YEAR', Sequelize.col('OrderDate')),
                Sequelize.fn('WEEK', Sequelize.col('OrderDate')),
            ],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('OrderDate')), 'ASC'],
                [Sequelize.fn('WEEK', Sequelize.col('OrderDate')), 'ASC'],
            ],
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve revenue by week' });
    }
};

const revenueByMonth = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('OrderDate')), 'year'],
                [Sequelize.fn('MONTH', Sequelize.col('OrderDate')), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [
                        new Date(startDate || '1900-01-01'),
                        new Date(endDate || '2100-12-31'),
                    ],
                },
            },
            group: [
                Sequelize.fn('YEAR', Sequelize.col('OrderDate')),
                Sequelize.fn('MONTH', Sequelize.col('OrderDate')),
            ],
            order: [
                [Sequelize.fn('YEAR', Sequelize.col('OrderDate')), 'ASC'],
                [Sequelize.fn('MONTH', Sequelize.col('OrderDate')), 'ASC'],
            ],
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve revenue by month' });
    }
};

const revenueByYear = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.fn('YEAR', Sequelize.col('OrderDate')), 'year'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [
                        new Date(startDate || '1900-01-01'),
                        new Date(endDate || '2100-12-31'),
                    ],
                },
            },
            group: [Sequelize.fn('YEAR', Sequelize.col('OrderDate'))],
            order: [[Sequelize.fn('YEAR', Sequelize.col('OrderDate')), 'ASC']],
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve revenue by year' });
    }
};

const customRangeRevenue = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const orders = await OrderCustomer.findAll({
            attributes: ['OrderDate', 'TotalAmount'],
            where: {
                OrderDate: {
                    [Op.between]: [
                        new Date(startDate || '1900-01-01'),
                        new Date(endDate || '2100-12-31'),
                    ],
                },
            },
            order: [['OrderDate', 'ASC']],
        });

        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve custom range revenue' });
    }
};

const summaryData = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const summary = await OrderCustomer.findOne({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
                [Sequelize.fn('COUNT', Sequelize.col('OrderDate')), 'totalOrders'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [
                        new Date(startDate || '1900-01-01'),
                        new Date(endDate || '2100-12-31'),
                    ],
                },
            },
        });

        res.json(summary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve summary data' });
    }
};

module.exports = {
    revenueByDate,
    revenueByWeek,
    revenueByMonth,
    revenueByYear,
    customRangeRevenue,
    summaryData,
};
