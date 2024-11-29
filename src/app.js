const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();
const index = require('./routes/index.js');
require('dotenv').config();

app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true })); 

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Đăng ký route
app.use('/api', index);

module.exports = app;
