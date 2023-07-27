const resolve = require('../util/resolve.js');
const postRepo = require('../repo/postRepo');
const getPostById = async (id) => {
	const [err, data] = await resolve(postRepo.getPostById(id));
	if (err || !data) {
		return false;
	}
	return data;
};

const getPosts = async (filter={}) => {
	const [err, data = { id: null }] = await resolve(postRepo.getPosts(filter));
	if (err) {
		return false;
	}
	return data;
};

const createPost = async (post = {}) => {
	const [err, data] = await resolve(postRepo.createPost(post));
	if (err || !data) {
		return false;
	}
	return data;
};

const updatePost = async (id, post = {}) => {
	const [err, data] = await resolve(postRepo.updatePost(id, post));
	console.log(data)
	if (err) {
		console.log(err)
		return false;
	}
	return data;
};

const deletePost = async (id) => {
	const [err, data] = await resolve(postRepo.deletePost(id));
	if (err) {
		return false;
	}
	if (!data) {
		return { id: null };
	}
	return { id };
};

module.exports = {
	getPostById,
	getPosts,
	createPost,
	updatePost,
	deletePost,
};
