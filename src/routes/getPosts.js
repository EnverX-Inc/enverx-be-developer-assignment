const BlogPostModel = require("../db/model");


const getBlogPosts = async(req, res)=> {
    try {
      const { sortBy, filterByCategory } = req.query;
      let query = { };
  
      // Filter based on category (tags)
      if (filterByCategory) {
        query.category = filterByCategory;
      }
  
      // Sorting based on the provided sortBy parameter
      let sortOptions = {};
      switch(sortBy){
        case "createdDate":
          sortOptions = { createdAt: 1 };
          break;
        
        case "blogName":
          sortOptions = { title: 1 };
          break;
      }
  
      //while filters is not apply there query={} and sortOptions={}
      const blogPosts = await BlogPostModel.find(query).sort(sortOptions);

      if (!blogPosts) {
        return res.status(404).json({ message: 'Blog post not found.' });
      }
      res.status(200).json(blogPosts);
  
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching blog posts.' });
    }
}

const getBlogPostsById = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the post by id
    const blogPost = await BlogPostModel.findOne({id}); 
    if (!blogPost) {
      return res.status(404).json({ message: 'Blog post not found.' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    console.error('Error while fetching blog post by id:', error);
    res.status(500).json({ error: 'An error occurred while fetching the blog post.' });
  }
}


module.exports = {
  getBlogPosts,
  getBlogPostsById
}