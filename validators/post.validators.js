const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    meta: Joi.object()
      .keys({
        description: Joi.string().required(),
        keywords: Joi.string().required(),
        thumbnail: Joi.string().required(),
      })
      .required(),
  }),
};

const updatePost = {
  params: Joi.object().keys({
    postId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    meta: Joi.object().keys({
      description: Joi.string(),
      keywords: Joi.string(),
      thumbnail: Joi.string(),
    }),
  }),
};

const postById = {
  params: Joi.object().keys({
    postId: Joi.objectId().required(),
  }),
};

module.exports = {
  createPost,
  updatePost,
  postById,
};
