const express = require("express");
const router = express.Router();

const {
  createPost,
  updatePost,
  allPosts,
  getPost,
  deletePost,
} = require("../../controllers/blog/postCtr");

const {
  createPostValidator,
  removePostValidator,
  updatePostValidator,
  getPostValidator
} = require("../../utils/validators/postValidator");

//Create Post
router.post(
  "/",
  createPostValidator,
  createPost
);

//Update Post
router.put(
  "/:id",
  updatePostValidator,
  updatePost
);

//get all Post
router.get("/", allPosts);

//get single post
router.get(
  "/:id",
  getPostValidator,
  getPost
);

// @desc Delete a Post
router.delete(
  "/:id",
  removePostValidator,
  deletePost
);

module.exports = router;
