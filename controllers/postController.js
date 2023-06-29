const postModel = require('../models/blogModel');
const userModel = require('../models/userModel');
const { post } = require('../routes/userRoute');


const getAllPosts = async (req,res,next) => {
    try{
        let posts = await postModel.find({}).populate('author',{_id : 0,name : 1,email : 1});
        res.status(200).json({
            status: 200,
            message : 'all the blog posts',
            data : [...posts]
        })
      }catch(error){
      next(error);
    }
}

const getPostById = async (req,res,next) => {
    try{
        let postId = req.params.id;
        let post = await postModel.findOne({_id : postId}).populate('author', {_id : 0,email : 1,name : 1})
        if(!post){
            let error = {
                status : 404,
                message : 'no such post id present!'
            }
            return next(error);
        }
        res.status(200).json({
            statusCode : 200,
            message : 'post of a particular id',
            data : [post]
        })
    }catch(error){
      next(error);
    }
}

const createPost = async (req,res,next) => {
    try{
        let {title,content} = req.body;
        let author = req.user.userId; 
        let newPost = new postModel({
           title,
           content,
           author
        })

        await newPost.save();
        res.status(201).json({
            statusCode : 201,
            message : 'New Post created!'
        })
    }catch(error){
      next(error);
    }
}

const updatePost = async (req,res,next) => {
    try{
        let postId = req.params.id;
        let {title,content} = req.body;

        const updatedPost = await postModel.findOneAndUpdate({_id : postId},{
            $set : {title : title, content : content}
        })

        res.status(200).json({
            status : 200,
            message : 'post updated successfully!'
        })
    }catch(error){
       next(new error('Error in updating the post!'));
    }
}

const deletePost = async (req,res,next) => {
    try{
        let postId = req.params.id;
        if(!postId){
            let error = {
                status : 400,
                message : "blog id not present!"
            }
            return next(error);
        }
        await postModel.findOneAndDelete({_id : postId});
        res.status(200).json({
            status : 200,
            message : 'post deleted successfully!'
        })
    }catch(error){
       next(error);
    }
}
module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}

