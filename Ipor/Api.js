import axios from "axios";

const API_URL = "http://192.168.11.125:5000";

export const LoginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/Login`, {
      username,
      password,
    });
    return {
      token: response.data.token,
      profileImage: response.data.profileImage, // ✅ เพิ่มรูปโปรไฟล์
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Invalid Login");
  }
};

export const GetUserName = async (username) => {
  try {
    const response = await axios.get(
      `${API_URL}/get-user?username=${username}`
    );
    return {
      username: response.data.username,
      email: response.data.email,
      profileImage: response.data.profileImage, // ✅ ดึง URL รูปโปรไฟล์จากฐานข้อมูล
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user data"
    );
  }
};


export const EditUserName = async (username, newName) => {
  try {
    console.log("API call: EditUserName", { username, newName });

    if (!username || !newName) {
      throw new Error("Username and new name are required");
    }

    const response = await axios.put(
      `${API_URL}/update-name`,
      {
        username,
        newName,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "EditUserName API error:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Error updating name");
  }
};

export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error registering user");
  }
};

export const updateProfileImage = async (username, profileImage) => {
  try {
    const response = await axios.put(`${API_URL}/update-profile-image`, {
      username,
      profileImage,
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error updating profile image"
    );
  }
};
