import { Router } from 'express';
import { createPost, getBlogs, getPost } from '../controller/blog.conroller';

const router = Router();

router.get('/posts', getBlogs);

router.get('/posts/:id', getPost);

router.post('/posts', createPost);

export default router;
