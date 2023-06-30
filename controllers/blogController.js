const Blog = require('../model/blogModel');
const AppError = require('../utils/appError');

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
        return next(new AppError(error, 500));
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
        return next(new AppError(error, 500));
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
        return next(new AppError(error, 500));
    }
}

exports.updateOne = async (req, res, next) => {
    try {
        const id = req.params.id;
        const doc = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!doc) {
            return next(new AppError("No Blog found with this id", 404));
        }
        res.status(200).json({
            status: "success",
            data: {
                blog: doc,
            },
        });

    } catch (error) {
        return next(new AppError(error, 500));
    }
}

exports.deleteOne = async (req, res, next) => {
    try {
        const doc = await Blog.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(new AppError("No Blog found with this id", 404));
        }
        res.status(200).json({
            status: "success",
            data: {
                blog: null,
            },
        });
    } catch (error) {
        return next(new AppError(error, 500));
    }
}