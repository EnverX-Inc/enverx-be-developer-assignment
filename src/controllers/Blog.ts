import { Request, Response } from "express";
import Blog from "../models/Blog";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

interface QueryFilters {
  category?: string;
}

interface SortOptions {
  createdAt?: number;
  title?: number;
}

export const fetchAllBlogPosts = async (req: Request, res: Response) => {
  const { sortBy, category } = req.query;
  const filters: QueryFilters = {};

  if (category) {
    filters.category = category as string;
  }

  const sorting: SortOptions = {};

  if (sortBy === "createdAt") {
    sorting.createdAt = -1;
  } else if (sortBy === "title") {
    sorting.title = 1;
  }

  try {
    const blogPosts = await Blog.find(filters).sort(sorting as string);
    res.json(blogPosts);
  } catch (error) {
    handleError(res, error, "Failed to fetch blog posts");
  }
};

export const fetchBlogPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFoundError(res, "Invalid blog post ID");
  }

  try {
    const blogPost = await Blog.findById(id);
    if (!blogPost) {
      return notFoundError(res, "Blog post not found");
    }

    res.json(blogPost);
  } catch (error) {
    console.log("Error ", error);
    handleError(res, error, "Failed to fetch the blog post");
  }
};

export const createNewBlogPost = async (req: Request, res: Response) => {
  const { author, title, content, category } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return validationError(res, errors.array());
  }

  try {
    const newBlogPost = new Blog({ author, title, content, category });
    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    handleError(res, error, "Failed to create a new blog post");
  }
};

export const updateExistingBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFoundError(res, "Invalid blog post ID");
  }
  const { author, title, content, category } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return validationError(res, errors.array());
  }

  try {
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      id,
      { author, title, content, category },
      { new: true }
    );

    if (!updatedBlogPost) {
      return notFoundError(res, "Blog post not found");
    }

    res.json(updatedBlogPost);
  } catch (error) {
    handleError(res, error, "Failed to update the blog post");
  }
};

export const deleteExistingBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return notFoundError(res, "Invalid blog post ID");
  }

  try {
    const deletedBlogPost = await Blog.findByIdAndDelete(id);

    if (!deletedBlogPost) {
      return notFoundError(res, "Blog post not found");
    }

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    handleError(res, error, "Failed to delete the blog post");
  }
};

function notFoundError(res: Response, message: string) {
  return res.status(404).json({ error: message });
}

function validationError(res: Response, errors: any[]) {
  return res.status(400).json({ errors });
}

function handleError(res: Response, error: any, message: string) {
  console.error(error);
  res.status(500).json({ error: message });
}
