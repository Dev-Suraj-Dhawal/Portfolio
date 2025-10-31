// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const pool = require("./db");
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");

// const router = express.Router();

// // Nodemailer setup
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // 📌 Register: Send verification code
// router.post("/register", async (req, res) => {
//   try {
//     const { email, phone } = req.body;
//     const [existing] = await pool.query("SELECT * FROM users WHERE email=? OR phone=?", [email, phone]);

//     if (existing.length > 0) return res.status(400).json({ message: "User already exists!" });

//     const code = Math.floor(100000 + Math.random() * 900000).toString();
//     const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

//     await pool.query("INSERT INTO users (email, phone, verification_code, verification_expires) VALUES (?, ?, ?, ?)",
//       [email, phone, code, expires]);

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Verify Your Account",
//       text: `Your verification code is ${code}. It expires in 10 minutes.`,
//     });

//     res.json({ message: "Verification code sent!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Verify account & set password
// router.post("/verify", async (req, res) => {
//   try {
//     const { email, code, password } = req.body;
//     const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);

//     if (rows.length === 0) return res.status(400).json({ message: "User not found!" });
//     const user = rows[0];

//     if (user.verification_code !== code || new Date(user.verification_expires) < new Date()) {
//       return res.status(400).json({ message: "Invalid or expired code!" });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     await pool.query(
//       "UPDATE users SET password_hash=?, is_verified=1, verification_code=NULL, verification_expires=NULL WHERE email=?",
//       [hash, email]
//     );

//     res.json({ message: "Account verified and password set!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);

//     if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials!" });

//     const user = rows[0];
//     const valid = await bcrypt.compare(password, user.password_hash);

//     if (!valid) return res.status(400).json({ message: "Invalid credentials!" });

//     const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     res.json({ message: "Login successful!", token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Forgot Password: send reset token
// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body;
//     const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);

//     if (rows.length === 0) return res.status(400).json({ message: "User not found!" });

//     const resetToken = crypto.randomBytes(20).toString("hex");
//     const resetTokenHash = await bcrypt.hash(resetToken, 10);
//     const resetExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 min

//     await pool.query("UPDATE users SET reset_token_hash=?, reset_expires=? WHERE email=?", [resetTokenHash, resetExpires, email]);

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset",
//       text: `Your reset token is ${resetToken}. It expires in 30 minutes.`,
//     });

//     res.json({ message: "Reset token sent!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Reset Password
// router.post("/reset-password", async (req, res) => {
//   try {
//     const { email, token, newPassword } = req.body;
//     const [rows] = await pool.query("SELECT * FROM users WHERE email=?", [email]);

//     if (rows.length === 0) return res.status(400).json({ message: "User not found!" });

//     const user = rows[0];
//     if (new Date(user.reset_expires) < new Date()) return res.status(400).json({ message: "Token expired!" });

//     const valid = await bcrypt.compare(token, user.reset_token_hash);
//     if (!valid) return res.status(400).json({ message: "Invalid token!" });

//     const hash = await bcrypt.hash(newPassword, 10);
//     await pool.query("UPDATE users SET password_hash=?, reset_token_hash=NULL, reset_expires=NULL WHERE email=?", [hash, email]);

//     res.json({ message: "Password reset successful!" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // 📌 Protected Dashboard
// router.get("/dashboard", async (req, res) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) return res.status(401).json({ message: "No token!" });

//   const token = authHeader.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ message: `Welcome to your dashboard, ${decoded.email}` });
//   } catch (err) {
//     res.status(401).json({ message: "Invalid or expired token!" });
//   }
// });

// module.exports = router;



// // public/routes/auth.js
// const express = require('express');
// const bcrypt = require('bcrypt');         // bcrypt for comparing
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// dotenv.config();

// const router = express.Router();

// // Create a new connection (or use a shared pool)
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS || "",
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// }).promise();

// // POST /auth/login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

//     const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
//     if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

//     const admin = rows[0];
//     const match = await bcrypt.compare(password, admin.password_hash);
//     if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
//     res.cookie('auth_token', token, {
//       httpOnly: true,
//       sameSite: 'Strict',
//       secure: false, // ✅ must be false for localhost (true only on HTTPS)
//       maxAge: 2 * 60 * 60 * 1000 // 2 hours
//     });


//     return res.json({
//       message: 'Login successful',
//       token // ✅ send token to frontend
//     });

//   } catch (err) {
//     console.error('Auth login error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /auth/logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('auth_token');
//   res.json({ message: 'Logged out' });
// });

// // GET /auth/verify (checks cookie)
// router.get('/verify', (req, res) => {
//   const token = req.cookies?.auth_token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
//   if (!token) return res.status(401).json({ valid: false });
//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) return res.status(403).json({ valid: false });
//     res.json({ valid: true, user: payload });
//   });
// });

// module.exports = router;



// mysql authentication code proper working version code below

// // public/routes/auth.js
// const express = require('express');
// const bcrypt = require('bcrypt');         // bcrypt for comparing
// const jwt = require('jsonwebtoken');
// const mysql = require('mysql2');
// const dotenv = require('dotenv');
// dotenv.config();

// const router = express.Router();

// // Create a new connection (or use a shared pool)
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS || "",
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// }).promise();

// // POST /auth/login
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Email and password required' });

//     const [rows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
//     if (rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

//     const admin = rows[0];
//     const match = await bcrypt.compare(password, admin.password_hash);
//     if (!match) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: admin.id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '2h' });

//     // Set HTTP-only cookie (not accessible from JS)
//     res.cookie('auth_token', token, {
//       httpOnly: true,
//       sameSite: 'Strict',
//       secure: false, // ✅ must be false for localhost (true only on HTTPS)
//       maxAge: 2 * 60 * 60 * 1000 // 2 hours
//     });

//     return res.json({
//       message: 'Login successful',
//       token // ✅ include JWT in response too
//     });

//   } catch (err) {
//     console.error('Auth login error:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /auth/logout
// router.post('/logout', (req, res) => {
//   res.clearCookie('auth_token');
//   res.json({ message: 'Logged out' });
// });

// // GET /auth/verify (checks cookie)
// router.get('/verify', (req, res) => {
//   const token = req.cookies?.auth_token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
//   if (!token) return res.status(401).json({ valid: false });
//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) return res.status(403).json({ valid: false });
//     res.json({ valid: true, user: payload });
//   });
// });

// module.exports = router;


// updated code for mongoDB admin insertion script below
// public/routes/auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// MongoDB Admin model
const AdminMongo = require('../models/Admin');

const router = express.Router();

// MySQL pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
}).promise();

/**
 * ===========================
 * POST /auth/login
 * Hybrid Login (MySQL + MongoDB)
 * ===========================
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔹 Validate input
    if (!email || !password)
      return res.status(400).json({ message: 'Email and password required' });

    // 🔹 Fetch admin records from both databases
    const [mysqlRows] = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
    const adminMySQL = mysqlRows.length > 0 ? mysqlRows[0] : null;

    const adminMongo = await AdminMongo.findOne({ email });

    // 🔹 Collect all admins in a single array for easy checking
    const admins = [];
    if (adminMySQL) admins.push({ source: 'MySQL', data: adminMySQL });
    if (adminMongo) admins.push({ source: 'MongoDB', data: adminMongo });

    // 🔹 No admin found in either database
    if (admins.length === 0)
      return res.status(401).json({ message: 'Invalid credentials' });

    // 🔹 Check password against each found admin
    for (const admin of admins) {
      const hashedPassword = admin.data.password_hash;
      const match = await bcrypt.compare(password, hashedPassword);
      if (match) {
        // ✅ Password matches, generate JWT
        const tokenPayload = admin.source === 'MySQL'
          ? { id: admin.data.id, email: admin.data.email, db: 'MySQL' }
          : { id: admin.data._id, email: admin.data.email, db: 'MongoDB' };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' });

        // ✅ Set HTTP-only cookie
        res.cookie('auth_token', token, {
          httpOnly: true,
          sameSite: 'Strict',
          secure: false, // must be false for localhost
          maxAge: 2 * 60 * 60 * 1000 // 2 hours
        });

        return res.json({ message: 'Login successful', token, db: admin.source });
      }
    }

    // ❌ If password didn't match any admin
    return res.status(401).json({ message: 'Invalid credentials' });

  } catch (err) {
    console.error('Auth login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
});

/**
 * POST /auth/logout
 * Clear cookie
 */
router.post('/logout', (req, res) => {
  res.clearCookie('auth_token');
  res.json({ message: 'Logged out' });
});

/**
 * GET /auth/verify
 * Checks if JWT is valid
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
