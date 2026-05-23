const Statement = require('../models/Statement');

const sampleStatements = [
  {
    text: 'she dont like playing football.',
    correctAnswer: 'She does not like playing football.',
    description: 'Subject-verb agreement correction.'
  },

  {
    text: 'i have ate breakfast already.',
    correctAnswer: 'I have eaten breakfast already.',
    description: 'Use correct past participle.'
  },

  {
    text: 'there is many reasons to go.',
    correctAnswer: 'There are many reasons to go.',
    description: 'Correct plural subject verb agreement.'
  }
];

const seedStatements = async () => {
  try {
    // Delete old statements
    await Statement.deleteMany();

    // Insert new 3 statements
    await Statement.insertMany(sampleStatements);

    console.log('✅ 3 Grammar Statements Seeded Successfully');
  } catch (error) {
    console.error('❌ Error seeding statements:', error.message);
  }
};

module.exports = seedStatements;