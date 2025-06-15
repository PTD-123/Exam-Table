const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectDB = require('../database');
const finUser = require('../controller/finduser');
const authenticateToken = require('../middleware/middleware');
const findSub = require('../controller/findsubject')

const JWT_SECRET = '1234'

router.get('/api/profile', authenticateToken, async (req, res) => {
    try {
      const user = await findUser.findByUsername(req.user.username);
      if (!user) return res.status(404).json({ message: 'User not found' });
      const subjects = await findSub.findSubjectByname(user.username);
      console.log({
        username: user.username,
        Major: user.Major,
        Minor: user.Minor,
        studentId: user.studentId,
        subjects: subjects
      });
      res.json({
        username: user.username,
        Major: user.Major,
        Minor: user.Minor,
        studentId: user.studentId,
        subjects: subjects
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;