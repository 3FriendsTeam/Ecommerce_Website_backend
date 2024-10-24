const { Customer } = require('../models/index.js');
const bcrypt = require('bcrypt');
const admin = require('../config/firebaseAdmin.js');



//Dang ky nguoi dung
const registerCustomerWithEmailAndPassword = async (req, res) => {
    const {
        uid,
        customerName,
        gender,
        email,
        phoneNumber = null,
        birthDate,
        isVerified = false
    } = req.body;
    console.log(customerName, gender, email, phoneNumber, birthDate);
    try {
        await Customer.create({ id: uid, CustomerName: customerName, Email: email, PhoneNumber: phoneNumber, BirthDate: birthDate, Gender: gender , isVerified: isVerified});

        res.status(200).json({ message: "Đăng ký thành công", uid, email });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({error: true, message: error.message});
    }
}
//check mail đã đăng kí hay chưa dưới DB
const checkEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required',
    });
  }

  try {
    const user = await Customer.findOne({ where: { Email: email } });

    if (user) {
      return res.status(200).json({
        success: true,
        message: 'Email already exists',
      });
    } else {
      return res.status(200).json({
        success: false,
        message: 'Email is available',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const checkCreatedEmail = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await auth.getUser(uid);
    if (user.emailVerified) {
      res.status(200).send("Email đã được xác nhận.");
    } else {
      res.status(200).send("Email chưa được xác nhận.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}


module.exports = {
    registerCustomerWithEmailAndPassword,
    checkEmail,
};
