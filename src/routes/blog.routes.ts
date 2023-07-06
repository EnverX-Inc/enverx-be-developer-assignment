import express from "express";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/blog.controller";
import { check } from "express-validator";
import { createPostMiddleware } from "../middlewares/blog.middleware";
const router = express.Router();

const blogCreateValidations = [
  check("title")
    .trim()
    .notEmpty()
    .isString()
    .isLength({ min: 4 })
    .withMessage("valid blog title required")
    .escape(),
  check("content")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("valid blog content required")
    .escape(),
  check("category")
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("valid blog category required")
    .escape(),
];

const blogUpdateValidations = [
  check("title")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("blog title must be at least 3 characters")
    .escape(),
  check("content")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("blog content must be at least 3 characters")
    .escape(),
  check("category")
    .optional()
    .trim()
    .isString()
    .isLength({ min: 3 })
    .withMessage("blog category must be at least 3 characters")
    .escape(),
];

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", blogCreateValidations, createPostMiddleware, createPost);
router.put("/:id", blogUpdateValidations, updatePost);
router.delete("/:id", deletePost);

export default router;
