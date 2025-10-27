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
