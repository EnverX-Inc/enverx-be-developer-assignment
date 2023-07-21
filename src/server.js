const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const config = require("./config");
const BlogPostModel = require("./db/model")

const app = express();
app.use(bodyParser.json({ limit: '2mb' }));


const { getBlogPosts, getBlogPostsById } = require('./routes/getPosts');
const createPost = require('./routes/createPost');
const validateReqData = require('./middleware/createPostValidation');
const  updatePost  = require('./routes/updatePost');
const deletePost = require('./routes/deletePost');

//database conect 
mongoose.connect(config.dbUrl,config.connectionParams)
  .then( () => {
    console.log('Database is Connected Successfully')
  })
  .catch( (err) => {
    console.error(`Error While connecting to the database. \n${err}`);
    process.exit();	
  })


app.get('/posts/:id',getBlogPostsById);
app.get('/posts', getBlogPosts);

// API endpoint to create a new blog post
app.post('/posts',validateReqData,createPost);

//API endpoint to update a old blog post
app.put('/posts/:id',updatePost);

//delete
app.delete('/posts/:id', deletePost);









app.listen(config.port || 3000 ,()=>{
    console.log(`server is run on port ${config.port}`)
})


