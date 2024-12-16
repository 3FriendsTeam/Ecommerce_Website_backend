const { Sequelize, Op } = require("sequelize");
const { OrderCustomer } = require("../models");

// Helper function to parse dates
// parseDate: Nếu có dateString, parse sang Date object (có giờ phút giây nếu kèm),
// nếu không hợp lệ hoặc user không truyền => trả về defaultValue.
function parseDate(dateString, defaultValue) {
    if (!dateString) {
      return defaultValue;
    }
    const parsed = new Date(dateString);
    if (isNaN(parsed.getTime())) {
      return defaultValue;
    }
    return parsed;
  }
  
  // revenueByDate
  const revenueByDate = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      let startDateParsed = parseDate(startDate, null);
      if (!startDateParsed) {
        // Nếu user không truyền startDate => mặc định cột mốc xa
        startDateParsed = new Date('1900-01-01T00:00:00Z');
      }
  
      let endDateParsed = parseDate(endDate, null);
      if (!endDateParsed) {
        // Nếu user không truyền endDate => mặc định cột mốc xa
        endDateParsed = new Date('2100-12-31T23:59:59.999Z');
      }
  
      // KHÔNG ép giờ cứng: endDateParsed.setHours(23, 59, 59, 999);
  
      const orders = await OrderCustomer.findAll({
        attributes: [
          [Sequelize.literal("CONVERT(DATE, OrderDate)"), 'date'],
          [Sequelize.fn('SUM', Sequelize.col('TotalAmount')), 'totalRevenue'],
        ],
        where: {
          OrderDate: {
            [Op.between]: [startDateParsed, endDateParsed],
          },
          PaymentStatus: true, // Chỉ lấy các đơn hàng đã thanh toán
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
  
  // revenueByWeek
  const revenueByWeek = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      let startDateParsed = parseDate(startDate, null);
      if (!startDateParsed) {
        startDateParsed = new Date('1900-01-01T00:00:00Z');
      }
  
      let endDateParsed = parseDate(endDate, null);
      if (!endDateParsed) {
        endDateParsed = new Date('2100-12-31T23:59:59.999Z');
      }
  
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
  
  // revenueByMonth
  const revenueByMonth = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      let startDateParsed = parseDate(startDate, null);
      if (!startDateParsed) {
        startDateParsed = new Date('1900-01-01T00:00:00Z');
      }
  
      let endDateParsed = parseDate(endDate, null);
      if (!endDateParsed) {
        endDateParsed = new Date('2100-12-31T23:59:59.999Z');
      }
  
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
  
  // revenueByYear
  const revenueByYear = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      let startDateParsed = parseDate(startDate, null);
      if (!startDateParsed) {
        startDateParsed = new Date('1900-01-01T00:00:00Z');
      }
  
      let endDateParsed = parseDate(endDate, null);
      if (!endDateParsed) {
        endDateParsed = new Date('2100-12-31T23:59:59.999Z');
      }
  
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
  
  // customRangeRevenue
  const customRangeRevenue = async (req, res) => {
    const { startDate, endDate } = req.query;
  
    try {
      let startDateParsed = parseDate(startDate, null);
      if (!startDateParsed) {
        startDateParsed = new Date('1900-01-01T00:00:00Z');
      }
  
      let endDateParsed = parseDate(endDate, null);
      if (!endDateParsed) {
        endDateParsed = new Date('2100-12-31T23:59:59.999Z');
      }
  
      const orders = await OrderCustomer.findAll({
        attributes: [
          [Sequelize.literal("CONVERT(DATE, OrderDate)"), 'OrderDate'],
          'TotalAmount',
        ],
        where: {
          OrderDate: {
            [Op.gte]: startDateParsed,
            [Op.lte]: endDateParsed,
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
  