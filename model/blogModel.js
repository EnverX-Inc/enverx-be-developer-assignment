const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Blog must have title"]
    },
    author: {
        type: String,
        required: [true, "Author name is required"]
    },
    image: {
        type: String
    },
    bolgContent: {
        type: String,
        required: [true, "A blog must have description"]
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    }
});


const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;