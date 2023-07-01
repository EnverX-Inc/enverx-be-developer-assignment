import { Router } from 'express';
import { getBlogs } from '../controller/blog.conroller';

const router = Router();

router.get('/posts', getBlogs);

export default router;
