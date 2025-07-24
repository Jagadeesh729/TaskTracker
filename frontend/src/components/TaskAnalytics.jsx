import React, { useEffect } from "react";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer,
} from "recharts";
import { useRecoilState } from "recoil";
import { taskState } from "../state/taskAtom";
import axios from "axios";
import { motion } from "framer-motion";
import { taskState } from "../state/taskAtom";
import API from "../utils/api"

const COLORS = ["#3B82F6", "#FBBF24", "#10B981"]; // Indigo, Amber, Emerald

const TaskAnalytics = () => {
  const [tasks, setTasks] = useRecoilState(taskState);

  useEffect(() => {
    async function fetchTasks() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await API.get("http://localhost:5000/tasks/get", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("❌ Failed to fetch tasks:", err.message);
        setTasks([]);
      }
    }
    fetchTasks();
  }, [setTasks]);

  const chartData = [
    { name: "Assigned", value: tasks.filter(t => t.status === "assigned").length },
    { name: "Ongoing", value: tasks.filter(t => t.status === "ongoing").length },
    { name: "Completed", value: tasks.filter(t => t.status === "completed").length },
  ];

  const barData = [{
    name: "Task Status",
    Assigned: chartData[0].value,
    Ongoing: chartData[1].value,
    Completed: chartData[2].value,
  }];

  const hasTasks = tasks.length > 0;

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 sm:p-10 lg:p-20 transition-all duration-500">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-indigo-600 dark:text-indigo-300 mb-6 relative">
        Your Task Analytics
      </h2>

      {hasTasks ? (
        <motion.div
          className="flex flex-col lg:flex-row lg:gap-12 gap-10 w-full justify-between items-center lg:items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Pie Chart */}
          <motion.div
            className="flex-1 px-2 sm:px-4 min-h-[420px] hover:scale-[1.01] transition-transform duration-300"
            variants={chartVariants}
          >
            <h3 className="text-center font-semibold text-gray-700 dark:text-gray-300 text-lg mb-4">
              Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={370}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%" cy="50%" outerRadius={115}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    color: "#111827",
                  }}
                  labelStyle={{ color: "#6b7280" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={70}
                  wrapperStyle={{
                    marginTop: 20,
                    fontSize: 14,
                    color: "#4B5563",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            className="flex-1 px-2 sm:px-4 min-h-[420px] hover:scale-[1.01] transition-transform duration-300"
            variants={chartVariants}
          >
            <h3 className="text-center font-semibold text-gray-700 dark:text-gray-300 text-lg mb-4">
              Task Count by Status
            </h3>
            <ResponsiveContainer width="100%" height={370}>
              <BarChart data={barData}>
                <XAxis dataKey="name" tick={{ fill: "#6b7280" }} />
                <YAxis allowDecimals={false} tick={{ fill: "#6b7280" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    color: "#111827",
                  }}
                  labelStyle={{ color: "#6b7280" }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={70}
                  wrapperStyle={{
                    marginTop: 20,
                    fontSize: 14,
                    color: "#4B5563",
                  }}
                />
                <Bar dataKey="Assigned" fill={COLORS[0]} barSize={40} radius={[6, 6, 0, 0]} />
                <Bar dataKey="Ongoing" fill={COLORS[1]} barSize={40} radius={[6, 6, 0, 0]} />
                <Bar dataKey="Completed" fill={COLORS[2]} barSize={40} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </motion.div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-10 text-lg">
          No tasks found.
        </p>
      )}
    </div>
  );
};

export default TaskAnalytics;

