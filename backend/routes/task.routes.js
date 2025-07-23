const express = require("express");
const router = express.Router();

const {
  createTask,
  getUserTasks,
  getAllTasks,
  updateTask,
  deleteTask,
  addSubTask,
  updateSubTask,
  deleteSubTask,
} = require("../controllers/task.controllers.js");

const verifyEmail = require("../middlewares/auth.js");
const checkTaskStatus = require("../utils/checkTaskStatus.js");
const { notifyEmail } = require("../utils/notifyEmail.js");

// Routes that just fetch data
router.get("/get", verifyEmail, getUserTasks);
router.get("/gettasks", getAllTasks);

// Routes that change data (attach checkTaskStatus AFTER them)
router.post("/create", createTask, checkTaskStatus);
router.put("/update/:id", updateTask, checkTaskStatus);
router.delete("/delete/:id", deleteTask, checkTaskStatus);

router.post("/create-subtask/:id", addSubTask, checkTaskStatus);
router.put("/update-subtask/:parentId/:id", updateSubTask, checkTaskStatus);
router.delete("/delete-subtask/:parentId/:id", deleteSubTask, checkTaskStatus);

router.post("/notify", notifyEmail);

module.exports = router;
