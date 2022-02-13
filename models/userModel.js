const bcrypt = require("bcryptjs");
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

// mongoose hook - (before saving )-> to hash our password using bcrypt js
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// userSchema method to matchPassword for logging a user
userSchema.methods.matchPassword = async function (enteredPassword) {
  // using bcryptjs compare func to match our password for user login
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
