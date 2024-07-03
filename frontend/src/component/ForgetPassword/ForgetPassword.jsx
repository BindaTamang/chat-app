// ForgotPassword.jsx

import React, { useState } from "react";
import { requestPasswordReset } from "../../api/auth";
import "./ForgetPassword.scss"; // Import CSS file

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await requestPasswordReset(email);
      setMessage("Password reset email sent successfully!");
    } catch (err) {
      setError("Error sending password reset email. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="heading">
          <div className="title">Forgot Password</div>
          <div className="subtitle">
            Enter your email to reset your password
          </div>
        </div>

        <form onSubmit={handlePasswordReset} className="form">
          <div className="input-container">
            <input
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            Send Password Reset Email
          </button>

          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
