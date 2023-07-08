const mongoose = require("mongoose")

const validator = require("validator")

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author_name: {
        type: String,
        maxlength: 50,
        required: true,
    },
    email: {
        type: String,
        maxlength: 50,
        required: true,
        validate: (emailId) => {
            if (validator.isEmail(emailId)) {
                return true
            }
            return false
        }
    },
    twitterHandle: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        validate: (img) => {
            if (validator.isURL(img)) {
                return true
            }
            return false
        },
        default:"https://example.com/image.jpg"
    },
    content: {
        type: String,
        default: ""
    },
    category: {
        type: String,
        enum: ['Technology', 'Travel', 'Food', 'Fashion', 'Health', 'Lifestyle', 'Other'],
        default: 'Other'
    },
    publishedAt: {
        type: Date,
        default: null
    }
})

const blogsModel = mongoose.model("blogs", blogSchema)

module.exports = blogsModel


