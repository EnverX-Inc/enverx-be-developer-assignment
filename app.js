const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

const ErrorHandler = require('./middlewares/errorHandler');
const userRouter = require('./routes/userRoute');
const postRouter = require('./routes/postRoute');

app.use('/auth',userRouter);
app.use('/users',postRouter);


app.use(ErrorHandler);

app.use((req,res,next) => {
    console.log('error catched by app.js error handler!');
    res.status(500).send('Something went wrong!');
})



app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log(`Server is listening on port ${process.env.PORT}`))
     .catch((error) => console.log(error))
})