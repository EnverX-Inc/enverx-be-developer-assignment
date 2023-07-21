const BlogPostModel = require("../db/model");
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const updatePost = async (req, res) => {
  const id = req.params.id;
  let updatedData = req.body; 
  updatedData.modifiedAt = Date.now();
  console.log(updatedData);

  try {
    // Find the blog post by id and update it with the new data
    const updatedPost = await BlogPostModel.findOneAndUpdate({id:id}, updatedData);
  
    if (!updatedPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
  
    return res.status(200).json(updatedPost);
      
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'An error occurred while updating the blog post.' });
  }
}

module.exports = updatePost;

  
  
  
  
  
  