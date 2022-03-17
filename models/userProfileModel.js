const mongoose = require("mongoose");

const userProfileSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  githubID: {
    type: String,
    required: true,
  },
  linkedinID: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    // required: true,
  },
  experience: {
    type: String,
  },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
