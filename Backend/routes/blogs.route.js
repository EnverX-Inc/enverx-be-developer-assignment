const router = require("express").Router()
const BlogController = require("../controllers/blogs.controller")
const validation =require("../middlewares/validate")
const blogValidation = require("../validations/blogs.validation")

router.get("/",validation(blogValidation.getAll),BlogController.getAll)

router.get("/:id",validation(blogValidation.validById),BlogController.getBlogById)

router.post("/",validation(blogValidation.createBlog),BlogController.createBlog)

router.put("/:id",validation(blogValidation.validById),BlogController.updateBlogById)

router.delete("/:id",validation(blogValidation.validById),BlogController.deleteBlogById)

module.exports=router