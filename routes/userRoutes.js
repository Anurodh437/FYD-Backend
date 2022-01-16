const express = require("express");
const { signupUser, loginUser } = require("../controllers/userController");

const router = express.Router();

// route for signup
router.route("/signup").post(signupUser);

// route for login
router.route("/login").post(loginUser);

module.exports = router;
