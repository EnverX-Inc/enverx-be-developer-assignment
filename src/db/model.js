const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// BlogPost Schema
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id:{
        type: Number,
        require: true,
        unique: true
    },
    description: {
        type: String,
        required: true
     },
    category: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date
    }
});

//validator for unique id
PostSchema.plugin(uniqueValidator);

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
