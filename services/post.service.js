const httpStatus = require('http-status');
const { Post } = require('../models');
const ApiError = require('../utils/ApiError');
const { postMessages } = require('../messages');

/**
 * create Blog post
 * @param {Post} body post model body
 * @returns Promise<Post>
 */
const createPost = async (body = {}) => {
  const post = new Post(body);
  return post.save();
};

/**
 * get posts with pagination
 * @param {Object} filters Filter Object
 * @param {Object} options options for the pagination
 * @returns Promise<Post[]>
 */
const getPosts = async (filters = {}, options = {}) => {
  return Post.paginate(filters, options);
};
/**
 * get single post by filter
 * @param {Object} filters
 * @returns Promise<Post>
 */
const getPostByFilter = async (filters = {}) => {
  return Post.findOne(filters);
};

/**
 * get post by id
 * @param {string} id post id
 * @param {object} filters post field filter
 * @returns Promise<Post>
 */
const getPostByid = async (id, filters = {}) => {
  return getPostByFilter({ _id: id, ...filters });
};

/**
 * update post with id and filters
 * @param {string} id post id
 * @param {Object} body update post body object
 * @param {object} filters find post filter
 * @returns Promise<Post>
 */
const updatePostById = async (id, body, filters = {}) => {
  const post = await Post.findOneAndUpdate({ _id: id, ...filters }, { $set: body }, { new: true });
  if (!post) {
    throw new ApiError(postMessages.errors.POST_NOT_FOUND_ID, httpStatus.BAD_REQUEST);
  }
  return post;
};

/**
 * delete post by their id and filter
 * @param {string} id post id
 * @param {object} filters post find filter object
 * @returns Promise<Post>
 */
const deletePostById = async (id, filters = {}) => {
  const post = await Post.findOneAndDelete({ _id: id, ...filters });
  if (!post) {
    throw new ApiError(postMessages.errors.POST_NOT_FOUND_ID, httpStatus.BAD_REQUEST);
  }
  return post;
};

module.exports = {
  createPost,
  getPosts,
  getPostByFilter,
  getPostByid,
  deletePostById,
  updatePostById,
};
