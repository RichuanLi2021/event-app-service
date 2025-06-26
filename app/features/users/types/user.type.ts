import { Document, model } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: 'USER' | 'ORGANIZER' | 'ADMIN';
  status: 'Active' | 'Inactive';
  createdAt: Date;
}

export type UserUpdateInput = Pick<User, 'name' | 'email'>;
