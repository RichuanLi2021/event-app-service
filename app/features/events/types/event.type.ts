import { Types, Document } from "mongoose";

export interface Event extends Document {
  title: string;
  description?: string;
  category: string;
  date: Date;
  location: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  organizer: Types.ObjectId;     // ref to User
}