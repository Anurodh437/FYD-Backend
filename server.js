const express = require("express");
const app = express();

const connectDB = require("./config/db");

const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const userProfileRoutes = require("./routes/userProfileRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlerware");

dotenv.config();
// connecting Database
connectDB();

app.use(express.json());

// user routes
app.use("/api/user", userRoutes);

//post routes
app.use("/api/post", postRoutes);

//user Profile Routes
app.use("/api/userProfile", userProfileRoutes);

app.get("/", (req, res) => {
  res.send("Api is running ");
});

// error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT} 🚀`));
