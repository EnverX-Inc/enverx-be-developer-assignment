import Redis from 'ioredis';
import { promisify } from 'util';
import { fetchAllPosts, getPostById, createPost, updatePostById, deletePostById } from '../services/post.service';
import { Request, Response } from 'express';
import { FilterCategory } from '../utility/typings/category';
import {isEmpty, isUndefined, get as getLodash } from 'lodash';

interface CustomRequest extends Request {
  user?: {  id: string,email: string};
}

const redisClient = new Redis();
const redisSetAsync = promisify(redisClient.set).bind(redisClient);

export const getAllPosts = async (request: CustomRequest, response: Response) => {
  try {
    const { category } = request.query;
    let filter = (isEmpty(request.query))?{}:{ category } as FilterCategory
    const cacheKey = JSON.stringify(filter);

    const allPostsdata = await fetchAllPosts(filter);
    if (!isUndefined(allPostsdata)) {
      const { result = [], count } = allPostsdata;

      await redisSetAsync(cacheKey, JSON.stringify(allPostsdata));

      response.setHeader('x-total-count', getLodash(count, '0.count', 0));
      return response.status(200).json({ result });
    }

    return response.status(204).json();
  } catch (error) {
    return response.status(500).json({ error });
  }
};


export const getPost = async (request: Request, response: Response) => {
    try {
        const postId = request.params.id
        const post = await getPostById(postId)
        if (post) {
            return response.status(200).json({ post })
        }
        return response.status(404).json({ message: 'no posts found or invalid id' })
    } catch (error) {
        return response.status(500).json({ error })
    }
}

export const savePost = async (request: CustomRequest, response: Response) => {
    try {
        const { blog, category } = request.body
        const userId = request.user?.id 
        if (!blog || !category || !userId) {
            return response.status(400).json({ error: 'Bad Request' });
        }
        const createdPost = await createPost({ blog, category, userId })
        return response.status(201).json({ data: createdPost })

    } catch (error) {
        return response.status(500).json({ error })
    }
}

export const updatePost = async (request: Request, response: Response) => {
    try {
        const { blog, category } = request.body
        const postId = request.params.id
        const newpost = await updatePostById( { postId, blog, category }) 
        if (newpost.modifiedCount > 0) return response.status(201).json()
        return response.status(201).json()
    } catch (error) {
        return response.status(500).json({ error })
    }
}

export const deletePost = async (request: Request, response: Response) => {
    try {
        const postId = request.params.id
        if (!postId) {
            return response.status(400).json({ error: 'Bad Request' });
        }
        const isDeleted = await deletePostById(postId)
        if (!isDeleted) return response.status(404).json({ error: 'Not Found' })

        return response.status(204).json()
    } catch (error) {
        return response.status(500).json({ error })
    }
}
