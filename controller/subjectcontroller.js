const connectDB = require('../database');

async function deleteSubjectByCode(code) {
  const db = await connectDB();
  const collection = db.collection('ชื่อ collection ที่เก็บวิชา');
  const result = await collection.deleteOne({ code: code }); // หรือตามชื่อ field จริงๆ
  
  return result.deletedCount > 0;
}

module.exports = { deleteSubjectByCode };
