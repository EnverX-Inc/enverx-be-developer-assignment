const Blog = require("./posts.schema");

class PostService {
  createPost = async (postDetails) => {
    const post = new Blog(postDetails);
    return post.save();
  };

  updatePost = async (id, postDetails) => {
    const updatedPost = await Blog.findOneAndUpdate(
      { _id: id, isActive: true, userId: postDetails.userId },
      postDetails,
      {
        upsert: false,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    return updatedPost;
  };

  deletePost = async (id, userId) => {
    const updatedPost = await Blog.findOneAndUpdate(
      { _id: id, isActive: true, userId },
      { isActive: false },
      {
        upsert: false,
        new: true,
        setDefaultsOnInsert: true,
      }
    );
    return updatedPost;
  };

  getPostById = async (id) => {
    const postResponse = await Blog.findOne({
      _id: id,
      isActive: true,
    });
    return postResponse;
  };

  getPosts = async (queryParams) => {
    const {
      skip = 0,
      limit = 10,
      sortingKey = "createdAt",
      sortingOrder = -1,
      category = "",
      searchQuery = "",
    } = queryParams;

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

    const posts = await Blog.aggregate(query);
    const postsData = {
      data: posts[0].data,
      total:
        posts[0] &&
        posts[0].total &&
        posts[0].total.length &&
        posts[0].total[0].count,
    };

    return postsData;
  };
}

module.exports = new PostService();
