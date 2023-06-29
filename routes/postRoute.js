const express = require('express');
const { isAuthenticated } = require('../middlewares/authentication');
const { createPostSchema,updatePostSchema} = require('../middlewares/validationSchema/postValidation');
const validateRequest = require('../middlewares/validateRequest');
const postRouter = express.Router();
const postController = require('../controllers/postController');

postRouter.get('/posts', postController.getAllPosts);

postRouter.get('/posts/:id',postController.getPostById);

postRouter.post('/posts',isAuthenticated,validateRequest(createPostSchema), postController.createPost);

postRouter.put('/posts/:id', isAuthenticated, validateRequest(updatePostSchema),  postController.updatePost);

postRouter.delete('/posts/:id', isAuthenticated, postController.deletePost);
module.exports = postRouter;