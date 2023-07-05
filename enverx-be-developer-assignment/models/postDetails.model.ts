import mongoose, { Document, Schema } from 'mongoose';
import { Category } from '../utility/typings/category';

interface Ipost extends Document {
  userId: mongoose.Types.ObjectId;
  blog: string;
  category: Category;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema<Ipost> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
    blog: { type: String, maxLength: 256, required: true },
    category: { type: String, enum: Object.values(Category), required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, sort: { createdAt: -1 } }
);

postSchema.index({ userId: 1 });

const postModel = mongoose.model<Ipost>('post', postSchema);

export default postModel;
