/** @format */

var express = require(`express`);
var router = express.Router();
var Blog = require(`../models/Blog`);
var User = require(`../models/User`);
var auth = require(`../middleware/auth`);

// create blog

router.post(`/`, auth.verifyToken, async (req, res, next) => {
  req.body.author = req.user;
  console.log(req.user);
  let blogObj = {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author.userId,
  };

  try {
    let blog = await Blog.create(blogObj);

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

// GET /posts - Get all blog posts (Mandatory: Apply sorting based on created Date, blog name and filters based on category).

router.get(`/`, async (req, res, next) => {
  try {
    const sortOptions = { title: 1 };

    const blogs = await Blog.find({}).sort(sortOptions);
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
});

// GET /posts/:id - Get a specific blog post by ID.

router.get(`/:id`, async (req, res, next) => {
  const BlogId = req.params.id;
  try {
    const blog = await Blog.findOne({ _id: BlogId });

    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

// PUT /posts/:id - Update an existing blog post.

router.put(`/:id`, auth.verifyToken, async (req, res, next) => {
  const BlogId = req.params.id;
  // console.log(req.body, req.user);
  try {
    let blog = await Blog.findOne({ _id: BlogId });
    if (!blog) {
      return res.status(400).json({ errors: { body: "blog not found " } });
    }

    if (req.user.userId === blog.author.toString()) {
      blog = await Blog.findOneAndUpdate({ _id: BlogId }, req.body, {
        new: true,
      }).populate(`author`);
    }
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
});

// DELETE /posts/:id - Delete a blog post.

router.delete(`/:id`, auth.verifyToken, async (req, res, next) => {
  const BlogId = req.params.id;
  try {
    let blog = await Blog.findOne({ _id: BlogId });
    if (!blog) {
      return res.status(400).json({ errors: { body: "blog not found " } });
    }

    if (req.user.userId === blog.author.toString()) {
      blog = await Blog.findOneAndDelete({ _id: BlogId });
      return res
        .status(400)
        .json({ message: "Article is successfully deleted" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
