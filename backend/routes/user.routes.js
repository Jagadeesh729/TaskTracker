const express = require("express");
const router = express.Router();

const {
  loginUser,
  getAllUsers,
  addRole,
} = require("../controllers/user.controllers.js");

// Auth & role routes
router.post("/login", loginUser);
router.get("/getusers", getAllUsers);
router.put("/updateRole/:id", addRole); // ✅ has valid :id param

module.exports = router;
