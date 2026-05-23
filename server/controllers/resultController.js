const Statement = require('../models/Statement');
const Submission = require('../models/Submission');
const Result = require('../models/Result');

const normalizeText = (text) => text.trim().toLowerCase().replace(/[\s]+/g, ' ');

const submitResult = async (req, res, next) => {
  try {
    const statements = await Statement.find();
    const submissions = await Submission.find({ user: req.user._id });

    if (!statements.length) {
      return res.status(400).json({ success: false, message: 'No statements available to evaluate' });
    }

    const details = statements.map((statement) => {
      const submission = submissions.find((item) => item.statement.equals(statement._id));
      const correctedAnswer = submission ? submission.correctedAnswer : '';
      const isCorrect = submission
        ? normalizeText(correctedAnswer) === normalizeText(statement.correctAnswer)
        : false;

      return {
        statement: statement._id,
        originalText: statement.text,
        correctedAnswer,
        correctAnswer: statement.correctAnswer,
        isCorrect
      };
    });

    const correctCount = details.filter((item) => item.isCorrect).length;
    const totalQuestions = details.length;
    const accuracy = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);
    const score = correctCount;

    await Promise.all(
      submissions.map(async (submission) => {
        const statement = statements.find((item) => item._id.equals(submission.statement));
        if (statement) {
          submission.isCorrect = normalizeText(submission.correctedAnswer) === normalizeText(statement.correctAnswer);
          await submission.save();
        }
      })
    );

    const result = await Result.create({
      user: req.user._id,
      totalQuestions,
      correctCount,
      accuracy,
      score,
      details
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const getMyResults = async (req, res, next) => {
  try {
    const results = await Result.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

module.exports = { submitResult, getMyResults };
