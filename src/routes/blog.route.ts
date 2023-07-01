import { Router } from 'express';
import { getBlogs, getPost } from '../controller/blog.conroller';

const router = Router();

router.get('/posts', getBlogs);

router.get('/posts/:id', getPost);

export default router;
