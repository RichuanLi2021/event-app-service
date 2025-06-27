import { Document, model, Types } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ORGANIZER' | 'ADMIN';
  status: 'Active' | 'Inactive';
  createdAt: Date;
}

export type LeanUser = Omit<User, 'password'> & { _id: Types.ObjectId; password: string };

export type UserUpdateInput = Pick<User, 'name' | 'email'>;
