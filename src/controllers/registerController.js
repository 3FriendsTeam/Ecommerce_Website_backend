const { Customer } = require('../models');
const bcrypt = require('bcrypt');
const admin = require('../config/firebaseAdmin.js');



//Dang ky nguoi dung
const registerUser = async (req, res) => {
    const email = "tranvanA@gmail.com";
    const password = "123456";
    //const { email, password } = req.body;
     
    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await Customer.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được đăng ký trong cơ sở dữ liệu" });
        }

        // Tạo người dùng trong Firebase Authentication (không băm mật khẩu)
        const userRecord = await admin.auth().createUser({
            email: email,
            password: password, // Sử dụng mật khẩu gốc
        });

        const { uid, email: userEmail } = userRecord;

        // Băm mật khẩu trước khi lưu vào cơ sở dữ liệu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Lưu người dùng vào SQL Server qua Sequelize
        await Customer.create({ id: uid, CustomerName: "User", Email: userEmail, Password: hashedPassword });

        res.status(200).json({ message: "Đăng ký thành công", uid, email });
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error);
        res.status(500).json({ message: "Lỗi khi đăng ký người dùng" });
    }
}

//Dang nhap nguoi dung
const loginUser = async (req, res) => {
    const { email, password } = req.body;
}


module.exports = {
    registerUser,
};
