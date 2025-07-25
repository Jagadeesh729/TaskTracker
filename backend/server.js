const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/db.js");
const verifyToken = require("./middlewares/auth.js");

const userRoutes = require("./routes/user.routes.js");
const taskRoutes = require("./routes/task.routes.js");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: ["https://tasktracker-xj27.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// API Routes
app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);

// Token verification route
app.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Logged In Successfully",
    token: req.token,
    user: req.user,
  });
});

// Serve frontend static files (React build)
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// Catch-all route for client-side routing (React SPA)
const fs = require("fs");
const indexPath = path.join(__dirname, "..", "frontend", "dist", "index.html");

app.get("*", (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("Frontend not built: index.html not found");
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
