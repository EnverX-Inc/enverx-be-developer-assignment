const httpStatus = require('http-status');
const _ = require('lodash');
const { postService } = require('../services');
const catchAsync = require('../utils/catchAsync');
const response = require('../utils/response');
const ApiError = require('../utils/ApiError');
const { postMessages } = require('../messages');

const createPost = catchAsync(async (req, res) => {
  const { body } = req;
  const post = await postService.createPost(body);
  return response.successResponse(res, httpStatus.OK, { post }, postMessages.success.CREATE_POST);
});

const getPosts = catchAsync(async (req, res) => {
  const options = _.pick(req.query, ['page', 'limit', 'sortBy']);
  const posts = await postService.getPosts({}, options);
  return response.successResponse(res, httpStatus.OK, { posts }, postMessages.success.FETCH_POST);
});

const getPostBySlug = catchAsync(async (req, res) => {
  const { slug } = req.params;
  const post = await postService.getPostByFilter({ slug });
  if (!post) {
    throw new ApiError(postMessages.errors.POST_NOT_FOUND_SLUG, httpStatus.NOT_FOUND);
  }
  return response.successResponse(res, httpStatus.OK, { post }, postMessages.success.FETCH_POST);
});

const getPostById = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const post = await postService.getPostByFilter({ _id: postId });
  if (!post) {
    throw new ApiError(postMessages.errors.POST_NOT_FOUND_ID, httpStatus.NOT_FOUND);
  }
  return response.successResponse(res, httpStatus.OK, { post }, postMessages.success.FETCH_POST);
});

const deletePostById = catchAsync(async (req, res) => {
  const { postId } = req.params;
  const post = await postService.deletePostById(postId);
  return response.successResponse(res, httpStatus.OK, { post }, postMessages.success.DELETE_POST);
});

const updatePostById = catchAsync(async (req, res) => {
  const { body, params } = req;
  const { postId } = params;
  const post = await postService.updatePostById(postId, body);
  return response.successResponse(res, httpStatus.OK, { post }, postMessages.success.UPDATE_POST);
});

module.exports = {
  createPost,
  getPostBySlug,
  getPosts,
  deletePostById,
  updatePostById,
  getPostById,
};
