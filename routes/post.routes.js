const express = require("express");
const { postController } = require("../controller/postController");

const postRoutes = express.Router();

postRoutes.get("/", postController.getAllPostPosts);
postRoutes.get("/:id", postController.getPostById);
postRoutes.post("/", postController.addPostPost);
postRoutes.put("/:id", postController.updatePostPost);
postRoutes.delete("/:id", postController.deletePostPost);

module.exports = { postRoutes };
