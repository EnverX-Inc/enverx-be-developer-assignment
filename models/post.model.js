const mongoose = require('mongoose');

const { Schema } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');
const slugify = require('slugify');
const { toJSON } = require('./plugin');

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    slug: {
      type: String,
    },
    author: {
      type: String,
    },
    meta: {
      description: {
        type: String,
      },
      keywords: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

postSchema.plugin(mongoosePaginate);
postSchema.plugin(toJSON);

/**
 * slugifying the title before saving it.
 */
postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  this.slug += `-${Math.floor(1000 + Math.random() * 9000)}`;
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
