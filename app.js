const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));



app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log(`Server is listening on port ${process.env.PORT}`))
     .catch((error) => console.log(error))
})