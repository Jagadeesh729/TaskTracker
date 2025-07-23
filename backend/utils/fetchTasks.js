export const fetchUserTasks = async (token) => {
  try {
    const res = await axios.get(`http://localhost:5000/tasks/get`, {
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

