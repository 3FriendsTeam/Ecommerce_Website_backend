const admin = require("../firebaseAdmin");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>
  console.log(token);
  if (!token) {
    return res.status(403).send("No token provided.");
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Thông tin người dùng
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = authenticateToken;