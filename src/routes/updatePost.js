const BlogPostModel = require("../db/model");

const updatePost = async (req, res) => {
  const id = req.params.id;
  let updatedData = req.body;

  //also update modified date 
  updatedData.modifiedAt = Date.now();

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

  
  
  
  
  
  