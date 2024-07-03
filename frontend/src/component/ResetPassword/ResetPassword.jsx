// ResetPassword.jsx

import React, { useState } from "react";
import { resetPassword } from "../../api/auth";
import "./ResetPassword.scss"; // Import CSS file
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await resetPassword({ token, password });
      setMessage("Password reset successfully!");
    } catch (err) {
      setError("Error resetting password. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="heading">
          <div className="title">Reset Password</div>
        </div>

        <form onSubmit={handleResetPassword} className="form">
          <div className="input-container">
            <input
              type="password"
              className="input"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            Reset Password
          </button>

          {message && <div className="success">{message}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
