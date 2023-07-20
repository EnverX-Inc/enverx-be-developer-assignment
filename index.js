const express=require('express')
const app=express();
app.use(express.json())
const PORT=3000;


const blogRoutes=require('./src/routes/blogs.routes');
app.use('/posts',blogRoutes);

const userRoutes=require('./src/routes/user.routes');
app.use('/user',userRoutes)

app.listen(PORT,()=>{
    console.log(`started listening to port: ${PORT}`);
})