const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/postModel");

// Controller to get all Posts
// api/post/
// Protected - GET
const getPosts = expressAsyncHandler(async (req, res) => {
  // getting all posts
  const posts = await Post.find().populate("postedBy", "name email profilePic");

  res.status(201).json({
    message: "All Posts",
    posts: posts,
  });
});

// Controller to Create Posts
// Protected - POST
// /api/post/create
const createPost = expressAsyncHandler(async (req, res) => {
  const { content, roles, image } = req.body;

  if (!content || !roles) {
    res.status(400);
    throw new Error("Please provide all the required fields");
  } else {
    //creating new post
    const post = new Post({
      content,
      roles,
      postedBy: req.user._id,
      image,
    });

    // saving post in Database
    let createdPost = await Post.create(post);

    // populating the createdBy field with user values
    createdPost = await post.populate("postedBy", "name email");

    //sending response
    res.status(201).json({
      message: "Post Created Sucessfully",
      data: post,
    });
  }
});

// Controller to get all Posts of a user
// Protected - GET
// api/post/user
const getUserPosts = expressAsyncHandler(async (req, res) => {
  // finding all posts by user id
  const posts = await Post.find({
    postedBy: req.user._id,
  }).populate("postedBy", "name email");

  //sending response
  res.status(201).json({
    message: "Post by User",
    posts: posts,
  });
});

// Controller to get a signgle Post by id
// Protected - GET
// /api/post/:id
const getPostById = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate(
    "postedBy",
    "name email profilePic"
  );

  // if post is found in the Database
  if (post) {
    res.status(201).json(post);
  } else {
    res.status(404).json({
      message: "Post Not Found",
    });
  }
});

// Controller to update a post
// Protected - PUT
// api/post/:id
const updatePost = expressAsyncHandler(async (req, res) => {
  console.log("Update Post Called");

  const { content, roles, image } = req.body;

  const post = await Post.findById(req.params.id);

  console.log("Post Created By ", post.postedBy.toString());

  // if any other user is trying to update this post
  if (post.postedBy.toString() != req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't Perform this action");
  }

  if (post) {
    post.content = content || post.content;
    post.roles = roles || post.roles;
    post.image = image || post.image;

    //saving updated post in db
    const updatedPost = await post.save();

    res.status(201).json({
      message: "Post Updated Sucessfully",
      post: updatedPost,
    });
  } else {
    res.status(404);
    throw new Error("Post Not found");
  }
});

//Controller to delete a Post
// Protected - DELETE
// /api/post/:id
const deletePost = expressAsyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  // if any other user is trying to delete this post
  if (post.postedBy.toString() != req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't Perform this action");
  }

  if (post) {
    await post.remove();
    res.status(201).json({
      message: "Post Deleted Successfully",
    });
  } else {
    res.status(404);
    throw new Error("Post Not found");
  }
});

module.exports = {
  getPosts,
  createPost,
  getUserPosts,
  getPostById,
  updatePost,
  deletePost,
};
