const router=require('express').Router();
// const Post=require('../models/Post');
const postController = require("../controllers/postController");


router.post("/posts", postController.createNewBlog);//checked
router.get("/posts", postController.getAllBlogs);//checked
router.get("/posts/:id", postController.getBlogById);//checked
router.put("/posts/:id", postController.updateBlogById);//checked
router.delete("/posts/:id", postController.deleteBlogById);//

module.exports = router;