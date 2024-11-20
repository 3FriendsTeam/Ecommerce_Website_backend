const {Employee, Position} = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');


const createEmployee = async (req, res) => {
    try{
    const {newEmployee, AdminName} = req.body;
    const hashedPassword = bcrypt.hashSync(newEmployee.Password, 10);
    const employee = await Employee.create({ Username: newEmployee.Username, Password: hashedPassword, PositionID: newEmployee.PositionID, FullName: newEmployee.FullName, DateOfBirth: newEmployee.DateOfBirth, Gender: newEmployee.Gender, Address: newEmployee.Address, Email: newEmployee.Email, PhoneNumber: newEmployee.PhoneNumber,CreatedBy: AdminName});
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
  const { id, oldPassword, password } = req.body;
  try {
    const user = await Employee.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu cũ không đúng" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ Password: hashedPassword });
    res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error('Lỗi khi cập nhật mật khẩu:', error);
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployeeById = async (req, res) => {
    try {
        const { key } = req.body;
        const employee = await Employee.destroy({ where: { id : key } });
        res.status(200).json({message: "Employee deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const LockEmployee = async (req, res) => {
  const { key } = req.body;
  try {
    const user = await Employee.findOne({ where: { id: key } });
    await user.update({ IsActive: 0 });
    res.status(200).json({message: "Khóa thành công"});
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống. vui lòng thử lại sau!" });
  }
}

const UnLockEmployee = async (req, res) => {
  const { key } = req.body;
  try {
    const user = await Employee.findOne({ where: { id: key } });
    await user.update({ IsActive: 1 });
    res.status(200).json({message: "Mở khóa thành công"});
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống. vui lòng thử lại sau!" });
  }
}

const updateEmployee = async (req, res) => {
  const { id ,values } = req.body;
  console.log(id,values);
  try {
    const employee = await Employee.update({ FullName: values.FullName, DateOfBirth: values.DateOfBirth, Gender: values.Gender, Address: values.Address, Email: values.Email, PhoneNumber: values.PhoneNumber}, { where: { id: id }});
    console.log(employee);
    res.status(200).json(employee);
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
    updatePassword,
    deleteEmployeeById,
    LockEmployee,
    UnLockEmployee,
    updateEmployee
}