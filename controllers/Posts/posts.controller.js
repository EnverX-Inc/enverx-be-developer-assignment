const {
  apiFailureMessage,
  apiSuccessMessage,
  statusCodes,
} = require("../../constants");
const PostService = require("./posts.service");

class PostController {
  createPost = async (req, res, next) => {
    const { body } = req;
    try {
      const postResponse = await PostService.createPost(body);
      res.status(statusCodes.SUCCESS).json({
        response: postResponse,
        message: apiSuccessMessage.POST_CREATED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req, res, next) => {
    const {
      body,
      params: { id },
    } = req;
    try {
      const updatedPost = await PostService.updatePost(id, body);
      if (!updatedPost)
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: apiFailureMessage.POST_NOT_FOUND });

      res.status(statusCodes.SUCCESS).json({
        response: updatedPost,
        message: apiSuccessMessage.POST_UPDATED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req, res, next) => {
    const {
      params: { id },
      body: { userId },
    } = req;
    try {
      const deletedPost = await PostService.deletePost(id, userId);
      if (!deletedPost)
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: apiFailureMessage.POST_NOT_FOUND });

      res.status(statusCodes.SUCCESS).json({
        message: apiSuccessMessage.POST_DELETED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  };

  getPostById = async (req, res, next) => {
    const {
      params: { id },
    } = req;
    try {
      const postResponse = await PostService.getPostById(id);
      if (!postResponse)
        return res
          .status(statusCodes.NOT_FOUND)
          .json({ message: apiFailureMessage.POST_NOT_FOUND });

      res.status(statusCodes.SUCCESS).json({
        response: postResponse,
        message: apiSuccessMessage.POST_FETCHED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  };

  getPosts = async (req, res, next) => {
    const { query } = req;
    try {
      const postsData = await PostService.getPosts(query);
      if (postsData.data.length === 0)
        return res.status(statusCodes.SUCCESS).json({
          data: [],
          total: 0,
          message: apiSuccessMessage.POST_FETCHED_SUCCESSFULLY,
        });

      res.status(statusCodes.SUCCESS).json({
        data: postsData.data,
        total: postsData.total,
        message: apiSuccessMessage.POST_FETCHED_SUCCESSFULLY,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new PostController();
