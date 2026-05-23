const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    statement: { type: mongoose.Schema.Types.ObjectId, ref: 'Statement', required: true },
    correctedAnswer: { type: String, required: true, trim: true },
    isCorrect: { type: Boolean, default: false },
    attempted: { type: Boolean, default: true },
    attemptedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

submissionSchema.index({ user: 1, statement: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);
