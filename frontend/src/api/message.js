import axios from "axios";

const API_URL = "http://localhost:8000/api/message";
export const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/messages`);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error("Error fetching messages");
    }
  };
  
  export const sendMessage = async (messageData) => {
    try {
      const response = await axios.post(`${API_URL}/message/sendMessage`, messageData);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Error sending message");
    }
  };
  