const { postService } = require('./../services/index');
const successDTO = require('./../dto/successDTO');
const errorDTO = require('./../dto/errorDTO');
const {isValidPost, isValidUUID, isValidPostUpdate} = require('./../util/validator')

const getPosts = async (req, res, next) => {
    const filters = req.query;
	const posts = await postService.getPosts(filters);
	if (!posts) {
		return next();
	}
	return res.status(200).send(successDTO({ data: posts, message: 'Posts fetched' }));
};

const getPostById = async (req, res, next) => {
	const { id } = req.params;
	if (!id || !isValidUUID(id)) {
		return res.status(401).json(errorDTO({ message: 'Post ID invalid' }));
	}
	const post = await postService.getPostById(id);
	if (!post) {
		return next();
	}
	if (!post.id) {
		return res.status(403).json(errorDTO({ message: 'Post Not Found' }));
	}
	return res.status(200).json(successDTO({ message: 'Post Fetched', data: post }));
};

const createPost = async (req, res, next) => {
	const newPost = req.body;
	if (!newPost || !isValidPost(newPost)) {
		return res.status(401).json(errorDTO({ message: 'Post content invalid' }));
	}
	const post = await postService.createPost(newPost);
	if (!post) {
		return next();
	}
	return res.status(200).json(successDTO({ message: 'Post Created' }));
};

const updatePost = async (req, res, next) => {
	const { id } = req.params;
    if (!id || !isValidUUID(id)) {
		return res.status(401).json(errorDTO({ message: 'Post ID invalid' }));
	}
	const newPost = req.body;
	if (!newPost || !isValidPostUpdate(newPost)) {
		return res.status(401).json(errorDTO({ message: 'Post content invalid' }));
	}
	const post = await postService.updatePost(id, newPost);
    console.log(post)
	if (!post) {
		return next();
	}
	return res.status(200).json(successDTO({ message: 'Post Updated' }));
};

const deletePost = async (req, res, next) => {
	const { id } = req.params;
	if (!id || !isValidUUID(id)) {
		return res.status(401).json(errorDTO({ message: 'Post ID required' }));
	}
	const post = await postService.getPostById(id);
	if (!post) {
		return next();
	}
	if (!post.id) {
		return res.status(403).json(errorDTO({ message: 'Post Not Found' }));
	}
	return res.status(200).json(successDTO({ message: 'Post Deleted' }));
};

module.exports = {
	getPostById,
	getPosts,
	createPost,
	updatePost,
	deletePost,
};
