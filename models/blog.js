const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  blogName: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  category: { type: String, required: true },
  author: { type: String, required: true },
});
module.exports = mongoose.model("Blog", blogSchema);
