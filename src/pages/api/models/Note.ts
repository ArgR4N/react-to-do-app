import { Schema, model, connect } from 'mongoose';

interface Note {
  title: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<Note>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Note = model<Note>('Note', noteSchema);

module.exports = Note;