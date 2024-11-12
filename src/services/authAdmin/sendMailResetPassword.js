const nodemailer = require('nodemailer');
const crypto = require('crypto');

const sendMailResetPassword = async (user, resetToken) => {
    const resetLink = `http://YOUR_FRONTEND_URL/reset-password/${resetToken}`;

    // Gửi email cho người dùng
    const transporter = nodemailer.createTransport({
      // Cấu hình SMTP của bạn
      service: 'Gmail',
      auth: {
        user: 'thaotran7446@gmail.com',
        pass: 'Thaotran123!',
      },
    });

    const mailOptions = {
      to: user.Email,
      from: 'YOUR_EMAIL@gmail.com',
      subject: 'Yêu cầu đặt lại mật khẩu',
      text: `Bạn nhận được email này vì bạn (hoặc ai đó) đã yêu cầu đặt lại mật khẩu cho tài khoản của bạn.\n\n
      Vui lòng nhấp vào liên kết sau hoặc dán vào trình duyệt của bạn để hoàn tất quá trình:\n\n
      ${resetLink}\n\n
      Nếu bạn không yêu cầu điều này, vui lòng bỏ qua email này và mật khẩu của bạn sẽ không thay đổi.\n`,
    };

    await transporter.sendMail(mailOptions);
}
export default sendMailResetPassword;
