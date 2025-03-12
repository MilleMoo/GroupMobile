import axios from "axios";

const API_URL = "http://192.168.1.35:5000";

export const LoginUser = async (username,password) => {
    try {
        const response = await axios.post(`${API_URL}/Login`, {
            username,
            password,
        });
        return response.data.token;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Invalid Login");
    }
};

export const GetUserName = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/get-user?username=${username}`);
        return response.data; 
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error fetching user data");
    }
};

export const EditUserName = async (username, newName) => {
    try {
        console.log("API call: EditUserName", { username, newName });

        if (!username || !newName) {
            throw new Error("Username and new name are required");
        }

        const response = await axios.put(`${API_URL}/update-name`,{  
                username, 
                newName 
            }, 
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("EditUserName API error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Error updating name");
    }
};




export const registerUser = async (username, email,password) => {
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
