const { Sequelize, Op } = require("sequelize");
const { OrderCustomer } = require("../models");

// Helper function to parse dates
function parseDate(dateString, defaultDate) {
    const parsedDate = new Date(dateString);
    return isNaN(parsedDate.getTime()) ? defaultDate : parsedDate;
}

const revenueByDate = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const startDateParsed = parseDate(startDate, new Date('1900-01-01'));
        const endDateParsed = parseDate(endDate, new Date('2100-12-31'));
        endDateParsed.setHours(23, 59, 59, 999);

        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.literal("CONVERT(DATE, OrderDate)"), 'date'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true, // Include only paid orders
            },
            group: [Sequelize.literal("CONVERT(DATE, OrderDate)")],
            order: [[Sequelize.literal("CONVERT(DATE, OrderDate)"), 'ASC']],
        });

        const totalAmount = await OrderCustomer.sum('TotalAmount', {
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
        });

        res.json({ orders, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve revenue by date',
            details: error.message,
        });
    }
};

const revenueByWeek = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const startDateParsed = parseDate(startDate, new Date('1900-01-01'));
        const endDateParsed = parseDate(endDate, new Date('2100-12-31'));
        endDateParsed.setHours(23, 59, 59, 999);

        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.literal("DATEPART(YEAR, OrderDate)"), 'year'],
                [Sequelize.literal("DATEPART(WEEK, OrderDate)"), 'week'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
            group: [
                Sequelize.literal("DATEPART(YEAR, OrderDate)"),
                Sequelize.literal("DATEPART(WEEK, OrderDate)"),
            ],
            order: [
                [Sequelize.literal("DATEPART(YEAR, OrderDate)"), 'ASC'],
                [Sequelize.literal("DATEPART(WEEK, OrderDate)"), 'ASC'],
            ],
        });

        const totalAmount = await OrderCustomer.sum('TotalAmount', {
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
        });

        res.json({ orders, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve revenue by week',
            details: error.message,
        });
    }
};

const revenueByMonth = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const startDateParsed = parseDate(startDate, new Date('1900-01-01'));
        const endDateParsed = parseDate(endDate, new Date('2100-12-31'));
        endDateParsed.setHours(23, 59, 59, 999);

        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.literal("DATEPART(YEAR, OrderDate)"), 'year'],
                [Sequelize.literal("DATEPART(MONTH, OrderDate)"), 'month'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
            group: [
                Sequelize.literal("DATEPART(YEAR, OrderDate)"),
                Sequelize.literal("DATEPART(MONTH, OrderDate)"),
            ],
            order: [
                [Sequelize.literal("DATEPART(YEAR, OrderDate)"), 'ASC'],
                [Sequelize.literal("DATEPART(MONTH, OrderDate)"), 'ASC'],
            ],
        });

        const totalAmount = await OrderCustomer.sum('TotalAmount', {
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
        });

        res.json({ orders, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve revenue by month',
            details: error.message,
        });
    }
};

const revenueByYear = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const startDateParsed = parseDate(startDate, new Date('1900-01-01'));
        const endDateParsed = parseDate(endDate, new Date('2100-12-31'));
        endDateParsed.setHours(23, 59, 59, 999);

        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.literal("DATEPART(YEAR, OrderDate)"), 'year'],
                [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
            ],
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
            group: [Sequelize.literal("DATEPART(YEAR, OrderDate)")],
            order: [[Sequelize.literal("DATEPART(YEAR, OrderDate)"), 'ASC']],
        });

        const totalAmount = await OrderCustomer.sum('TotalAmount', {
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
        });

        res.json({ orders, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve revenue by year',
            details: error.message,
        });
    }
};

const customRangeRevenue = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        const startDateParsed = parseDate(startDate, new Date('1900-01-01'));
        const endDateParsed = parseDate(endDate, new Date('2100-12-31'));
        endDateParsed.setHours(23, 59, 59, 999);

        const orders = await OrderCustomer.findAll({
            attributes: [
                [Sequelize.literal("CONVERT(DATE, OrderDate)"), 'OrderDate'],
                'TotalAmount',
            ],
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
            order: [['OrderDate', 'ASC']],
        });

        const totalAmount = await OrderCustomer.sum('TotalAmount', {
            where: {
                OrderDate: {
                    [Op.between]: [startDateParsed, endDateParsed],
                },
                PaymentStatus: true,
            },
        });

        res.json({ orders, totalAmount });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to retrieve custom range revenue',
            details: error.message,
        });
    }
};

module.exports = {
    revenueByDate,
    revenueByWeek,
    revenueByMonth,
    revenueByYear,
    customRangeRevenue,
};
