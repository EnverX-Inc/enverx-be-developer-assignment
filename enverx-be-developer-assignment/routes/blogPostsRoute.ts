import express from 'express';
import { Router } from 'express'; 
import { verifyToken } from '../middlewares/userVerification';
import { validatepost } from '../middlewares/validator';
import * as postsController from '../controllers/posts.controller';

const router: Router = express.Router();

router.get('/posts', verifyToken, postsController.getAllPosts);
router.get('/posts/:id', verifyToken, postsController.getPost);
router.post('/posts', verifyToken, validatepost, postsController.savePost);
router.put('/posts/:id', verifyToken, validatepost, postsController.updatePost);
router.delete('/posts/:id', verifyToken, postsController.deletePost);

export { router as postRouter };
