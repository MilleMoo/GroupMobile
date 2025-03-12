import axios from "axios";

const API_URL = "http://192.168.11.125:5000"; // แก้ URL ให้ถูกต้อง

export const registerUser = async (username, password) => {
  // เพิ่ม async
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error registering user");
  }
};
