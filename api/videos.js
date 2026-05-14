const path = require('path');
const jwt = require('jsonwebtoken');
const videos = require('../data/videos.json');

function authenticate(req) {
  const auth = req.headers['authorization'];
  const token = auth && auth.split(' ')[1];
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    const sorted = [...videos].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return res.status(200).json(sorted);
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
