const express = require('express');
const mongoose = require("mongoose");
const app = express();
const env = require("dotenv").config();

const blogRoutes = require("./routes/blogs.js");

connectionMongo = () => {
    mongoose.connect(process.env.connectionUrl).then(console.log("db connected"))
}

app.use(express.json());
app.use("/posts", blogRoutes);

app.listen(8000,() => {
    connectionMongo();
    console.log("running on port 8000");
})