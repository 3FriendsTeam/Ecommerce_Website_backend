const express = require("express");
const {registerCustomerWithEmailAndPassword, checkEmail} = require("../controllers/CustomerController");

const router = express.Router();
router.post('/register', registerCustomerWithEmailAndPassword);
router.get('/check-email', checkEmail);
module.exports = router;