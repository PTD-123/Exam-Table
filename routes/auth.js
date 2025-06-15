const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectDB = require('../database');  // ตรวจสอบว่าชื่อไฟล์ถูกต้อง
const finUser = require('../controller/finduser')

const JWT_SECRET = '1234';  // เปลี่ยนเป็นคีย์ลับของคุณจริงๆ

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', username, password);
    if (!username) {
      return res.status(401).json({ message: 'Enter Username' });
    }
    if (!password) {
      return res.status(401).json({ message: 'Enter Password' });
    }

    const db = await connectDB();
    const usersCollection = db.collection('ts');  // ชื่อ collection ของคุณ
    const user = await usersCollection.findOne({ username, password });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET ,{ expiresIn: '1h' });
    console.log(token)
    res.json({ token });
    // if (user){
    //     return res.status(200).send("Login Success!")
    // }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
