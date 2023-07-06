import { Request, Response } from "express";
import Blog from "../models/blog.model";

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    let filterOptions = {};
    const { filter } = req.query;
    if (filter) {
      filterOptions = { category: filter };
    }
    const posts = await Blog.find(filterOptions).sort({
      title: 1,
      createdAt: -1,
    });
    if (posts.length == 0) {
      return res.status(200).json({ message: "No Post available" });
    }
    return res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category } = req.body;
    const post = new Blog({ title, content, category });
    post
      .save()
      .then((result) => {
        return res.status(201).json({
          user: result,
          message: "Blog created Successfully",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error Creating Blog",
          reason: err.message,
        });
      });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
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
    return res.json(post);
  } catch (err: any) {
    if (err.codeName == "DuplicateKey") {
      return res
        .status(409)
        .json({ error: `Blog with ${req.body.title} title already exist` });
    }
    return res.status(500).json({ error: "Error updating blog", message: err });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    Blog.findById(id)
      .then((result) => {
        return res.status(200).json(result);
      })
      .catch((err) => {
        return res
          .status(404)
          .json({ error: "Post with given ID does not exist" });
      });
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
