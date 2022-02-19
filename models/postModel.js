const mongoose = require("mongoose");

//Schema for Post

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: undefined,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
