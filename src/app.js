const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const app = express();
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwq7W_CVOsgGuK-pWuBiVUfWQ_9mmaxdQ",
  authDomain: "e-commercewebsite-645fb.firebaseapp.com",
  projectId: "e-commercewebsite-645fb",
  storageBucket: "e-commercewebsite-645fb.appspot.com",
  messagingSenderId: "682014935245",
  appId: "1:682014935245:web:3459224b3ea8e33c040184",
  measurementId: "G-4F29WG76RC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



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

