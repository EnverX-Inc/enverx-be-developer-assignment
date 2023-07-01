import { Router } from 'express';
import {
  createPost,
  getBlogs,
  getPost,
  updatePost,
} from '../controller/blog.conroller';

const router = Router();

router.get('/posts', getBlogs);

router.get('/posts/:id', getPost);

router.post('/posts', createPost);

router.put('/posts/:id', updatePost);

export default router;
