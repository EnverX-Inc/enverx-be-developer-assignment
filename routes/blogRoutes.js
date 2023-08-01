const express = require("express");
const router = express.Router();
const {
  createBlogPost,
  getAllBlogPosts,
  getAllSortedAndFilteredBlogPosts,
  getBlogPostById,
  updateBlogPostById,
  deleteBlogPostById,
} = require("../controller/blogController");

//Create a new blog post
router.post("/post", createBlogPost);

//Get all blog posts
router.get("/get", getAllBlogPosts);

// Get all blog posts with sorting and Filtering according to the Date, author, CreatedAt property
router.get("/posts", getAllSortedAndFilteredBlogPosts);


// // Get a single blog post by ID
router.get("/get/:id", getBlogPostById);


// // Update a blog post by ID
router.put("/update/:id", updateBlogPostById)


// // Delete a blog post by ID
router.delete("/delete/:id", deleteBlogPostById)



module.exports = router;
