import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema<User> = new mongoose.Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, index: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

UserSchema.set('toJSON', { virtuals: true });

UserSchema.index({ email: 1 });

UserSchema.set('toObject', {
  transform: (doc: Document, ret: any) => {
    delete ret.password;
    return ret;
  }
});

export default mongoose.model<User>('User', UserSchema);
