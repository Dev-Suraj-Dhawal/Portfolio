// // ==================== server.js ====================

// // Importing the 'express' framework which helps us create a server easily
// const express = require('express');

// // Importing the 'fs' (File System) module to read and write files (used for saving form data)
// const fs = require('fs');

// // Importing 'cors' (Cross-Origin Resource Sharing) so that requests from different domains (like frontend) are allowed
// const cors = require('cors');

// // Importing 'path' module to handle file paths (used when serving index.html)
// const path = require('path');

// // Create an instance of an Express application (this is our server)
// const app = express();

// // Define the port number where our server will run (http://localhost:3000)
// const PORT = 3000;

// // ------------------- Middleware -------------------

// // Enable CORS so that our frontend (browser) can communicate with this backend server
// app.use(cors());

// // Enable Express to automatically parse incoming request bodies as JSON
// // (so we can directly use req.body instead of manually parsing it)
// app.use(express.json());

// // Tell Express to serve static files (like index.html, CSS, JS) from the current folder (__dirname)
// // This means if you put index.html, style.css, script.js here, they will be served automatically
// app.use(express.static(__dirname));

// // ------------------- Routes -------------------

// // Handle GET requests to the root path "/"
// // When a user opens http://localhost:3000/ in the browser, this will send back the index.html file
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'index.html')); // send the file index.html to the browser
// });

// // ------------------- API Endpoint -------------------

// // Define a POST endpoint at '/save' where frontend form data will be sent
// app.post('/save', (req, res) => {
//     // Print the received request body in the terminal for debugging
//     console.log('Received data:', req.body);

//     // Store the request body (form submission) in a variable
//     const newData = req.body;

//     // Check if any required field is missing (name, email, or message)
//     // If any field is missing, return an error response
//     if (!newData.name || !newData.email || !newData.message) {
//         return res.status(400).json({ message: 'Error: All fields are required.' });
//     }

//     // Path to the data.json file (this is where we will save the submissions)
//     const filePath = './data.json';

//     // Read the existing contents of data.json
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         // If there's an error reading the file and it's not because the file doesn't exist
//         if (err && err.code !== 'ENOENT') {
//             console.error('Error reading file:', err);
//             return res.status(500).json({ message: 'Error reading from database.' });
//         }

//         // If the file exists and has data, parse it into an array
//         // If the file doesn't exist or is empty, start with an empty array []
//         const database = (data ? JSON.parse(data) : []);

//         // Add the new form submission into the array
//         database.push(newData);

//         // Write the updated array back into data.json (pretty-printed with 2 spaces)
//         fs.writeFile(filePath, JSON.stringify(database, null, 2), (writeErr) => {
//             // If there’s an error writing the file, return an error response
//             if (writeErr) {
//                 console.error('Error writing file:', writeErr);
//                 return res.status(500).json({ message: 'Error saving to database.' });
//             }

//             // If successful, print a success message in the terminal
//             console.log('Data successfully send to data.json🚀');

//             // Send a success response back to the frontend
//             res.status(200).json({ message: 'Data send successfully🚀!' });
//         });
//     });
// });

// // ------------------- Start Server -------------------

// // Make the server listen on the defined port (3000)
// // When the server starts successfully, print the URL in the terminal
// app.listen(PORT, () => {
//     console.log(`✅ Server 👩‍💻 running at http://localhost:${PORT}`);
// });





// // ==================== server.js ====================

// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const mysql = require("mysql2"); // ✅ using mysql2 now
// const fs = require("fs");

// const app = express();
// const PORT = 3000;

// // ------------------- Middleware -------------------
// app.use(cors());
// app.use(express.json());
// app.use(express.static(__dirname));

// // ------------------- MySQL Connection -------------------
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",       // 🔹 your MySQL username
//   password: "",       // 🔹 your MySQL password (if set)
//   database: "portfolio_db"
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL Connection Failed:", err);
//     return;
//   }
//   console.log("✅ MySQL Connected...");
// });

// // ------------------- Admin API -------------------
// app.get("/contacts", (req, res) => {
//   const sql = "SELECT * FROM contacts ORDER BY created_at DESC";

//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching contacts:", err);
//       return res.status(500).json({ message: "Error fetching contacts" });
//     }
//     res.json(results); // send contacts as JSON
//   });
// });


// // ------------------- Index Page Route -------------------
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "index.html"));
// });


// // ------------------- API Endpoint -------------------
// app.post("/save", (req, res) => {
//   console.log("Received data:", req.body);

//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "Error: All fields are required." });
//   }

//   // 1️⃣ Insert into MySQL
//   const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
//   db.query(sql, [name, email, message], (err, result) => {
//     if (err) {
//       console.error("❌ Error saving to MySQL:", err);
//       return res.status(500).json({ message: "Error saving to database." });
//     }

//     console.log("✅ Data inserted into MySQL 🚀");

//     // 2️⃣ Also Save into data.json
//     const filePath = "./data.json";

//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err && err.code !== "ENOENT") {
//         console.error("❌ Error reading JSON file:", err);
//         return res.status(500).json({ message: "Error saving to JSON." });
//       }

//       const database = data ? JSON.parse(data) : [];
//       database.push({ name, email, message, created_at: new Date() });

//       fs.writeFile(filePath, JSON.stringify(database, null, 2), (writeErr) => {
//         if (writeErr) {
//           console.error("❌ Error writing JSON file:", writeErr);
//           return res.status(500).json({ message: "Error saving to JSON." });
//         }

//         console.log("✅ Data also saved to data.json 🚀");
//         res.status(200).json({ message: "Data saved to MySQL + JSON 🚀!" });
//       });
//     });
//   });
// });
// // ------------------- Start Server -------------------
// app.listen(PORT, () => {
//   console.log(`✅ Server 👩‍💻 running at http://localhost:${PORT}`);
// });




// // ===============================================UPDATED SERVER=======================================================

// // // ==================== server.js ====================

// const express = require("express");
// const dotenv = require("dotenv");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const path = require("path");
// // const bodyParser = require('body-parser');
// const mysql = require("mysql2"); // ✅ using mysql2 now
// const fs = require("fs");
// const http = require("http");      // ✅ needed for socket.io
// const { Server } = require("socket.io");

// // ------------------- Load Env -------------------
// dotenv.config();

// // ------------------- Express & Socket Setup -------------------
// const app = express();
// const server = http.createServer(app); // ✅ wrap express server
// const io = new Server(server);

// const PORT = 3000;

// // ------------------- Middleware -------------------
// app.use(cors());
// app.use(express.json());
// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));


// // ------------------- MySQL Connection (portfolio_db) -------------------
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",       // 🔹 your MySQL username
//   password: " S3rver#@",       // 🔹 your MySQL password (if set)
//   database: "portfolio_db"
// });


// // // If you want to connect to a second database, create a second connection:
// // const dbAuth = mysql.createConnection({
// //   host: "localhost",
// //   user: "root",
// //   password: " S3rver#@",
// //   database: "auth_system"
// // });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL Connection Failed:", err);
//     return;
//   }
//   console.log("✅ MySQL Connected...");
// });

// // ------------------- API to Fetch Contacts -------------------
// app.get("/contacts", (req, res) => {
//   const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching contacts:", err);
//       return res.status(500).json({ message: "Error fetching contacts" });
//     }
//     res.json(results);
//   });
// });

// // ------------------- Middleware for JWT Auth -------------------
// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'Access token required' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ message: 'Invalid or expired token' });
//     req.user = user;
//     next();
//   });
// }

// // ------------------- Index Page -------------------
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname,"public", "index.html"));
// });
// app.get("/ven.html", authenticateToken, (req, res) => {
//   res.sendFile(path.join(__dirname,"public", "ven.html"));
// });

// // ------------------- API to Save Contact -------------------
// app.post("/save", (req, res) => {
//   console.log("Received data:", req.body);

//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "Error: All fields are required." });
//   }

//   // 1️⃣ Insert into MySQL
//   const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
//   db.query(sql, [name, email, message], (err) => {
//     if (err) {
//       console.error("❌ Error saving to MySQL:", err);
//       return res.status(500).json({ message: "Error saving to database." });
//     }

//     console.log("✅ Data inserted into MySQL 🚀");

//     // 2️⃣ Also Save into data.json
//     const filePath = "./data.json";
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err && err.code !== "ENOENT") {
//         console.error("❌ Error reading JSON file:", err);
//         return res.status(500).json({ message: "Error saving to JSON." });
//       }

//       const database = data ? JSON.parse(data) : [];
//       database.push({ name, email, message, created_at: new Date() });

//       fs.writeFile(filePath, JSON.stringify(database, null, 2), (writeErr) => {
//         if (writeErr) {
//           console.error("❌ Error writing JSON file:", writeErr);
//           return res.status(500).json({ message: "Error saving to JSON." });
//         }

//         console.log("✅ Data also saved to data.json 🚀");

//         // 3️⃣ Fetch full updated contact list
//         db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
//           if (err) {
//             console.error("❌ Error fetching updated contacts:", err);
//             return res.status(500).json({ message: "Error fetching updated contacts." });
//           }

//           // 4️⃣ Broadcast full list to all clients
//           io.emit("contacts_update", results);

//           res.status(200).json({ message: "Data saved + broadcasted 🚀!" });
//         });
//       });
//     });
//   });
// });

// // ------------------- WebSocket Connection -------------------
// io.on("connection", (socket) => {
//   console.log("🔌 New client connected:", socket.id);

//   // Send current contacts immediately on connection
//   db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
//     if (!err) {
//       socket.emit("contacts_update", results);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });
// // ===================================================
// // 🔹 AUTH SYSTEM SETUP
// // ===================================================

// const authRoutes = require("./public/routes/auth"); // ✅ correct path to auth routes

// // Mount auth routes at /auth
// app.use("/auth", authRoutes);

// // ===================================================
// // 🔹 ADMIN API with Auth
// // ===================================================

// // Protected route for admin contacts
// app.get("/admin/contacts", authenticateToken, (req, res) => {
//   const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching contacts:", err);
//       return res.status(500).json({ message: "Error fetching contacts" });
//     }
//     res.json(results);
//   });
// });

// // ===================================================
// // 🔹 Start Server
// // ===================================================
// // ------------------- Start Server -------------------
// server.listen(PORT, () => {
//   console.log(`✅ Server 👩‍💻 running at http://localhost:${PORT}`);
// });



// =====================================TWO DATABASE UPDATED SERVER==============================================================

// ==================== server.js ====================

// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const path = require("path");
// const mysql = require("mysql2");
// const fs = require("fs");
// const http = require("http");
// const { Server } = require("socket.io");

// // ------------------- Load Env -------------------
// dotenv.config();

// // ------------------- Express & Socket Setup -------------------
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const PORT = 3000;

// // ------------------- Middleware -------------------
// app.use(cors());
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));

// // ------------------- MySQL Connection (portfolio_db) -------------------
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: " S3rver#@",
//   database: "portfolio_db"
// });

// db.connect((err) => {
//   if (err) {
//     console.error("❌ MySQL Connection Failed:", err);
//     return;
//   }
//   console.log("✅ MySQL Connected (portfolio_db)...");
// });

// // ------------------- API: Fetch Contacts -------------------
// app.get("/contacts", (req, res) => {
//   const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
//   db.query(sql, (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching contacts:", err);
//       return res.status(500).json({ message: "Error fetching contacts" });
//     }
//     res.json(results);
//   });
// });

// // ------------------- Index Page -------------------
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// // ------------------- API: Save Contact -------------------
// app.post("/save", (req, res) => {
//   console.log("Received data:", req.body);

//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ message: "Error: All fields are required." });
//   }

//   const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
//   db.query(sql, [name, email, message], (err) => {
//     if (err) {
//       console.error("❌ Error saving to MySQL:", err);
//       return res.status(500).json({ message: "Error saving to database." });
//     }

//     console.log("✅ Data inserted into MySQL 🚀");

//     const filePath = "./data.json";
//     fs.readFile(filePath, "utf8", (err, data) => {
//       if (err && err.code !== "ENOENT") {
//         console.error("❌ Error reading JSON file:", err);
//         return res.status(500).json({ message: "Error saving to JSON." });
//       }

//       const database = data ? JSON.parse(data) : [];
//       database.push({ name, email, message, created_at: new Date() });

//       fs.writeFile(filePath, JSON.stringify(database, null, 2), (writeErr) => {
//         if (writeErr) {
//           console.error("❌ Error writing JSON file:", writeErr);
//           return res.status(500).json({ message: "Error saving to JSON." });
//         }

//         console.log("✅ Data also saved to data.json 🚀");

//         db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
//           if (err) {
//             console.error("❌ Error fetching updated contacts:", err);
//             return res.status(500).json({ message: "Error fetching updated contacts." });
//           }

//           io.emit("contacts_update", results);

//           res.status(200).json({ message: "Data saved + broadcasted 🚀!" });
//         });
//       });
//     });
//   });
// });

// // ------------------- WebSocket -------------------
// io.on("connection", (socket) => {
//   console.log("🔌 New client connected:", socket.id);

//   db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
//     if (!err) {
//       socket.emit("contacts_update", results);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// // ===================================================
// // 🔹 AUTH SYSTEM SETUP
// // ===================================================

// // const authRoutes = require(".public/routes/auth");
// const authRoutes = require("./public/routes/auth"); // ✅ correct path to auth routes



// // Mount auth routes at /auth
// app.use("/auth", authRoutes);

// // ===================================================
// // 🔹 Start Server
// // ===================================================
// server.listen(PORT, () => {
//   console.log(`✅ Server 👩‍💻 running at http://localhost:${PORT}`);
// });










// new updated server.js file starts here

// ==================== server.js ====================
// Main server file for the portfolio application with authentication, contact form, and real-time updates.
// Handles Express setup, MySQL database connections, JWT authentication, Socket.IO for real-time features,
// and serves static files from the public directory.

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql2"); // Using mysql2 for better performance and promises support
const fs = require("fs");
const http = require("http"); // Required for Socket.IO integration
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');

// Load environment variables from .env file
dotenv.config();

// Express & Socket.IO Setup
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: true,
  credentials: true // Allow cookies to be sent
}));
app.use(express.json());
app.use(cookieParser()); // Required to read cookies
app.use(express.static(path.join(__dirname, 'public'))); // Public folder

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected to portfolio_db...");
});

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  // Try to get token from cookie first
  const token = req.cookies?.auth_token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);
  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user; // Attach user info to request
    next();
  });
}

// Routes
// Serve main portfolio page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Serve protected dashboard page
app.get("/ven.html", authenticateToken, (req, res) => {
  res.sendFile(path.join(__dirname, "private", "ven.html"));
});

// API: Fetch all contacts (public)
app.get("/contacts", (req, res) => {
  const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching contacts:", err);
      return res.status(500).json({ message: "Error fetching contacts" });
    }
    res.json(results);
  });
});

// API: Save contact form data
app.post("/save", (req, res) => {
  console.log("Received contact data:", req.body);
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: "All fields are required." });

  const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.error("❌ Error saving to MySQL:", err);
      return res.status(500).json({ message: "Error saving to database." });
    }
    console.log("✅ Data inserted into MySQL");

    // Save to JSON backup
    const filePath = "./data.json";
    fs.readFile(filePath, "utf8", (err, data) => {
      const database = data ? JSON.parse(data) : [];
      database.push({ name, email, message, created_at: new Date() });

      fs.writeFile(filePath, JSON.stringify(database, null, 2), (writeErr) => {
        if (writeErr) {
          console.error("❌ Error writing JSON file:", writeErr);
          return res.status(500).json({ message: "Error saving to JSON." });
        }
        console.log("✅ Data also saved to data.json");

        // Broadcast updates
        db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
          if (err) return console.error("❌ Error fetching updated contacts:", err);
          io.emit("contacts_update", results);
          res.status(200).json({ message: "Data saved and broadcasted successfully!" });
        });
      });
    });
  });
});

// Socket.IO: real-time connection
io.on("connection", (socket) => {
  console.log("🔌 New client connected:", socket.id);
  db.query("SELECT * FROM contacts ORDER BY created_at DESC", (err, results) => {
    if (!err) socket.emit("contacts_update", results);
  });
  socket.on("disconnect", () => console.log("❌ Client disconnected:", socket.id));
});

// Auth Routes
const authRoutes = require("./public/routes/auth");
app.use("/auth", authRoutes);

// Protected Admin API
app.get("/admin/contacts", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM contacts ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching contacts" });
    res.json(results);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`⚠️ Port ${PORT} in use, retrying on port ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error('❌ Server startup error:', err);
  }
});
