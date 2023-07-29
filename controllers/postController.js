// Import the Post model
const Post = require("../models/Post");

// Function to get all blogs with optional sorting and filtering
exports.getAllBlogs = async (req, res) => {
  const { sortBy, category } = req.query;

  // Prepare an empty query object to add filtering options if provided
  let query = {};

  if (category) {
    query.category = category;
  }

  let sortOptions = {};

  if (sortBy === "createdDate") {
    sortOptions.createdDate = -1;
  } else if (sortBy === "name") {
    sortOptions.name = 1;
  }

  try {
    const posts = await Post.find(query).sort(sortOptions);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving blog." });
  }
};

// Function to create a new blog post
exports.createNewBlog = async (req, res) => {
  console.log(req.body)
  try {
    const newPost = await new Post({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error in creating the blog post." });
  }
};

// Function to get a blog post by its ID
exports.getBlogById = async (req, res) => {
  try {
    const getPostById = await Post.findById(req.params.id);
    if (!getPostById) {
      return res.status(404).json({ error: `Blog post not found with ${id}` });
    }
    res.json(getPostById);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the blog post." });
  }
};

// Function to update a blog post by its ID
exports.updateBlogById = async (req, res) => {
  const { name, description, category } = req.body;

  // Check if any update fields were provided
  if (!name && !description && !category) {
    return res.status(400).json({
      message:
        "Please provide at least one field (name, description, and category to update!",
    });
  }

  // Construct the update object based on provided fields
  const updateFields = {};
  if (name) updateFields.name = name;
  if (description) updateFields.description = description;
  if (category) updateFields.category = category;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error.error(error);
    res.status(500).json({ message: "Error updating the post!" });
  }
};

// Function to delete a blog post by its ID
exports.deleteBlogById = async (req, res) => {
  try {
    const deletePostWithId = await Post.deleteOne({ _id: req.params.id });
    if (!deletePostWithId) {
      return res.status(404).json({ error: "Blog not found." });
    }
    res.json({ message: "Blog deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting the blog!" });
  }
};
