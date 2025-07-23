const mongoose = require("mongoose");

// Separate subTask schema for clarity
const subTaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Subtask title is required"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["assigned", "ongoing", "completed"],
      default: "assigned",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "low",
    },
    dueDate: {
      type: Date,
    },
    assignedToID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedToEmail: {
      type: String,
    },
  },
  { _id: false }
);
// Main Task schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ["assigned", "ongoing", "completed"],
      default: "assigned",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "low",
    },
    dueDate: {
      type: Date,
    },
    assignedToID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    assignedToEmail: {
      type: String,
    },
    subTasks: [subTaskSchema],
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
