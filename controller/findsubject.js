const connectDB = require('../database');

async function findSubjectByname(username) {
  const db = await connectDB();
  const subjectsCollection = db.collection('User+Subject');

  const userWithSubjects = await subjectsCollection.findOne({ username: username });
  return userWithSubjects?.subjects || [];
}

module.exports = { findSubjectByname };