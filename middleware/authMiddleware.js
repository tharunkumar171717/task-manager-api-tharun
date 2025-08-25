const jwt = require('jsonwebtoken');
const index=require('../config/index');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({message: 'Access denied, token missing'});

  try {
    const decoded = jwt.verify(token, index.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({message: 'Invalid token'});
  }
};

module.exports = authMiddleware;
