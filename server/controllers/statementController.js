const Statement = require('../models/Statement');
const Submission = require('../models/Submission');

const normalizeText = (text) => text.trim().toLowerCase().replace(/[\s]+/g, ' ');

const getStatements = async (req, res, next) => {
  try {
    const statements = await Statement.find().sort({ createdAt: 1 });
    const submissions = await Submission.find({ user: req.user._id });

    const formatted = statements.map((statement) => {
      const userSubmission = submissions.find((submission) => submission.statement.equals(statement._id));
      return {
        id: statement._id,
        text: statement.text,
        savedAnswer: userSubmission ? userSubmission.correctedAnswer : '',
        status: userSubmission ? 'Saved' : 'Open',
        isCorrect: userSubmission ? userSubmission.isCorrect : false
      };
    });

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

const getRandomStatements = async (req, res, next) => {
  try {
    const attempted = await Submission.find({ user: req.user._id }).select('statement');
    const excludedIds = attempted.map((item) => item.statement);
    const sampleSize = Number(req.query.size) || 3;

    let statements = await Statement.aggregate([
      { $match: excludedIds.length ? { _id: { $nin: excludedIds } } : {} },
      { $sample: { size: sampleSize } }
    ]);

    if (statements.length < sampleSize) {
      statements = await Statement.aggregate([{ $sample: { size: sampleSize } }]);
    }

    const formatted = statements.map((statement) => ({
      id: statement._id,
      text: statement.text,
      savedAnswer: '',
      status: 'Open',
      isCorrect: false
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    next(error);
  }
};

const saveSubmission = async (req, res, next) => {
  try {
    const { correctedAnswer } = req.body;
    const statementId = req.params.id;

    if (!correctedAnswer || correctedAnswer.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'Provide a corrected sentence before saving.' });
    }

    const statement = await Statement.findById(statementId);
    if (!statement) {
      return res.status(404).json({ success: false, message: 'Statement not found' });
    }

    const isCorrect = normalizeText(correctedAnswer) === normalizeText(statement.correctAnswer);

    const submission = await Submission.findOneAndUpdate(
      { user: req.user._id, statement: statementId },
      {
        correctedAnswer: correctedAnswer.trim(),
        isCorrect,
        attempted: true,
        attemptedAt: new Date()
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      data: {
        id: submission._id,
        statementId,
        correctedAnswer: submission.correctedAnswer,
        isCorrect
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getStatements, getRandomStatements, saveSubmission };
