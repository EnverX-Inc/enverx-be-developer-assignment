const app = require('express')();
const PostController = require('../controllers/postControllers.js')

app.get('/', PostController.getPosts);

app.get('/:id', PostController.getPosts);

app.post('/', PostController.createPost);

app.put('/:id', PostController.updatePost);

app.delete('/:id', PostController.deletePost);

module.exports = app;