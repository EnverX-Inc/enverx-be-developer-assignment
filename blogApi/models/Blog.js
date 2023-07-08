/** @format */
var mongoose = require(`mongoose`);
var Schema = mongoose.Schema;
var User = "./User.js";

var blogSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: `User`,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
