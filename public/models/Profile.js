// public/models/Profile.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProfileSchema = new Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  bio: { type: String, trim: true },
  profilePic: {
    data: Buffer,              // Binary data (optional)
    contentType: String,       // e.g. 'image/png'
  },
  profilePicUrl: { type: String, trim: true }, // For URL-based uploads
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
