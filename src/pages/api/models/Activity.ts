import { Schema, model } from 'mongoose';

export interface Activity {
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export const activitySchema = new Schema<Activity>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Activity = model<Activity>('Activity', activitySchema);

module.exports = Activity;