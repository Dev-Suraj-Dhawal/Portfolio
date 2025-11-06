const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const multer = require('multer');
const sharp = require("sharp");
const Profile = require('./public/models/Profile');

// ============================================
// Load environment variables
// ============================================
dotenv.config();

// ============================================
// Express & Socket.IO Setup
// ============================================
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// ============================================
// Middleware
// ============================================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// Multer setup for profile image upload
// ============================================
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and WEBP files allowed"));
    }
    cb(null, true);
  },
});

// ============================================
// MongoDB Connection (Atlas)
// ============================================
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // modern driver options don't need useNewUrlParser/useUnifiedTopology
      // those warnings are safe to ignore for now
    });
    console.log("✅ MongoDB Atlas Connected Successfully...");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
  }
})();

// ============================================
// MongoDB Schema & Model
// ============================================
const ContactSchema = new Schema({
  name: String,
  email: String,
  message: String,
  created_at: { type: Date, default: Date.now },
});
const MongoContact = mongoose.model("Contact", ContactSchema);

// ============================================
// JWT Authentication Middleware
// ============================================
function authenticateToken(req, res, next) {
  const token =
    req.cookies?.auth_token ||
    (req.headers["authorization"] &&
      req.headers["authorization"].split(" ")[1]);
  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// ============================================
// ROUTES
// ============================================

// Serve main portfolio page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Protected page
app.get("/ven.html", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "private", "ven.html"));
});

// Fetch contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await MongoContact.find().sort({ created_at: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// ============================================
// Fetch Profile Image
// Auto-load from local assets if DB empty
// Returns binary image
// ============================================
app.get("/profile", async (req, res) => {
  try {
    let profile = await Profile.findOne().sort({ created_at: -1 });

    if (!profile) {
      const imgPath = path.join(__dirname, "public", "assets", "b2.png");
      if (!fs.existsSync(imgPath)) {
        return res.status(404).json({ message: "Local profile image not found" });
      }

      const imgData = fs.readFileSync(imgPath);
      const newProfile = new Profile({
        name: "Suraj Dhawal",
        title: "Full Stack Developer",
        profilePic: { data: imgData, contentType: "image/png" },
      });
      profile = await newProfile.save();
      console.log("✅ Local profile image auto-saved to MongoDB Atlas.");
    }

    if (!profile.profilePic || !profile.profilePic.data) {
      return res.status(404).json({ message: "Profile picture not found" });
    }

    res.set("Content-Type", profile.profilePic.contentType);
    res.send(profile.profilePic.data);
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});
// ============================================
// ✅ Get Profile Metadata (Secure, Admin-only)
// ============================================
app.get("/profile/meta", authenticateToken, async (req, res) => {
  try {
    const profile = await Profile.findOne().sort({ created_at: -1 });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      profilePicUrl: profile.profilePicUrl ? profile.profilePicUrl : "/profile",
      created_at: profile.created_at,
    });
  } catch (err) {
    console.error("❌ Error fetching profile metadata:", err);
    res.status(500).json({ message: "Failed to fetch profile metadata" });
  }
});

// ============================================
// Upload Profile Image (JWT-protected + compress via sharp)
// - input field name expected: "profilePic"
// - requires valid JWT cookie or Authorization header
// ============================================
app.post("/upload-profile", authenticateToken, upload.single('profilePic'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Log admin user who uploaded (from token)
    const adminEmail = req.user?.email || "unknown";

    console.log(`📸 Admin (${adminEmail}) uploaded profile: ${req.file.originalname}`);

    // compress + convert to webp (max width 800)
    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 90 })
      .toBuffer();

    // remove old profile(s) and save new one (keep only latest)
    await Profile.deleteMany({});
    const newProfile = new Profile({
      name: req.body.name || "Suraj Dhawal",
      title: req.body.title || "Full Stack Developer",
      profilePic: { data: compressedBuffer, contentType: "image/webp" },
      created_at: new Date(),
    });
    await newProfile.save();

    console.log("✅ Profile uploaded, optimized and saved to MongoDB.");

    return res.status(200).json({ success: true, message: "Profile uploaded successfully" });
  } catch (err) {
    console.error("❌ Error uploading profile:", err);
    // Multer file-size error handling
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({ success: false, message: "File too large. Max 10MB allowed." });
    }
    return res.status(500).json({ success: false, message: "Failed to upload profile" });
  }
});

// ============================================
// Save contact (MongoDB + JSON + Real-time)
// ============================================
app.post("/save", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return res.status(400).json({ message: "All fields are required." });

  try {
    const newContact = await MongoContact.create({ name, email, message });

    const filePath = "./data.json";
    let database = [];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      database = data ? JSON.parse(data) : [];
    }
    database.push(newContact);
    fs.writeFileSync(filePath, JSON.stringify(database, null, 2));

    const contacts = await MongoContact.find().sort({ created_at: -1 });
    io.emit("contacts_update", contacts);

    res.status(200).json({ message: "Data saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ message: "Error saving to database." });
  }
});

// ============================================
// Socket.IO Live Updates
// ============================================
io.on("connection", async (socket) => {
  console.log("🔌 New client connected:", socket.id);
  try {
    const contacts = await MongoContact.find().sort({ created_at: -1 });
    socket.emit("contacts_update", contacts);
  } catch (err) {
    console.error("❌ Error sending contacts via socket:", err);
  }

  socket.on("disconnect", () => console.log("❌ Client disconnected:", socket.id));
});

// ============================================
// Auth Routes
// ============================================
const authRoutes = require("./public/routes/auth");
app.use("/auth", authRoutes);

// Protected Admin API
app.get("/admin/contacts", authenticateToken, async (req, res) => {
  try {
    const contacts = await MongoContact.find().sort({ created_at: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// ============================================
// Start Server
// ============================================
server
  .listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${PORT} in use, retrying on port ${PORT + 1}...`);
      server.listen(PORT + 1);
    } else {
      console.error("❌ Server startup error:", err);
    }
  });
