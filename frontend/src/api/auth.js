import axios from "axios";

const API_URL = "http://localhost:8000/api/auth";

export const Register = async (payload) => {
  try {
    let response = await axios.post(`${API_URL}/register`, payload);
    return response.data;
  } catch (error) {
    console.error("Register Error:", error);
    throw error;
  }
};

export const Login = async (payload) => {
  try {
    let response = await axios.post(`${API_URL}/login`, payload);
    return response.data;
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    let response = await axios.post(`${API_URL}/forget-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Password Reset Request Error:", error);
    throw error;
  }
};

export const resetPassword = async (payload) => {
  try {
    let response = await axios.post(`${API_URL}/reset-password`, payload);
    return response.data;
  } catch (error) {
    console.error("Reset Password Error:", error);
    throw error;
  }
};

export const verifyToken = async (token) => {
  try {
    let response = await axios.post(`${API_URL}/verify-token`, { token });
    return response.data;
  } catch (error) {
    console.error("Token Verification Error:", error);
    throw error;
  }
};

