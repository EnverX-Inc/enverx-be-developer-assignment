const express = require("express");
const router = express.Router();

const PostController = require("./posts.controller");
const PostValidation = require("./posts.validate");
const { auth } = require("../../middleware/auth");

router.get("/", auth, PostController.getPosts);

router.post(
  "/",
  auth,
  PostValidation.validateCreatePosts,
  PostController.createPost
);

router.put(
  "/:id",
  auth,
  PostValidation.validateUpdatePost,
  PostController.updatePost
);

router.delete(
  "/:id",
  auth,
  PostValidation.validateDeletePost,
  PostController.deletePost
);

router.get("/:id", auth, PostController.getPostById);

module.exports = router;
