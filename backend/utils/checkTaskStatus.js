const Task = require("../models/task.model.js");

const checkTaskStatus = async (req, res, next) => {
  try {
    const tasks = await Task.find({});

    let completedCount = 0;

    for (const task of tasks) {
      const allSubTasksCompleted = task.subTasks.every(
        (subTask) => subTask.status === "completed"
      );

      if (
        allSubTasksCompleted &&
        task.status !== "completed" &&
        task.subTasks.length > 0
      ) {
        task.status = "completed";
        await task.save();
        completedCount++;
      }
    }

    console.log(`✅ Marked ${completedCount} tasks as completed.`);
    next();
  } catch (error) {
    console.error("❌ Error in checkTaskStatus middleware:", error);
    next(error);
  }
};

module.exports = checkTaskStatus;
