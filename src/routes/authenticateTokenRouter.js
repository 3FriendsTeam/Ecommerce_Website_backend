const express = require("express");
const {registerUser} = require("../controllers/registerController");

router = express.Router();
router.get('/register', registerUser);

module.exports = router;