const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const blogPostSchema = new mongoose.Schema({
  postId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const BlogPost = mongoose.model("blogposts", blogPostSchema);

module.exports = BlogPost;
