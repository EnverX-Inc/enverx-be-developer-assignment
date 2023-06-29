const Joi = require('joi');

const signUpUserValidationSchema = Joi.object({
    password : Joi.string().required(),
    email: Joi.string().email().required()
})

const signInUserValidationSchema = Joi.object({
    password : Joi.string().required(),
    email : Joi.string().email().required()
})

module.exports = {
    signUpUserValidationSchema,
    signInUserValidationSchema
}