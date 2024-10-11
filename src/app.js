const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    // Đồng bộ model với cơ sở dữ liệu
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Đăng ký các route
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);

module.exports = app;

