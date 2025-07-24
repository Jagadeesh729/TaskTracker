const API_URL = process.env.API_URL || "http://localhost:5000";

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
