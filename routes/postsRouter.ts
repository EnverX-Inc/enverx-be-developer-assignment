import express from 'express'
const { Validator } = require("express-json-validator-middleware");
import {newPost, getAllPosts, getPost, updatePost, deletePost} from '../controllers/postsController'

const { validate } = new Validator();

const postsRouter: express.Router = express.Router()

const newPostSchema = {
    type: "object",
    required: ["title", "content"],
    properties: {
        title: {
            type: "string",
            minLength: 1,
            maxLength: 120,
        },
        content: {
            type: "string",
            minLength: 1,
            maxLength: 1000,
        },
        category_id: {
            type: "number",
            minimum: 1
        },
    },
};

const updatePostSchema = {
    type: "object",
    properties: {
        title: {
            type: "string",
            minLength: 1,
            maxLength: 120,
        },
        content: {
            type: "string",
            minLength: 1,
            maxLength: 1000,
        },
        category_id: {
            type: "number",
            minimum: 1
        },
    },
};

postsRouter.get('/', getAllPosts)

postsRouter.post('/', validate({ body: newPostSchema}), newPost)

postsRouter.get('/:id', getPost)

postsRouter.put('/:id', validate({body: updatePostSchema}), updatePost)

postsRouter.delete('/:id', deletePost)


export default postsRouter