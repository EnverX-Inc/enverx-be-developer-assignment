const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    blog: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Art",
        "Technology",
        "Sports",
        "Travel",
        "Lifestyle",
        "Fashion",
        "others",
      ],
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, sort: { createdAt: -1 } }
);

module.exports = mongoose.model("blogs", blogSchema);
