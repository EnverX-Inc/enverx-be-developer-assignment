const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required()
});

const updatePostSchema = Joi.object({
  title: Joi.string(),
  content: Joi.string()
});


module.exports = {
  createPostSchema,
  updatePostSchema
};
