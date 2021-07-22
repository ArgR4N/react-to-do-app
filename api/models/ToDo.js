const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  activities: {type: Array, required: true },
  userId: {type: String, required: true }
});

const ToDo = mongoose.model('ToDo', ToDoSchema);

module.exports = ToDo;