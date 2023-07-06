import mongoose, { Document, Schema } from "mongoose";
import IBlog from "../interfaces/blog.interface";

const blogSchema = new Schema<IBlog>({
  title: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Blog = mongoose.model<IBlog>("BlogData", blogSchema);

export default Blog;
