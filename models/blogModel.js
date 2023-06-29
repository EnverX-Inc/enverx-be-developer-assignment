const mongoose = require('mongoose');
const User = require('./userModel');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model('Blogs', blogSchema);

module.exports = Blog;
