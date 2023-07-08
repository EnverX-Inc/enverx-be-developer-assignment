const BlogService = require("../services/blogs.service")
const httpStatus = require("http-status")


const getAll = async (req, res) => {
    try {
        const {sortBy} = req.query  
        const sortOption = {}
        if(sortBy==="publishedAt"){
            sortOption.publishedAt = 1
        }
        else if (sortBy==="-publishedAt"){
            sortOption.publishedAt = -1
        }else if (sortBy==="category"){
            sortOption.category = 1
        }
        else if (sortBy==="-category"){
            sortOption.category = -1
        }
        else if (sortBy==="title"){
            sortOption.title = 1
        }
        else if (sortBy==="-title"){
            sortOption.title = -1
        }
        const data = await BlogService.findAll(sortOption)
        res.json(data).status(httpStatus.OK)
    } catch (err) {
        res.status(500).json({"message":err.message})
    }
}


const getBlogById = async (req,res)=>{
    try{
    const {id} =req.params
    console.log("hihihihih",id)
    const userId = await BlogService.getById(id);
    console.log(userId,"aaaaaa")
    res.status(httpStatus.OK).send(userId)
    }
    catch(err){
        console.log(err,"sasasas")
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({"message":err.message})
    }
}

const createBlog = async (req, res) => {

    try {
        const body = req.body;
        const createdDoc = await BlogService.create(body);
        res.status(httpStatus.CREATED).send(createdDoc)
    } catch (err) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({"message":err.message})
    }


}

const updateBlogById =async (req,res)=>{
    try{
    const {id} =req.params
    const body = req.body
    const updateID = await BlogService.updateById(id , body);
    console.log(updateID,"bbbbbbbbbbbb")
    res.status(httpStatus.OK).send(updateID)
    }
    catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({"message":err.message})
    }
}


const deleteBlogById =async (req,res)=>{
    try{
    const {id} =req.params
    const deleteID = await BlogService.deleteById(id);
    res.status(httpStatus.OK).send(deleteID)
    }
    catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({"message":err.message})
    }
}





module.exports = { createBlog, getAll,getBlogById , deleteBlogById , updateBlogById}