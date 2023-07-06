import { Request, Response } from "express";
import Blog from "../models/blog.model";
import { validationResult } from "express-validator";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const { filter } = req.query;
    let filterOptions = {};
    if (filter) {
      filterOptions = { category: filter };
    }
    const posts = await Blog.find(filterOptions).sort({
      title: 1,
      createdAt: -1,
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, content, category } = req.body;
    const post = new Blog({ title, content, category });
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: errors });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const post = await Blog.findByIdAndUpdate(
      { _id: id },
      { title, content, category },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully" });
  } catch (err: any) {
    if (err.name === "CastError") {
      return res
        .status(404)
        .json({ error: "Post with given ID does not exist" });
    }
    res.status(500).json({ error: "Internal server error", reason: err });
  }
};
