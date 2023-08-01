const { StatusCodes } = require("http-status-codes");
const BlogPost = require("../models/BlogPost");
const Joi = require("joi");

// Joi validation schema for blog post data

const blogPostValidationSchema = Joi.object({
  postId: Joi.string().uuid({ version: ["uuidv1", "uuidv4"] }),
  title: Joi.string().required().min(5).max(100),
  content: Joi.string().required().min(5),
  author: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid(
      "Technology blogs",
      "Food blogs",
      "Travel blogs",
      "Health and fitness blogs",
      "Lifestyle blogs",
      "Fashion and beauty blogs",
      "Photography blogs",
      "Personal blogs",
      "others",
    ), // Define the valid categories
});

// Create a new blog post
const createBlogPost = async (req, res) => {
  try {
    // Validate the request data against the schema

    const { error } = blogPostValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.details[0].message });
    }

    // Create a new blog post using the request data

    const { postId, title, content, author, category, created_at } = req.body;

    const newBlogPost = new BlogPost({
      postId,
      title,
      content,
      author,
      category,
      created_at,
    });
    console.log("newBlogPost", newBlogPost);

    // Save the new blog post to the database
    const savedBlogPost = await newBlogPost.save();

    res.status(StatusCodes.CREATED).json(savedBlogPost);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

// Get all blog posts with sorting and filtering by category
const getAllSortedAndFilteredBlogPosts = async (req, res) => {
  try {
    const { sortBy, category } = req.query;

    // Create the filter object based on the category parameter
    const filterOptions = {};
    if (category) {
      filterOptions.category = category;
    }

    // Create the sort object based on the sortBy parameter
    const sortOptions = {};
    if (sortBy === "date") {
      sortOptions.createdAt = -1; // Sort by createdAt in descending order (latest first)
    } else if (sortBy === "author") {
      sortOptions.author = 1; // Sort by title (blog name) in ascending order (A to Z)
    }

    // Fetch all blog posts and apply sorting and filtering using the Mongoose find() method
    const blogPosts = await BlogPost.find(filterOptions).sort(sortOptions);

    res.json(blogPosts);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

// Get a single blog post by ID
const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Blog post not found" });
    }
    res.json(blogPost);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

// Update a blog post by ID
const updateBlogPostById = async (req, res) => {
  try {
    // Validate the request data against the schema
    const { error } = blogPostValidationSchema.validate(req.body);
    if (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: error.details[0].message });
    }

    const updatedBlogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        category: req.body.category,
      },
      { new: true } // Return the updated document
    );

    if (!updatedBlogPost) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Blog post not found" });
    }

    res.json(updatedBlogPost);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

// Delete a blog post by ID
const deleteBlogPostById = async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!deletedBlogPost) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Blog post not found" });
    }

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Something went wrong" });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getAllSortedAndFilteredBlogPosts,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
};
