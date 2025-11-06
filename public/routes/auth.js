// public/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const AdminMongo = require('../models/Admin');
const router = express.Router();

/**
 * ===========================
 * POST /auth/login (MongoDB Only)
 * ===========================
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    // 🔹 Find admin in MongoDB
    const admin = await AdminMongo.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

    // 🔹 Check password
    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    // 🔹 Generate JWT
    const tokenPayload = { id: admin._id, email: admin.email, db: 'MongoDB' };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' });

    // 🔹 Set cookie
    res.cookie('auth_token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: false, // change to true in production
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Auth login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /auth/logout
 */
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ message: 'Logged out' });
});

/**
 * GET /auth/verify
 */
router.get('/verify', (req, res) => {
  const token = req.cookies?.auth_token || (req.headers['authorization']?.split(' ')[1]);
  if (!token) return res.status(401).json({ valid: false });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ valid: false });
    res.json({ valid: true, user: payload });
  });
});

module.exports = router;
