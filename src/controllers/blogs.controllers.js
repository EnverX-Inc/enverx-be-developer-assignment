const services=require('../services/blogs.services');

const getBlogs=async(req,res)=>{
    try{
        const blogs=await services.getBlogs();
        res.status(200).json({
            Blogs:blogs
        })

    }catch(error){
        res.status(500).json({
            error:error.message
        })
    }
}

const getBlogById=async(req,res)=>{
    try {
        const {id}=req.params;
        const blog=await services.getBlogById(id);
        res.status(200).json({
            Blogs:blog
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const updateBlog=async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,description,author}=req.body;
        await services.updateBlog(id,title,description,author);
        res.status(204).json()
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const deleteBlog=async(req,res)=>{
    try {
        const {id}=req.params;
        await services.deleteBlog(id);
        res.status(204).json()
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const postBlog=async(req,res)=>{
    try {
        const {title,description,author}=req.body;
        console.log(title,description,author);
        const newBlog=await services.postBlog(title,description,author);
        res.status(201).json(newBlog)
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

module.exports={postBlog,updateBlog,getBlogs,getBlogById,deleteBlog}