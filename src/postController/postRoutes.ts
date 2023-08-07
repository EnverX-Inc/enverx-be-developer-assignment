import express from "express";

import postController from "./postController";


const router = express.Router();


router.get('/posts', postController.getPosts);

router.get('/posts/:id', postController.getPost);

router.post('/posts', postController.createPost);

router.put('/posts/:id', postController.updatePost);

router.delete('/posts/:id', postController.deletePost);



export = router;