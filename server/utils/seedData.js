const Statement = require('../models/Statement');

const sampleStatements = [
  { text: 'she dont like playing football.', correctAnswer: 'She does not like playing football.', description: 'Subject-verb agreement and auxiliary verb correction.' },
  { text: 'where are you going.', correctAnswer: 'Where are you going?', description: 'Add proper question punctuation.' },
  { text: 'i has completed my homework', correctAnswer: 'I have completed my homework.', description: 'Fix pronoun capitalization and verb agreement.' },
  { text: 'he walk to school every day.', correctAnswer: 'He walks to school every day.', description: 'Correct verb conjugation for third person singular.' },
  { text: 'they is arriving late tonight.', correctAnswer: 'They are arriving late tonight.', description: 'Correct form of the verb to be for plural subject.' },
  { text: 'the cat chased it tail yesterday.', correctAnswer: 'The cat chased its tail yesterday.', description: 'Use possessive pronoun instead of contraction.' },
  { text: 'she can sings very well.', correctAnswer: 'She can sing very well.', description: 'Remove extra verb form after modal.' },
  { text: 'its raining outside so i stayed home.', correctAnswer: 'It’s raining outside, so I stayed home.', description: 'Fix contraction, punctuation, and capitalization.' },
  { text: 'do you knows the answer?', correctAnswer: 'Do you know the answer?', description: 'Correct verb agreement in a question.' },
  { text: 'we was late for the meeting.', correctAnswer: 'We were late for the meeting.', description: 'Use past tense of be for plural subject.' },
  { text: 'i will finished it tomorrow.', correctAnswer: 'I will finish it tomorrow.', description: 'Use base verb after future auxiliary.' },
  { text: 'each of the students have a book.', correctAnswer: 'Each of the students has a book.', description: 'Use singular verb with each of the phrase.' },
  { text: 'the childrens playground is closed.', correctAnswer: 'The children’s playground is closed.', description: 'Use plural possessive form correctly.' },
  { text: 'she is more taller than me.', correctAnswer: 'She is taller than me.', description: 'Remove redundant comparative modifier.' },
  { text: 'i enjoy to read books at night.', correctAnswer: 'I enjoy reading books at night.', description: 'Use gerund after enjoy.' },
  { text: 'there is many reasons to go.', correctAnswer: 'There are many reasons to go.', description: 'Correct plural subject-verb agreement.' },
  { text: 'how much people came to party?', correctAnswer: 'How many people came to the party?', description: 'Use many with countable noun and correct article.' },
  { text: 'she drove carefuly on the road.', correctAnswer: 'She drove carefully on the road.', description: 'Correct adverb spelling.' },
  { text: 'i have ate breakfast already.', correctAnswer: 'I have eaten breakfast already.', description: 'Use past participle after have.' },
  { text: 'he dont want to speak.', correctAnswer: 'He doesn’t want to speak.', description: 'Use contraction with third person singular.' },
  { text: 'everyone brought their book.', correctAnswer: 'Everyone brought his or her book.', description: 'Match pronoun with singular indefinite pronoun.' },
  { text: 'the homework are finished.', correctAnswer: 'The homework is finished.', description: 'Use singular verb with uncountable noun.' },
  { text: 'she is the intelligentest student.', correctAnswer: 'She is the most intelligent student.', description: 'Use correct superlative form.' },
  { text: 'i am going too the store.', correctAnswer: 'I am going to the store.', description: 'Fix common homophone mistake.' },
  { text: 'it seams like a good idea.', correctAnswer: 'It seems like a good idea.', description: 'Correct spelling of seems.' },
  { text: 'he has wrote the letter.', correctAnswer: 'He has written the letter.', description: 'Use past participle written.' },
  { text: 'we has been waiting for an hour.', correctAnswer: 'We have been waiting for an hour.', description: 'Use correct auxiliary verb with plural subject.' },
  { text: 'the book is very more interesting.', correctAnswer: 'The book is much more interesting.', description: 'Use correct comparative phrase.' },
  { text: 'i can finish it before you gets here.', correctAnswer: 'I can finish it before you get here.', description: 'Use base verb for second person.' },
  { text: 'she loves to play piano.', correctAnswer: 'She loves to play the piano.', description: 'Use article with musical instrument.' },
  { text: 'yesterday we goes to the mall.', correctAnswer: 'Yesterday we went to the mall.', description: 'Use past simple tense correctly.' }
];

const seedStatements = async () => {
  const count = await Statement.countDocuments();
  const existing = await Statement.find().select('text');
  const existingTexts = new Set(existing.map((item) => item.text));
  const missing = sampleStatements.filter((sample) => !existingTexts.has(sample.text));

  if (missing.length > 0) {
    await Statement.insertMany(missing);
    console.log(`Seeded ${missing.length} sample grammar statements`);
  }
};

module.exports = seedStatements;
