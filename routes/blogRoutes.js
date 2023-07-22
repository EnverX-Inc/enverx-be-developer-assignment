const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/posts", blogController.getAllBlogs);
router.post("/posts", blogController.createNewBlog);
router.get("/posts/:id", blogController.getBlogById);
router.put("/posts/:id", blogController.updateBlogById);
router.delete("/posts/:id", blogController.deleteBlogById);

module.exports = router;
