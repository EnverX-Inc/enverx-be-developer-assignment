const Blog = require("../models/blog");
exports.createNewBlog = async (req, res) => {
  try {
    const newBlog = await new Blog({
      blogName: req.body.blogName,
      category: req.body.category,
      author: req.body.author,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the blog post." });
  }
};
exports.getAllBlogs = async (req, res) => {
  try {
    const { sortPostsBy, order } = req.query;
    const allPosts = await Blog.find({}).sort({
      [sortPostsBy]: order || 1,
    });
    res.json(allPosts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching blog posts." });
  }
};
exports.getBlogById = async (req, res) => {
  try {
    const getPostWithId = await Blog.findById(req.params.id);
    if (!getPostWithId) {
      return res.status(404).json({ error: "Blog post not found." });
    }
    res.json(getPostWithId);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the blog post." });
  }
};
exports.updateBlogById = async (req, res) => {
  try {
    const updatePostWithId = await Blog.findOneAndUpdate(
      { _id: req.params.id },
      {
        author: req.body.author,
        category: req.body.category,
        blogName: req.body.blogName,
      },
      { new: true }
    );
    if (!updatePostWithId) {
      return res.status(404).json({ error: "Blog post not found." });
    }
    res.json(updatePostWithId);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the blog post." });
  }
};
exports.deleteBlogById = async (req, res) => {
  try {
    const deletePostWithId = await Blog.deleteOne({ _id: req.params.id });
    if (!deletePostWithId) {
      return res.status(404).json({ error: "Blog post not found." });
    }
    res.json({ message: "Blog post deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the blog post." });
  }
};
