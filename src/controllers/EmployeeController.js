const {Employee, Position} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const createEmployee = async (req, res) => {
    try{
    const { Username, Password, PositionID, FullName, DateOfBirth, Gender, Address, Email, PhoneNumber,CreatedBy} = req.body;
    const employee = await Employee.create({ Username: Username, Password: Password, PositionID: PositionID, FullName: FullName, DateOfBirth: DateOfBirth, Gender: Gender, Address: Address, Email: Email, PhoneNumber: PhoneNumber,CreatedBy: CreatedBy});
    res.status(201).json(employee);
    }
    catch(error){
       res.status(500).json({error: error.message}); 
    }
}
const getAllEmployee = async (req, res) => {
    try{
    const data = await Employee.findAll();
    res.send(data);
    }
    catch(error){
        console.error(error);
        res.status(500).json({error: error.message});
    }
}

const LoginEmployee = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Employee.findOne({
            where: { Username: username },
            include: [
                {
                    model: Position,
                    as: 'Position',
                    attributes: ['PositionName']
                }
            ]
        });

        if (user && bcrypt.compareSync(password, user.Password)) {
            const { Password, ...userWithoutPassword } = user.toJSON();
            res.status(200).json({
                data: userWithoutPassword
            });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
  

const updatePassword = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await Employee.findOne({ where: { id } });
    if (user) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await user.update({ Password: hashedPassword });
      res.status(200).json({ message: "Password updated successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const forgotPassword = async (req, res) => {
  const { emailOrUsername } = req.body;

  try {
    const user = await Employee.findOne({
      where: {
        [Op.or]: [
          { Email: emailOrUsername },
          { Username: emailOrUsername },
        ],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng." });
    }

    // Tạo token đặt lại mật khẩu
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Lưu token và thời gian hết hạn vào database
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 giờ
    await user.save();

    // Tạo liên kết đặt lại mật khẩu
   

    res.status(200).json({ message: "Email đặt lại mật khẩu đã được gửi." });
  } catch (error) {
    res.status(500).json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
  }
};


module.exports = {
    createEmployee,
    getAllEmployee,
    LoginEmployee,
    updatePassword
}