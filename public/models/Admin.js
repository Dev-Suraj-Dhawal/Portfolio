
// public/models/Admin.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const AdminSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

// ✅ Prevent OverwriteModelError if nodemon reloads
module.exports = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
