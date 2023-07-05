const joi = require("@hapi/joi");

module.exports = {
  validateRegistration: async (req, res, next) => {
    const schema = joi.object().keys({
      name: joi.string().min(4).required(),
      email: joi.string().required().email(),
      password: joi.string().min(8).required(),
    });
    await validate(schema, req.body, res, next);
  },

  validateLogin: async (req, res, next) => {
    const schema = joi.object().keys({
      email: joi.string().required().email(),
      password: joi.string().min(8).required(),
    });
    await validate(schema, req.body, res, next);
  },

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

const validate = async (schema, reqData, res, next) => {
  try {
    await joi.validate(reqData, schema, {
      abortEarly: false,
      allowUnknown: true,
    });
    next();
  } catch (e) {
    const errors = e.details.map(({ path, message, value }) => ({
      path,
      message,
      value,
    }));
    res.status(400).format({
      json: () => {
        res.send({ message: "Invalid request", errors, code: 400 });
      },
    });
  }
};
