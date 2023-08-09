import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: [50, "Content must be at least 50 characters long"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Technology", "Travel", "Food", "Lifestyle", "Other"],
        message: "Invalid category",
      },
    },
    tags: [
      {
        type: String,
      },
    ],
    images: [
      {
        url: String,
        alt: String,
      },
    ],
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
