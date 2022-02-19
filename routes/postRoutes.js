const express = require("express");
const {
  createPost,
  updatePost,
  getPosts,
  getUserPosts,
  getPostById,
  deletePost,
} = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");

const router = express.Router();

//route to get all posts
router.route("/").get(protect, getPosts);

//route to get all posts of a user
router.route("/user").get(protect, getUserPosts);

// route for creating a post
router.route("/create").post(protect, createPost);

//route to get a single post
//update a signle post
//delete a single post
router
  .route("/:id")
  .get(getPostById)
  .put(protect, updatePost)
  .delete(protect, deletePost);

//route for getting posts by specific user

module.exports = router;
