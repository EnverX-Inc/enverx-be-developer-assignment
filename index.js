const express=require('express')
const app=express();
app.use(express.json())
const PORT=3000;


const blogRoutes=require('./src/routes/blogs.routes');
app.use('/posts',blogRoutes);

app.listen(PORT,()=>{
    console.log(`started listening to port: ${PORT}`);
})