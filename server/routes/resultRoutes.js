const express = require('express');
const { submitResult, getMyResults } = require('../controllers/resultController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.post('/submit', submitResult);
router.get('/my', getMyResults);

module.exports = router;
