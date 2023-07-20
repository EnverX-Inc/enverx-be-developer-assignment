const express=require('express');
const router=express.Router();
const blogController=require('../controllers/blogs.controllers');
const validator=require('./../middleware/schema.validator')
const {validate}=require('../middleware/auth.validator');


router.route('/')
            .get(blogController.getBlogs)
            .post(validator.createBlogValidator,blogController.postBlog);
router.route('/:id')
            .put(validator.blogIdValidator,validator.updateBlogValidator,blogController.updateBlog)
            .delete(validator.blogIdValidator,blogController.deleteBlog)
            .get(blogController.getBlogById);   

module.exports=router;            
             
