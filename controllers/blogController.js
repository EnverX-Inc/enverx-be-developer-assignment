const Blog = require('../model/blogModel');

exports.getBlog = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            status: "success",
            length: blogs.length,
            data: blogs
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}