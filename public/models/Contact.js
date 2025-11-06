// public/models/Contact.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  message: { type: String, required: true, trim: true },
  created_at: { type: Date, default: Date.now }
});

// Prevent OverwriteModelError with nodemon
module.exports = mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
