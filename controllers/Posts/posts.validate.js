const joi = require("@hapi/joi");
const { validate } = require("../../utility/validate");

module.exports = {
  validateCreatePosts: async (req, res, next) => {
    const schema = joi.object().keys({
      blog: joi.string().required(),
      category: joi.string().required(),
      userId: joi.string().required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateUpdatePost: async (req, res, next) => {
    const schema = joi.object().keys({
      userId: joi.string().required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateDeletePost: async (req, res, next) => {
    const schema = joi.object().keys({
      userId: joi.string().required(),
    });
    await validate(schema, req.body, res, next);
  },
};
