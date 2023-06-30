const Blog = require('../model/blogModel');

exports.getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({
            status: "success",
            length: blogs.length,
            data: {
                blogs
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.postBlog = async (req, res, next) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.status(200).json({
            status: "success",
            data: {
                newBlog,
            },
        });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.getBlog = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const blog = await Blog.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                blog,
            },
        });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.updateOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const doc = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!doc) {
            res.status(404).json({
                status: 'fail',
                message: "No Blog found with this id"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                blog: doc,
            },
        });

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            res.status(404).json({
                status: 'fail',
                message: "No Blog found with this id"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                blog: null,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        })
    }
}