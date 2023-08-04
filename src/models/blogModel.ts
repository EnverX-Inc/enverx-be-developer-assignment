import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    author: {
        type: String,
        required: [true, "Please add the author name"],
    },
    title: {
        type: String,
        required: [true, "Please add the Title of blog"],
    },
    content: {
        type: String,
        required: [true],
    },
    category: {
        type: String,
        required: [true],
    },
},
{
    timestamps: true,
}
);

export default mongoose.model("Blog_post", blogSchema);