// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/auth');
const dashRouter = require('./routes/dash')
const Middleware = require('./middleware/middleware')
const app = express();
const PORT = 3000;
const connectDB = require('./database');
const findUser = require('./controller/finduser')
const findSub = require('./controller/findsubject')
const subjectRoutes = require('./routes/subject')
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500'], // ครอบคลุมทุกกรณีที่ Live Server ใช้
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
// Middleware
app.use(bodyParser.json()); // หรือจะใช้ express.json() อย่างเดียวก็ได้
app.use(express.json());
app.get('/api/profile', Middleware, async (req, res) => {
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
        subjects: subjects})
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.use('/api', authRouter); 
app.use('/api',dashRouter);
app.use('/api', subjectRoutes);
// Serve static files (frontend HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
