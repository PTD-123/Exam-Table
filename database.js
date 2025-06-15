// db.js
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://PTDzz:11223344@cluster0.ioaguuz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

let dbInstance;

async function connectDB() {
  if (!dbInstance) {
    await client.connect();
    dbInstance = client.db('Test'); // หรือชื่อ database ที่คุณตั้งไว้ใน MongoDB Atlas
  }
  return dbInstance;
}

module.exports = connectDB;
