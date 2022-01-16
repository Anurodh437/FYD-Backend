const e = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// controller to signup a user
const signupUser = asyncHandler(async (req, res) => {
  console.log("Signup user called ");

  // extract the required parameters from request
  const { name, email, password, profilePic } = req.body;

  // check if user already exists in our Database or not
  const userExists = await User.findOne({ email });

  // if user exist throw error
  if (userExists) {
    res.status(400);
    throw new Error("User with this email already exists");
  }

  // otherwise create a user with requested data
  const user = await User.create({
    name,
    email,
    password,
    profilePic,
  });

  // if user creation is successfull, send resposne
  if (user) {
    res.status(201).json({
      message: "User Created Successfully",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  }
  // if some error occurred in creating a user
  else {
    res.status(400);
    throw new Error("Error Ocuured!");
  }
});

// controller to login a user
const loginUser = asyncHandler(async (req, res) => {
  console.log("Login user called ");

  // extracitng login information from request body
  const { email, password } = req.body;

  // finding user
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      message: "User Login Successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials!");
  }
});

module.exports = { signupUser, loginUser };
