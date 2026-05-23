const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const seedStatements = require('./utils/seedData');
const authRoutes = require('./routes/authRoutes');
const statementRoutes = require('./routes/statementRoutes');
const resultRoutes = require('./routes/resultRoutes');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/statements', statementRoutes);
app.use('/api/results', resultRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Grammar Error Correction System API is running' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedStatements();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
