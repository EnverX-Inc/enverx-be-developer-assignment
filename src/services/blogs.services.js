const {Blog}=require('../../database/models/index');

const getBlogs=async()=>{
    const blogs=await Blog.findAll();
    return blogs;
}

const getBlogById=async(id)=>{
    const blog=await Blog.findByPk(id);;
    return blog;
}

const deleteBlog=async(id)=>{
    await Blog.destroy({
        where:{
            id
        }
    })
}

const updateBlog=async(id,title,description,author)=>{
    await Blog.update(
        {
            title,
            description,
            author
        },
        {
            where:{
                id
            }
        }
    )
}

const postBlog=async(title,desc,author)=>{
    const newBlog=await Blog.create({title:title,description:desc,author:author});
    return newBlog;
}

module.exports={getBlogs,getBlogById,deleteBlog,postBlog,updateBlog}
