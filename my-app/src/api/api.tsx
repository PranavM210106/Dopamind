import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsed = JSON.parse(user);
    req.headers.Authorization = `Bearer ${parsed.token}`;
  }
  return req;
});

// Auth
export const registerUser = (data: object) => API.post("/auth/register", data);
export const loginUser = (data: object) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Tasks
export const getTasks = () => API.get("/tasks");
export const createTask = (data: object) => API.post("/tasks", data);
export const updateTask = (id: string, data: object) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id: string) => API.delete(`/tasks/${id}`);

// Habits
export const getHabits = () => API.get("/habits");
export const createHabit = (data: object) => API.post("/habits", data);
export const completeHabit = (id: string) => API.put(`/habits/${id}/complete`);
export const deleteHabit = (id: string) => API.delete(`/habits/${id}`);

// Analytics
export const getAnalytics = () => API.get("/analytics");

// Admin
export const getAllUsers = () => API.get("/admin/users");
export const getGlobalStats = () => API.get("/admin/stats");
export const blockUser = (id: string) => API.put(`/admin/users/${id}/block`);
export const unblockUser = (id: string) => API.put(`/admin/users/${id}/unblock`);
export const deleteUser = (id: string) => API.delete(`/admin/users/${id}`);

// Profile
export const getProfile = () => API.get("/profile");
export const updateProfile = (data: object) => API.put("/profile", data);