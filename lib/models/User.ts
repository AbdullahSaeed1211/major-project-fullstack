import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
  role: 'user' | 'doctor' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profileImage: { type: String },
    role: { 
      type: String, 
      enum: ['user', 'doctor', 'admin'], 
      default: 'user' 
    },
  },
  { 
    timestamps: true 
  }
);

// Prevent model overwrite error during hot reloading in development
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 