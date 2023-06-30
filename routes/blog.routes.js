const express = require("express");
require("dotenv").config();

const { blogModel } = require("../models/blogModel");
const BlogRouter = express.Router();

//Get all blog posts
BlogRouter.get("/", async (req, res) => {
  try {
    const data = await blogModel.find();
    res.status(200).send({ msg: "Blog Data", Data: data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Get blog post by ID;
BlogRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await blogModel.findById(id);
    res.status(200).send({ msg: "Blog Data", Data: data });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// add blog post
BlogRouter.post("/", async (req, res) => {
  try {
    let { title, content, auther } = req.body;
    let data = new blogModel({ title, content, auther });
    await data.save();
    res.status(200).send({ msg: "Blog posted Successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: err.message });
  }
});

//update the blog post
BlogRouter.put("/:id", async (req, res) => {
  try {
    const { title, content, auther } = req.body;
    const id = req.params.id;
    const data = await blogModel.findOneAndReplace(
      { _id: id },
      {
        title,
        content,
        auther,
      }
    );
    await data.save();
    if (data) {
      res.status(200).send({ message: "Post data is updated Successfully" });
    } else {
      res.status(404).send({ message: "please check the data entered" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//delete the blog post
BlogRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await blogModel.findByIdAndDelete({ _id: id });
    if (data) {
      res
        .status(200)
        .send({ message: "Blog post data is deleted Successfully" });
    } else {
      res.status(404).send({ message: "please check the Id" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = { BlogRouter };
