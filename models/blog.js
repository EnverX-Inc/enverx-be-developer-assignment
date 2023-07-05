const { model, Schema, default: mongoose } = require("mongoose");
const blogSchema = Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    blog: { type: String, required: true },
    category: { type: String, required: true, enum: ['Food', 'Travel', 'Lifestyle', 'Fashion'] },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("blogs", blogSchema);
