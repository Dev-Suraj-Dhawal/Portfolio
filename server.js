// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// const http = require("http");
// const { Server } = require("socket.io");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");
// const { Schema } = mongoose;
// const multer = require('multer');
// const sharp = require("sharp");
// const Profile = require('./public/models/Profile');

// // ============================================
// // Load environment variables
// // ============================================
// dotenv.config();

// // ============================================
// // Express & Socket.IO Setup
// // ============================================
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);
// const PORT = process.env.PORT || 3000;

// // ============================================
// // Middleware
// // ============================================
// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// // ============================================
// // Multer setup for profile image upload
// // ============================================
// const storage = multer.memoryStorage();
// const upload = multer({
//   storage,
//   limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
//   fileFilter: (req, file, cb) => {
//     const allowed = ["image/jpeg", "image/png", "image/webp"];
//     if (!allowed.includes(file.mimetype)) {
//       return cb(new Error("Only JPEG, PNG, and WEBP files allowed"));
//     }
//     cb(null, true);
//   },
// });

// // ============================================
// // MongoDB Connection (Atlas)
// // ============================================
// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       // modern driver options don't need useNewUrlParser/useUnifiedTopology
//       // those warnings are safe to ignore for now
//     });
//     console.log("✅ MongoDB Atlas Connected Successfully...");
//   } catch (error) {
//     console.error("❌ MongoDB Connection Failed:", error.message);
//   }
// })();

// // ============================================
// // MongoDB Schema & Model
// // ============================================
// const ContactSchema = new Schema({
//   name: String,
//   email: String,
//   message: String,
//   created_at: { type: Date, default: Date.now },
// });
// const MongoContact = mongoose.model("Contact", ContactSchema);

// // ============================================
// // JWT Authentication Middleware
// // ============================================
// function authenticateToken(req, res, next) {
//   const token =
//     req.cookies?.auth_token ||
//     (req.headers["authorization"] &&
//       req.headers["authorization"].split(" ")[1]);
//   if (!token) return res.status(401).json({ message: "Access token required" });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: "Invalid or expired token" });
//     req.user = user;
//     next();
//   });
// }

// // ============================================
// // ROUTES
// // ============================================

// // Serve main portfolio page
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // Protected page
// app.get("/ven.html", authenticateToken, (req, res) => {
//   res.sendFile(path.join(__dirname, "private", "ven.html"));
// });

// // Fetch contacts
// app.get("/contacts", async (req, res) => {
//   try {
//     const contacts = await MongoContact.find().sort({ created_at: -1 });
//     res.json(contacts);
//   } catch (err) {
//     console.error("❌ Error fetching contacts:", err);
//     res.status(500).json({ message: "Error fetching contacts" });
//   }
// });

// // ============================================
// // Fetch Profile Image
// // Auto-load from local assets if DB empty
// // Returns binary image
// // ============================================
// app.get("/profile", async (req, res) => {
//   try {
//     let profile = await Profile.findOne().sort({ created_at: -1 });

//     if (!profile) {
//       const imgPath = path.join(__dirname, "public", "assets", "b2.png");
//       if (!fs.existsSync(imgPath)) {
//         return res.status(404).json({ message: "Local profile image not found" });
//       }

//       const imgData = fs.readFileSync(imgPath);
//       const newProfile = new Profile({
//         name: "Suraj Dhawal",
//         title: "Full Stack Developer",
//         profilePic: { data: imgData, contentType: "image/png" },
//       });
//       profile = await newProfile.save();
//       console.log("✅ Local profile image auto-saved to MongoDB Atlas.");
//     }

//     if (!profile.profilePic || !profile.profilePic.data) {
//       return res.status(404).json({ message: "Profile picture not found" });
//     }

//     res.set("Content-Type", profile.profilePic.contentType);
//     res.send(profile.profilePic.data);
//   } catch (err) {
//     console.error("❌ Error fetching profile:", err);
//     res.status(500).json({ message: "Failed to fetch profile" });
//   }
// });
// // ============================================
// // ✅ Get Profile Metadata (Secure, Admin-only)
// // ============================================
// app.get("/profile/meta", authenticateToken, async (req, res) => {
//   try {
//     const profile = await Profile.findOne().sort({ created_at: -1 });
//     if (!profile) {
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     res.json({
//       name: profile.name,
//       title: profile.title,
//       bio: profile.bio,
//       profilePicUrl: profile.profilePicUrl ? profile.profilePicUrl : "/profile",
//       created_at: profile.created_at,
//     });
//   } catch (err) {
//     console.error("❌ Error fetching profile metadata:", err);
//     res.status(500).json({ message: "Failed to fetch profile metadata" });
//   }
// });

// // ============================================
// // Upload Profile Image (JWT-protected + compress via sharp)
// // - input field name expected: "profilePic"
// // - requires valid JWT cookie or Authorization header
// // ============================================
// app.post("/upload-profile", authenticateToken, upload.single('profilePic'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     // Log admin user who uploaded (from token)
//     const adminEmail = req.user?.email || "unknown";

//     console.log(`📸 Admin (${adminEmail}) uploaded profile: ${req.file.originalname}`);

//     // compress + convert to webp (max width 800)
//     const compressedBuffer = await sharp(req.file.buffer)
//       .resize({ width: 800, withoutEnlargement: true })
//       .webp({ quality: 90 })
//       .toBuffer();

//     // remove old profile(s) and save new one (keep only latest)
//     await Profile.deleteMany({});
//     const newProfile = new Profile({
//       name: req.body.name || "Suraj Dhawal",
//       title: req.body.title || "Full Stack Developer",
//       profilePic: { data: compressedBuffer, contentType: "image/webp" },
//       created_at: new Date(),
//     });
//     await newProfile.save();

//     console.log("✅ Profile uploaded, optimized and saved to MongoDB.");

//     return res.status(200).json({ success: true, message: "Profile uploaded successfully" });
//   } catch (err) {
//     console.error("❌ Error uploading profile:", err);
//     // Multer file-size error handling
//     if (err.code === "LIMIT_FILE_SIZE") {
//       return res.status(413).json({ success: false, message: "File too large. Max 10MB allowed." });
//     }
//     return res.status(500).json({ success: false, message: "Failed to upload profile" });
//   }
// });

// // ============================================
// // Save contact (MongoDB + JSON + Real-time)
// // ============================================
// app.post("/save", async (req, res) => {
//   const { name, email, message } = req.body;
//   if (!name || !email || !message)
//     return res.status(400).json({ message: "All fields are required." });

//   try {
//     const newContact = await MongoContact.create({ name, email, message });

//     const filePath = "./data.json";
//     let database = [];
//     if (fs.existsSync(filePath)) {
//       const data = fs.readFileSync(filePath, "utf8");
//       database = data ? JSON.parse(data) : [];
//     }
//     database.push(newContact);
//     fs.writeFileSync(filePath, JSON.stringify(database, null, 2));

//     const contacts = await MongoContact.find().sort({ created_at: -1 });
//     io.emit("contacts_update", contacts);

//     res.status(200).json({ message: "Data saved successfully!" });
//   } catch (err) {
//     console.error("❌ Error saving contact:", err);
//     res.status(500).json({ message: "Error saving to database." });
//   }
// });

// // ============================================
// // Socket.IO Live Updates
// // ============================================
// io.on("connection", async (socket) => {
//   console.log("🔌 New client connected:", socket.id);
//   try {
//     const contacts = await MongoContact.find().sort({ created_at: -1 });
//     socket.emit("contacts_update", contacts);
//   } catch (err) {
//     console.error("❌ Error sending contacts via socket:", err);
//   }

//   socket.on("disconnect", () => console.log("❌ Client disconnected:", socket.id));
// });

// // ============================================
// // Auth Routes
// // ============================================
// const authRoutes = require("./public/routes/auth");
// app.use("/auth", authRoutes);

// // Protected Admin API
// app.get("/admin/contacts", authenticateToken, async (req, res) => {
//   try {
//     const contacts = await MongoContact.find().sort({ created_at: -1 });
//     res.json(contacts);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching contacts" });
//   }
// });

// // ============================================
// // Start Server
// // ============================================
// server
//   .listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`))
//   .on("error", (err) => {
//     if (err.code === "EADDRINUSE") {
//       console.warn(`⚠️ Port ${PORT} in use, retrying on port ${PORT + 1}...`);
//       server.listen(PORT + 1);
//     } else {
//       console.error("❌ Server startup error:", err);
//     }
//   });




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
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const Profile = require('./models/Profile');

// ============================================
// Load environment variables
// ============================================
dotenv.config();

// ============================================
// Environment Variables Validation (PRODUCTION ENHANCEMENT)
// ============================================
const NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = NODE_ENV === 'production';

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(', ')}`);
  if (isProduction) {
    process.exit(1);
  } else {
    console.warn('⚠️ Running in development mode with missing env vars');
  }
}

// ============================================
// Express & Socket.IO Setup
// ============================================
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || true,
    credentials: true,
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000,
  pingInterval: 25000
});
const PORT = process.env.PORT || 3000;

// ============================================
// Security Middleware (PRODUCTION ENHANCEMENT)
// ============================================
// Helmet for security headers with proper CSP configuration
if (isProduction) {
  // Strict CSP for production
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: [
          "'self'", 
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com",
          "https://fonts.googleapis.com"
        ],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
          "https://unpkg.com",
          "https://cdn.tailwindcss.com"
        ],
        scriptSrcAttr: ["'unsafe-inline'"], // Allow inline event handlers
        imgSrc: [
          "'self'", 
          "data:", 
          "blob:",
          "https:",
          "http:"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com"
        ],
        connectSrc: [
          "'self'", 
          "ws:", 
          "wss:",
          "https:"
        ],
      },
    },
    crossOriginEmbedderPolicy: false,
  }));
} else {
  // Relaxed CSP for development (no restrictions)
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }));
}

// Trust proxy for deployment platforms like Render
if (isProduction) {
  app.set('trust proxy', 1);
}

// Custom NoSQL Injection Prevention
const sanitizeInput = (obj) => {
  if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        sanitizeInput(obj[key]);
      }
    });
  }
  return obj;
};

app.use((req, res, next) => {
  if (req.body) req.body = sanitizeInput(req.body);
  if (req.query) req.query = sanitizeInput(req.query);
  if (req.params) req.params = sanitizeInput(req.params);
  next();
});

// Rate limiting for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: isProduction ? 5 : 100, // Strict in production, relaxed in dev
  message: "Too many login attempts, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => !isProduction, // Skip rate limiting in development
});

// General rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: isProduction ? 100 : 1000, // Strict in production, relaxed in dev
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => !isProduction, // Skip rate limiting in development
});

// Apply rate limiters
app.use('/auth/', authLimiter);
app.use('/save', generalLimiter);
app.use('/upload-profile', generalLimiter);

// Request logging (only in development or if explicitly enabled)
if (!isProduction || process.env.ENABLE_REQUEST_LOGS === 'true') {
  app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${req.ip}`);
    next();
  });
}

// ============================================
// Middleware
// ============================================
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
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
// MongoDB Connection with Retry Logic (PRODUCTION ENHANCEMENT)
// ============================================
const connectDB = async (retries = 5) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("✅ MongoDB Atlas Connected Successfully...");
      return;
    } catch (error) {
      console.error(`❌ MongoDB Connection Attempt ${i + 1} Failed:`, error.message);
      if (i < retries - 1) {
        console.log(`Retrying in 5 seconds...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error("❌ Could not connect to MongoDB after multiple attempts");
        if (isProduction) {
          process.exit(1);
        }
      }
    }
  }
};

// MongoDB connection event handlers (PRODUCTION ENHANCEMENT)
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Connect to database
connectDB();

// ============================================
// MongoDB Schema & Model
// ============================================
const ContactSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  message: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Add index for better performance (PRODUCTION ENHANCEMENT)
ContactSchema.index({ created_at: -1 });

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
    if (err) {
      console.error("JWT verification failed:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
}

// ============================================
// ROUTES
// ============================================

// Health check endpoint (PRODUCTION ENHANCEMENT)
app.get("/health", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    mongoStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    environment: NODE_ENV
  };
  
  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = error.message;
    res.status(503).json(healthcheck);
  }
});

// Serve main portfolio page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve portfolio data JSON (ADDED)
app.get("/portfolio-data.json", (req, res) => {
  const dataPath = path.join(__dirname, "public", "portfolio-data.json");
  if (!fs.existsSync(dataPath)) {
    return res.status(404).json({ message: "Portfolio data not found" });
  }
  res.sendFile(dataPath);
});

// Protected page
app.get("/ven.html", authenticateToken, (req, res) => {
  const filePath = path.join(__dirname, "private", "ven.html");
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "Page not found" });
  }
  res.sendFile(filePath);
});

// Fetch contacts
app.get("/contacts", async (req, res) => {
  try {
    const contacts = await MongoContact.find()
      .select('-__v')
      .sort({ created_at: -1 })
      .limit(100);
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

    // Cache headers for better performance (PRODUCTION ENHANCEMENT)
    res.set({
      'Content-Type': profile.profilePic.contentType,
      'Cache-Control': isProduction ? 'public, max-age=86400' : 'no-cache'
    });
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
    const profile = await Profile.findOne()
      .select('-profilePic -__v')
      .sort({ created_at: -1 });
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
      bio: req.body.bio || "",
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
// Save contact (MongoDB + Real-time) - Direct to database only
// ============================================
app.post("/save", async (req, res) => {
  console.log('📬 Contact form submission received');
  console.log('Request body:', req.body);
  console.log('Request headers:', req.headers);
  
  const { name, email, message } = req.body;
  
  // Validation
  if (!name || !email || !message) {
    console.log('❌ Validation failed: Missing required fields');
    return res.status(400).json({ 
      success: false,
      message: "All fields are required." 
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('❌ Validation failed: Invalid email format');
    return res.status(400).json({ 
      success: false,
      message: "Invalid email format." 
    });
  }

  try {
    // Save directly to MongoDB
    const newContact = await MongoContact.create({ 
      name: name.trim(), 
      email: email.trim().toLowerCase(), 
      message: message.trim() 
    });

    console.log('✅ Contact saved to MongoDB with ID:', newContact._id);

    // Get updated contacts list
    const contacts = await MongoContact.find()
      .select('-__v')
      .sort({ created_at: -1 })
      .limit(100);
    
    // Broadcast to Socket.IO clients
    console.log('📡 Broadcasting update to Socket.IO clients');
    io.emit("contacts_update", contacts);

    // Send success response
    res.status(200).json({ 
      success: true,
      message: "Message sent successfully!" 
    });
    
    console.log('✅ Response sent successfully');
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    console.error("Error details:", err.message);
    console.error("Error stack:", err.stack);
    
    res.status(500).json({ 
      success: false,
      message: "Failed to save message. Please try again." 
    });
  }
});

// ============================================
// Socket.IO Live Updates
// ============================================
io.on("connection", async (socket) => {
  console.log("🔌 New client connected:", socket.id);
  try {
    const contacts = await MongoContact.find()
      .select('-__v')
      .sort({ created_at: -1 })
      .limit(100);
    socket.emit("contacts_update", contacts);
  } catch (err) {
    console.error("❌ Error sending contacts via socket:", err);
    socket.emit("error", { message: "Failed to load contacts" });
  }

  socket.on("disconnect", () => console.log("❌ Client disconnected:", socket.id));
});

// ============================================
// Auth Routes
// ============================================
try {
  const authRoutes = require("./routes/auth");
  app.use("/auth", authRoutes);
} catch (err) {
  console.error("⚠️ Failed to load auth routes:", err.message);
  console.error("Make sure auth.js exists in the /routes folder");
}

// Protected Admin API
app.get("/admin/contacts", authenticateToken, async (req, res) => {
  try {
    const contacts = await MongoContact.find()
      .select('-__v')
      .sort({ created_at: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("❌ Error fetching admin contacts:", err);
    res.status(500).json({ message: "Error fetching contacts" });
  }
});

// ============================================
// 404 Handler (PRODUCTION ENHANCEMENT)
// ============================================
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ============================================
// Global Error Handler (PRODUCTION ENHANCEMENT)
// ============================================
app.use((err, req, res, next) => {
  console.error("❌ Global error:", err.stack);
  
  res.status(err.status || 500).json({
    message: isProduction ? "Internal server error" : err.message,
    ...(isProduction ? {} : { stack: err.stack })
  });
});

// ============================================
// Graceful Shutdown (PRODUCTION ENHANCEMENT)
// ============================================
const gracefulShutdown = async (signal) => {
  console.log(`\n⚠️ ${signal} received. Starting graceful shutdown...`);
  
  server.close(async () => {
    console.log("✅ HTTP server closed");
    
    try {
      await mongoose.connection.close();
      console.log("✅ MongoDB connection closed");
      process.exit(0);
    } catch (err) {
      console.error("❌ Error during shutdown:", err);
      process.exit(1);
    }
  });
  
  setTimeout(() => {
    console.error("⚠️ Forced shutdown after timeout");
    process.exit(1);
  }, 30000);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Unhandled rejection handler (PRODUCTION ENHANCEMENT)
process.on("unhandledRejection", (reason, promise) => {
  console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
  if (!isProduction) {
    process.exit(1);
  }
});

// ============================================
// Start Server
// ============================================
server
  .listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running in ${NODE_ENV} mode at http://localhost:${PORT}`);
    console.log(`✅ MongoDB: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${PORT} in use, retrying on port ${PORT + 1}...`);
      server.listen(PORT + 1, '0.0.0.0');
    } else {
      console.error("❌ Server startup error:", err);
      process.exit(1);
    }
  });