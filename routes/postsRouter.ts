import express from 'express'
import {newPost, getAllPosts, getPost, updatePost, deletePost} from '../controllers/postsController'


const postsRouter: express.Router = express.Router()

postsRouter.get('/', getAllPosts)

postsRouter.post('/', newPost)

postsRouter.get('/:id', getPost)

postsRouter.put('/:id', updatePost)

postsRouter.delete('/:id', deletePost)


export default postsRouter