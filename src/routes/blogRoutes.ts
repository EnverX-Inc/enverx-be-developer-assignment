import express from "express";

import {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogController";

const router = express.Router();
router.post("/posts", createBlogPost);
router.get("/posts", getAllBlogPosts);
router.get("/posts/:id", getBlogPostById);
router.put("/posts/:id", updateBlogPost);
router.delete("/posts/:id", deleteBlogPost);

export default router;
