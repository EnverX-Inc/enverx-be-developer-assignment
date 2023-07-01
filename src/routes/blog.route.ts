import { Router } from 'express';
import {
  createPost,
  deletePost,
  getBlogs,
  getPost,
  updatePost,
} from '../controller/blog.conroller';

const router = Router();

// Get All Posts Route
router.get('/posts', getBlogs);

// Get Individual Post Route
router.get('/posts/:id', getPost);

// Insert Single Post
router.post('/posts', createPost);

// Update Single Post
router.put('/posts/:id', updatePost);

// Delete Single Post
router.delete('/posts/:id', deletePost);

export default router;
