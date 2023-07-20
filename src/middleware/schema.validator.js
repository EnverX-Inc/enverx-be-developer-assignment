const Joi = require('joi');
const {HttpError}=require('../utils/httpError')

const blogIdSchema = Joi.object({
  id: Joi.string().length(1).hex().required()
});

const updateBlogSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  description: Joi.string(),
  author:Joi.string().min(3).max(30),
});

const createBlogSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  description: Joi.string(),
  author:Joi.string().min(3).max(30),
});

const createBlogValidator = (req, res, next) => {
  try {
    const { error } = createBlogSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const blogIdValidator = (req, res, next) => {
  try {
    const { error } = blogIdSchema.validate(req.params);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

const updateBlogValidator = (req, res, next) => {
  try {
    const { error } = updateBlogSchema.validate(req.body);
    if (error) {
      throw new HttpError(error.message, 400);
    }
    next();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = {
  blogIdValidator,
  createBlogValidator,
  updateBlogValidator,
};