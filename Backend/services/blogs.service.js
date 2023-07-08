const blogsModel = require("../Models/blogs.model")
const httpStatus = require("http-status")
const ApiError=require("../utils/ApiError")
const create = async (doc) => {
    try {
        const newDoc = new blogsModel(doc)
        const savedDoc = await newDoc.save()
        console.log(savedDoc, "hhsdkjhas")
        return newDoc
    }
    catch (err) {
        if (err.code === 11000) {
            const { title } = err.keyValue
            if (title) {
                throw new ApiError(httpStatus.OK, `Duplicate Key error: ${title} title is already registered`)
            }
        }
        else {
            throw err
        }
    }
}
const findAll = async (sortOption) => {
    try{
    return await blogsModel.find().collation({ locale: 'en', strength: 2 }).sort(sortOption)
    }
    catch(err){
        throw new ApiError(httpStatus.NOT_FOUND,"Unable to fetch all blog post")
    }
}

const getById = async (id)=>{
    try{
        const blog = await blogsModel.findById(id)
        if(!blog){
            throw new ApiError(httpStatus.NOT_FOUND,"Blog not found")
        }
        return blog
    }catch(err){
        throw err
    }
}

const deleteById = async (id)=>{
    try{
        const deletedblog = await blogsModel.findByIdAndDelete(id)
        if(!deletedblog){
            throw new ApiError(httpStatus.NOT_FOUND,"Blog not found")
        }
        return deletedblog
    }catch(err){
        throw err
    }
}

const updateById = async (id, newData )=>{
    try{
        const updatedblog = await blogsModel.findByIdAndUpdate(id , newData, {new:true})
        if(!updatedblog){
            throw new ApiError(httpStatus.NOT_FOUND,"Blog not found")
        }
        return updatedblog
    }catch(err){
        throw err
    }
}


module.exports = { create, findAll , getById , deleteById ,updateById}