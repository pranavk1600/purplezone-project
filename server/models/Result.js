const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    totalQuestions: { type: Number, required: true },
    correctCount: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    score: { type: Number, required: true },
    details: [
      {
        statement: { type: mongoose.Schema.Types.ObjectId, ref: 'Statement' },
        originalText: { type: String },
        correctedAnswer: { type: String },
        correctAnswer: { type: String },
        isCorrect: { type: Boolean }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Result', resultSchema);
