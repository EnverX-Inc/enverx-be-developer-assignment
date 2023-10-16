const Post = require("../../model/blog/Post");
const asyncHandler = require("express-async-handler");
const apiError = require("../../utils/apiError");

//Create Post
exports.createPost = asyncHandler(async (req, res) => {
  // Create The Post
  const post = await Post.create(req.body);

  res.status(201).send({ data: post });
});

//Update Post
exports.updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }

  const doc = await Post.findOneAndUpdate(post._id, req.body, { new: true });

  res.status(200).json({ data: doc });
});

//Get List of Posts
exports.allPosts = asyncHandler(async (req, res) => {
  const post = await Post.find()

  const posts = post;

  res.status(200).json({ size: posts.length, data: posts });
});

//Get a single post
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new apiError(`No post for this id ${req.params.id}`, 404));
  }

  res.send(post);
});

//Delete Post
exports.deletePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) {
    return next(new apiError(`No Post for this id ${id}`));
  }
  await Post.findByIdAndDelete(id);

  res.status(204).send();
});
