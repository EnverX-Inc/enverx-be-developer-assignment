const postModel = require('../models/postModel.js');

const getPostById = async (id) => {
	return await postModel.findOne({ where: { id } });
};

const getPosts = async (filter = {}) => {
	return await postModel.findAll({
		where: filter,
		order: [
			['createdAt', 'ASC'],
			['blogName', 'ASC'],
		],
	});
};

const createPost = async (post = {}) => {
	return (await postModel.create(post));
};

const updatePost = async (id, updatedPost = {}) => {
	return (
		await postModel.update(updatedPost, {
			where: {
				id,
			},
		})
	);
};

const deletePost = async (id) => {
	return await Post.destroy({ where: { id } });
};

module.exports = {
	getPostById,
	getPosts,
	createPost,
	updatePost,
	deletePost,
};
