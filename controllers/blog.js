const Blog = require("../models/Blog");
const error = require("../error");

module.exports = {
createBlog : async (req, res, next) => {
  const newBlog = new Blog(req.body);
  try {
    const savedBlog = await newBlog.save();
    res.status(200).json(savedBlog);
  } catch (err) {
    res.status(500).json({
        error: error.handleError(500,err.message)
     });
  }
},
deleteBlog: async (req, res, next) => {
  try {
    if(!req.params.id) throw "ID is required";
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await Blog.deleteOne();
      res.status(200).json("Blog has been deleted");
    } else {
      res.status(404).json({ error: error.handleError(500,"Blog not found")});
    }
  } catch (err) {
    res.status(500).json({
        error: error.handleError(500,err.message)
     });
  }
},
allBlogs: async (req, res, next) => {
  try {
    const allBlogs = await Blog.find({}).sort({
        createAt: -1,
      });
    res.status(200).json(allBlogs);
  } catch (err) {
    res.status(500).json({
        error: error.handleError(500,err.message)
     });
  }
},
specificBlog: async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id );
    if (blog) {
        res.status(200).json(blog);
      } else {
        res.status(404).json({ error: error.handleError(500,"Blog not found")});
      }
    } catch (err) {
      res.status(500).json({
          error: error.handleError(500,err.message)
       });
    }
},
updateBlog: async (req, res, next) => {
  try {
    let obj = {};
    if(req.body.title) obj.title = req.body.title;
    if(req.body.content) obj.content = req.body.content;
    if(req.body.author) obj.author = req.body.author;
    if(req.body.summary) obj.summary = req.body.summary;
    if(req.body.category) obj.category = req.body.category;
    const updatedBlog = await Blog.updateOne({id: req.params.id}, obj);
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({
        error: error.handleError(500,err.message)
     });
  }
}
}