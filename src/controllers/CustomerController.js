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
        IsActive = true
    } = req.body;
    try {
        await Customer.create({ id: uid, CustomerName: customerName, Email: email, PhoneNumber: phoneNumber, BirthDate: birthDate, Gender: gender , IsActive: IsActive});
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

const getCustomerInfo = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        const user = await Customer.findOne({ where: { id: uid } });
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error.message});
    }
}
const updateCustomerInfo = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const {
      CustomerName,
      Email,
      PhoneNumber,
      BirthDate,
      Gender
  } = req.body;

  try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const uid = decodedToken.uid;

      const user = await Customer.findOne({ where: { id: uid } });
      if (!user) {
          return res.status(404).json({ error: true, message: "User not found" });
      }

      await user.update({
          CustomerName : CustomerName,
          Email: Email,
          PhoneNumber : PhoneNumber,
          BirthDate : BirthDate,
          Gender : Gender
      });

      res.status(200).json({ message: "Thông tin người dùng đã được cập nhật thành công" });
  } catch (error) {
      console.error("Error updating user info:", error);
      res.status(500).json({ error: true, message: error.message });
  }
}
const getAllCustomer = async (req, res) => {
    try {
        const data = await Customer.findAll({
            attributes: {
                exclude: ['Password']
            }
        });
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
const LockCustomer = async (req, res) => {
  const { key } = req.body;
  try {
    const user = await Customer.findOne({ where: { id: key } });
    await user.update({ IsActive: 0 });
    res.status(200).json({message: "Khóa thành công"});
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống. vui lòng thử lại sau!" });
  }
}

const UnLockCustomer = async (req, res) => {
  const { key } = req.body;
  try {
    const user = await Customer.findOne({ where: { id: key } });
    await user.update({ IsActive: 1 });
    res.status(200).json({message: "Mở khóa thành công"});
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống. vui lòng thử lại sau!" });
  }
}
module.exports = {
    registerCustomerWithEmailAndPassword,
    checkEmail,
    getCustomerInfo,
    updateCustomerInfo,
    getAllCustomer,
    LockCustomer,
    UnLockCustomer
};
