const mongoose = require('mongoose');

const AtivitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  dateFor: { type: Date, default: Date.now}
});

const Ativity = mongoose.model('Ativity', AtivitySchema);
module.exports = Ativity;