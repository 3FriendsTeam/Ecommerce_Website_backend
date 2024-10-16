const { Customer } = require('../models');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const email = 'tjnk1310@gmail.com';
    const password = '123456';
     
    try {
        //check nguoi dung da ton tai hay chua
        const existingUser = await Customer.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã được đăng ký trong cơ sở dữ liệu" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salt for security
        const name = "User"// API đăng ký
        app.post("/register", async (req, res) => {
          const { email, password } = req.body;
        
          try {
            // Tạo người dùng trên Firebase Authentication
            const userRecord = await admin.auth().createUser({
              email: email,
              password: password,
            });
        
            const { uid, email: userEmail } = userRecord;
        
            // Lưu người dùng vào SQL Server qua Sequelize
            await User.create({ uid: uid, email: userEmail });
        
            res.status(200).json({ message: "Đăng ký thành công", uid, email });
          } catch (error) {
            console.error("Lỗi khi đăng ký:", error);
            res.status(500).json({ message: "Lỗi khi đăng ký người dùng" });
          }
        });
        // Save the user to SQL Server via Sequelize
        const newUser = await Customer.create({CustomerName: name, Email: email, Password: hashedPassword });
        res.status(200).json({ message: "Đăng ký thành công", Customer: { email: newUser.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = {
    registerUser,
  };