const express = require("express");
const bolgController = require('../controllers/blogController')

const router = express.Router();

router
    .route('/posts')
    .get(bolgController.getAllBlogs)
    .post(bolgController.postBlog);

router
    .route('/posts/:id')
    .get(bolgController.getBlog)
    .put(bolgController.updateOne)
    .delete(bolgController.deleteOne)

module.exports = router;