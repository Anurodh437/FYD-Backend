const express = require("express");
const {
  fetchProfile,
  updateProfile,
} = require("../controllers/userProfileController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(protect, fetchProfile).post(protect, updateProfile);

module.exports = router;
