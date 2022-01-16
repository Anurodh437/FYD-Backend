const mongoose = require("mongoose");

// Schema for user
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    // username: {
    //   type: String,
    //   required: true,
    // },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    profilePic: {
      type: String,
      required: true,
      default:
        "https://toppng.com/uploads/preview/app-icon-set-login-icon-comments-avatar-icon-11553436380yill0nchdm.png",
    },
  },
  {
    timestamps: true,
  }
);

// userSchema method to matchPassword for logging a user
userSchema.methods.matchPassword = async function (enteredPassword) {
  return enteredPassword === this.password;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
