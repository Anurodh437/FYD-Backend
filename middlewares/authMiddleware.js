const expressAsyncHandler = require("express-async-handler");
const JWT = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // getting token after removing Bearer
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = JWT.verify(token, process.env.JWT_SECRET);

      // getting curr user without the password field
      req.user = await User.findById(decoded.id).select("-password");

      // caling next function
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorised  , token failed");
    }
  }
  // if dont have token
  if (!token) {
    res.status(401);
    throw new Error("Not Authorised , no token");
  }
});

module.exports = protect;
