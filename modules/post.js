const BlogModel = require("../models/blog");
const { apiFailureMessage, apiSuccessMessage } = require("../common/constants");

class PostModule {
  createPost = async (req, res) => {
    try {
      const postResponse = await new BlogModel(req.body).save();
      res.json({
        response: postResponse,
        message: apiSuccessMessage.POST_CREATED_SUCCESSFULLY,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  updatePost = async (req, res) => {
    try {
      const updatedPost = await BlogModel.findOneAndUpdate(
        { _id: req.params.id, isActive: true, userId: req.body.userId },
        req.body,
        {
          upsert: false,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
      if (!updatedPost)
        return res
          .status(404)
          .send({ message: apiFailureMessage.POST_NOT_FOUND, statusCode: 404 });

      res.json({
        response: updatedPost,
        message: apiSuccessMessage.POST_UPDATED_SUCCESSFULLY,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  deletePost = async (req, res) => {
    try {
      const updatedPost = await BlogModel.findOneAndUpdate(
        { _id: req.params.id, isActive: true, userId: req.body.userId },
        { isActive: false },
        {
          upsert: false,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
      if (!updatedPost)
        return res
          .status(404)
          .send({ message: apiFailureMessage.POST_NOT_FOUND, statusCode: 404 });

      res.json({
        message: apiSuccessMessage.POST_DELETED_SUCCESSFULLY,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getPostById = async (req, res) => {
    try {
      const postResponse = await BlogModel.findOne({
        _id: req.params.id,
        isActive: true,
      });
      if (!postResponse)
        return res
          .status(404)
          .send({ message: apiFailureMessage.POST_NOT_FOUND, statusCode: 404 });

      res.json({
        postResponse,
        message: apiSuccessMessage.POST_FETCHED_SUCCESSFULLY,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  getPosts = async (req, res) => {
    try {
      const {
        skip = 0,
        limit = 10,
        sortingKey = "createdAt",
        sortingOrder = -1,
        category = "",
        searchQuery = "",
      } = req.query;

      let matchObj = {
        $match: {
          isActive: true,
        },
      };
      if (category)
        matchObj.$match = {
          ...matchObj.$match,
          category: { $regex: category, $options: "i" },
        };

      if (searchQuery)
        matchObj.$match = {
          ...matchObj.$match,
          $or: [
            { blog: { $regex: searchQuery, $options: "i" } },
            { category: { $regex: searchQuery, $options: "i" } },
          ],
        };

      let query = [
        {
          $facet: {
            data: [
              matchObj,
              {
                $sort: { [sortingKey]: parseInt(sortingOrder) },
              },
              {
                $skip: parseInt(skip),
              },
              {
                $limit: parseInt(limit),
              },
            ],
            total: [matchObj, { $group: { _id: null, count: { $sum: 1 } } }],
          },
        },
      ];

      const posts = await BlogModel.aggregate(query);
      if (posts && !posts[0].data.length)
        return res.json({
          data: [],
          total: 0,
          message: apiSuccessMessage.POST_FETCHED_SUCCESSFULLY,
          statusCode: 200,
        });

      res.json({
        data: posts[0].data,
        total:
          posts[0] &&
          posts[0].total &&
          posts[0].total.length &&
          posts[0].total[0].count,
        message: apiSuccessMessage.POST_FETCHED_SUCCESSFULLY,
        statusCode: 200,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };
}

module.exports = new PostModule();
