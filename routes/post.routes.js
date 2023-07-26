const express = require('express');

const router = express.Router();
const { postController } = require('../controllers');
const { postValidators } = require('../validators');
const validate = require('../middlewares/validate');

router.route('/').get(postController.getPosts).post(validate(postValidators.createPost), postController.createPost);

router
  .route('/:postId')
  .get(validate(postValidators.postById), postController.getPostById)
  .put(validate(postValidators.updatePost), postController.updatePostById)
  .delete(validate(postValidators.postById), postController.deletePostById);

module.exports = router;
