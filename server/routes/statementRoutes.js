const express = require('express');
const { getStatements, getRandomStatements, saveSubmission } = require('../controllers/statementController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.get('/', getStatements);
router.get('/random', getRandomStatements);
router.put('/:id/submission', saveSubmission);

module.exports = router;
