const mongoose = require('mongoose');

const statementSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    correctAnswer: { type: String, required: true, trim: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Statement', statementSchema);
