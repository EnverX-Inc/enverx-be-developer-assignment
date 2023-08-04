import { Request, Response } from "express";
import Blog from "../models/blogModel";

interface Filter {
  category?: String | any
}

interface SortOptions{
  createdAt?: Number
  title?: Number
}

export const getAllBlogPosts = async (req: Request, res: Response) => {
  const { sortBy, category } = req.query;
  let query: Filter={};
  if (category) {
    query.category = category;
  }
  let sortOptions: SortOptions = {};
  if (sortBy === "createdAt") {
    sortOptions.createdAt = -1;
  } else if (sortBy === "title") {
    sortOptions.title = 1;
  }
  try {
    const blogPosts = await Blog.find(query).sort(sortOptions as string);
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlogPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blogPost = await Blog.findById(id);
    if (!blogPost) {
      res.status(404).json({ error: "Blog post not found" });
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
  console.log("The request body is :", req.body);
  const { author, title, content, category } = req.body;
  try {
    const blogPost = new Blog({ author, title, content, category });
    const savedBlogPost = await blogPost.save();
    return res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author, title, content, category } = req.body;
  try {
    const updatedBlogPost = await Blog.findByIdAndUpdate(
      id,
      { author, title, content, category },
      { new: true }
    );
    if (!updatedBlogPost) {
      res.status(404).json({ error: "Blog post not found" });
    } else {
      res.json(updatedBlogPost);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBlogPost = await Blog.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      res.status(404).json({ error: "Blog post not found" });
    } else {
      res.json({ message: "Blog post deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
