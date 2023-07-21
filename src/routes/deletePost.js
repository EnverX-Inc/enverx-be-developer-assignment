const BlogPostModel = require("../db/model");

const deletePost = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the blog post by id and remove it
    const deletedPost = await BlogPostModel.findOneAndDelete({id});
  
    if (!deletedPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
  
    return res.status(200).json({ message: 'Blog post deleted successfully.' });
    
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occurred while deleting the blog post.' });
    }
}

module.exports = deletePost;