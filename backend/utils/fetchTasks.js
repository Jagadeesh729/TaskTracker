import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserTasks = async (token) => {
  try {
    const res = await axios.get(`${API_URL}/tasks/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data.tasks;
  } catch (err) {
    console.error("❌ Failed to fetch tasks:", err.message);
    return [];
  }
};
