const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createBlog ={
    body:Joi.object().keys({
        email:Joi.string().email().required(),
        title:Joi.string().required(),
        author_name:Joi.string().required(),
        twitterHandle:Joi.string().allow(""),
        image:Joi.string(),
        content:Joi.string(),
        category:Joi.string(),
        publishedAt:Joi.date()

    })
}
const validById ={
    params:Joi.object().keys({
        id:Joi.string().custom(objectId)
    })
}

const getAll ={
    query:Joi.object().keys({
        sortBy: Joi.string().valid('publishedAt', '-publishedAt', 'category', '-category', 'title', '-title')
    })
}

module.exports ={createBlog,validById,getAll}