const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  auther: { type: String, required: true },
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = {
  blogModel,
};
