import express from "express";

import {
  fetchAllBlogPosts,
  fetchBlogPostById,
  createNewBlogPost,
  updateExistingBlogPost,
  deleteExistingBlogPost,
} from "../controllers/Blog";

const router = express.Router();
router.post("/posts", createNewBlogPost);
router.get("/posts", fetchAllBlogPosts);
router.get("/posts/:id", fetchBlogPostById);
router.put("/posts/:id", updateExistingBlogPost);
router.delete("/posts/:id", deleteExistingBlogPost);

export default router;