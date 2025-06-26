import { Schema, model } from 'mongoose';
import { User } from '../types/user.type';

const UserSchema = new Schema<User>(
  {
    name: String,
    email:  { 
      type: String, 
      required: true, 
      unique: true 
    },
    password:{ 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['USER','ORGANIZER','ADMIN'], 
      default: 'USER' 
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: null
    }
  },
  { timestamps: true }
);

export const UserModel = model<User>('User', UserSchema);