const express = require("express");
const path = require("path");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./db/db.js");
const verifyToken = require("./middlewares/auth.js");

const userRoutes = require("./routes/user.routes.js");
const taskRoutes = require("./routes/task.routes.js");
const checkTaskStatus = require("./utils/checkTaskStatus.js");

const app = express();

// Serve frontend static files (from dist)
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

const indexPath = path.resolve(
  __dirname,
  "..",
  "frontend",
  "dist",
  "index.html"
);

app.get("/*", (req, res) => {
  res.sendFile(indexPath);
});

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

// Routes
app.use("/users", userRoutes);
app.use("/tasks", checkTaskStatus, taskRoutes);

// Token verification route
app.get("/verify", verifyToken, (req, res) => {
  res.status(200).json({
    message: "Logged In Successfully",
    token: req.token,
    user: req.user,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on PORT ${PORT}`);
});
