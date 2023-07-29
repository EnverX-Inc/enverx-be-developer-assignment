const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("Post", PostSchema);
