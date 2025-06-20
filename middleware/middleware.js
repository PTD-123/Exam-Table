const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || '1234';

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user; // เก็บข้อมูล user ไว้ใน request object
    next();
  });
}

module.exports = authenticateToken;