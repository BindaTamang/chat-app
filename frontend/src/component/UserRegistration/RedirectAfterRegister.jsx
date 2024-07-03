// RedirectAfterRegister.jsx

import React from "react";
import { Register } from "../../api/auth";

const RedirectAfterRegister = ({ children }) => {
  const handleRegister = async (formData) => {
    try {
      const response = await Register(formData);
      // Assuming Register function handles registration and returns success
      return { success: true }; // or response.success if Register API returns it
    } catch (error) {
      return { error: "Registration failed. Please try again." };
    }
  };

  const handleRedirect = (path) => {
    // Perform redirection logic here
    // For example, navigate to login page
    window.location.href = path;
  };

  return children({ handleRegister, handleRedirect });
};

export default RedirectAfterRegister;
