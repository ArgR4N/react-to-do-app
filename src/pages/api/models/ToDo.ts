import { Schema, model } from 'mongoose';
import { Activity, activitySchema } from './Activity';

interface ToDo {
  title: string;
  createdAt: Date;
  activities: Activity[];
  doneActivities: Activity[];
  userId: string;
}

const toDoSchema = new Schema<ToDo>({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  activities: {type: [activitySchema], required: true },
  doneActivities: {type: [activitySchema], required: true },
  userId: {type: String, required: true }
});

const ToDo = model<ToDo>('ToDo', toDoSchema);

module.exports = ToDo;