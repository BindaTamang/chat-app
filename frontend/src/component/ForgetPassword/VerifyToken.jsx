// VerifyToken.jsx

import React, { useState } from "react";
import { verifyToken } from "../../api/auth";
import { useParams } from "react-router-dom";
import "./VerifyToken.scss"; // Import CSS file

export default function VerifyToken() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const response = await verifyToken(otp);
      setMessage("OTP verified successfully!");
      // Redirect to reset password page or dashboard after OTP verification
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="heading">
          <div className="title">Verify OTP</div>
        </div>

        <form onSubmit={handleVerifyToken} className="form">
          <div className="input-container">
            <input
              type="text"
              className="input"
              placeholder="OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button">
            Verify OTP
          </button>

          {message && <div className="message">{message}</div>}
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
}
