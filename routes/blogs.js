const express = require("express");
const {
  createBlog,
  deleteBlog,
  updateBlog,
  allBlogs,
  specificBlog,
} = require("../controllers/blog.js");

const router = express.Router();

// Create a blog
router.post("/", createBlog);

// Delete a blog
router.delete("/:id", deleteBlog);

//Update a blog
router.put("/:id", updateBlog);

//Get all blogs
router.get("/", allBlogs);

//Get specific blog
router.get("/:id", specificBlog);


module.exports = router;