import { Schema, model } from 'mongoose';
import { Event } from '../types/event.type';

const EventSchema = new Schema<Event>(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    date: Date,
    location: String,
    status: { type: String, enum: ['PENDING','APPROVED','REJECTED'], default: 'PENDING' },
    organizer: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

export default model<Event>('Event', EventSchema);