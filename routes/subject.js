const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require('../database');
const { findByUsername } = require('../controller/finduser');
const SubjectController = require('../controller/subjectcontroller');
const router = express.Router();

// Middleware ตรวจสอบ token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, '1234', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // user.username จะถูกใช้งานตรงนี้
    next();
  });
}

// 🔥 DELETE /api/subject/:subjectId
router.delete('/subject/:code', authenticateToken, async (req, res) => {
    try {
      const code = req.params.code;
      // ลบวิชาจาก DB ตาม code
      const result = await SubjectController.deleteSubjectByCode(code);
      if (!result) {
        return res.status(404).json({ message: 'ไม่พบวิชาที่จะลบ' });
      }
      res.json({ message: 'ลบวิชาเรียบร้อยแล้ว' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'ลบไม่สำเร็จ: Delete failed' });
    }
  });

module.exports = router;
