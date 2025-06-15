const connectDB = require('../database');

async function findByUsername(username) {
  const db = await connectDB();
  const usersCollection = db.collection('ts');
  const user = await usersCollection.findOne({ username: username });
  return user;
}

module.exports = { findByUsername };