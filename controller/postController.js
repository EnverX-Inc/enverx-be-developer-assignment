const { PostModel } = require("../model/PostModel");

const getAllPostPosts = async (req, res) => {
  const { sortBy, sortDirection, category } = req.query;

  const query = {};
  if (category) {
    query.category = category;
  }

  let sortOptions = {};

  if (sortBy === "title") {
    sortOptions.title = sortDirection === "asc" ? 1 : -1;
  } else {
    sortOptions.createdAt = sortDirection === "asc" ? 1 : -1;
  }

  try {
    const posts = await PostModel.find(query).sort(sortOptions);
    console.log(posts);
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the posts" });
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    console.error("Error fetching post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the post" });
  }
};

const addPostPost = async (req, res) => {
  const { author, title, content, category } = req.body;

  if (!author || !title || !content || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newPost = new PostModel({
      author,
      title,
      content,
      category,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post" });
  }
};

const updatePostPost = async (req, res) => {
  const postId = req.params.id;
  const { author, title, content, category } = req.body;

  try {
    const existingPost = await PostModel.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    existingPost.author = author;
    existingPost.title = title;
    existingPost.content = content;
    existingPost.category = category;

    const updatedPost = await existingPost.save();
    res.json(updatedPost);
  } catch (error) {
    // Handle the case where an invalid ID is provided
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    console.error("Error updating post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  }
};

const deletePostPost = async (req, res) => {
  const postId = req.params.id;

  try {
    const deletedPost = await PostModel.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid post ID" });
    }

    console.error("Error deleting post:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
};
const postController = {
  getAllPostPosts,
  getPostById,
  addPostPost,
  updatePostPost,
  deletePostPost,
};

module.exports = { postController };
