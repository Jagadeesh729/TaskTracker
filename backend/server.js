const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/db.js");
const verifyToken = require("./middlewares/auth.js");

const userRoutes = require("./routes/user.routes.js");
const taskRoutes = require("./routes/task.routes.js");

const app = express();

// Serve frontend static files
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// CORS setup
app.use(
  cors({
    origin: ["https://tasktracker-xj27.onrender.com", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

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

// Catch-all route for SPA (React)
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
