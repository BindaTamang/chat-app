// UserRegistration.jsx

import React, { useState } from "react";
import RedirectAfterRegister from "./RedirectAfterRegister";
import "./UserRegister.scss"; // Import CSS file

export default function UserRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormSubmit = async (handleRegister, handleRedirect) => {
    setError("");
    const formData = { name, email, password };
    try {
      const { success, error: registrationError } = await handleRegister(formData);
      if (success) {
        setSuccess("Registration successful! You can now login.");
        setName("");
        setEmail("");
        setPassword("");
        handleRedirect("/chat"); // Redirect after successful registration
      } else {
        setError(registrationError || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="heading">
          <div className="title">Register</div>
        </div>

        <RedirectAfterRegister>
          {({ handleRegister, handleRedirect }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit(handleRegister, handleRedirect);
              }}
              className="form"
            >
              <div className="input-container">
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="button">
                Register
              </button>

              {error && <div className="error">{error}</div>}
              {success && <div className="success">{success}</div>}
            </form>
          )}
        </RedirectAfterRegister>
      </div>
    </div>
  );
}
