const BlogPostModel = require("../db/model");
const { validationResult } = require('express-validator');

const createPost =  async(req, res)=> {
    //validate req prams 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      //throw Error when req have not proper prams
      return res.status(400).json({ errors: errors.array() });
    }
  
    const {title, description, category, id} = req.body;
    const currentTime = Date.now();
    
    const blogPost = new BlogPostModel({
      id:id,
      title: title,
      description: description,
      updatedAt: currentTime,
      modifiedAt: currentTime,
      category: category ||null
    })
  
    try {
      await blogPost.save(); 
      res.status(200).json({success: true, message: "blog added!", data:blogPost});
  
    } catch(err) {
      //if id is not unique 
      if (err.errors.id.kind == "unique" ) {
        res.status(409).json({error : "Id is not Unique "});
  
      } else {
        //when get internal server error 
        res.status(500).json({error : "internal server error"});
      }
    }
}


module.exports = createPost;