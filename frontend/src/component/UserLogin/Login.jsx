import React, { useState } from "react";
import { Login } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await Login({ email, password });
      console.log("Login Successful:", response);
      navigate("/chat"); // Correct usage of navigate
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="heading">
          <div className="title">Login</div>
        </div>

        <form onSubmit={handleLogin} className="form">
          <div className="input-container">
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
            Login
          </button>
          {error && <div className="error">{error}</div>}
          <div className="links-container">
            <div className="forgot-password">
              <Link to="/forget-password">Forgot Password?</Link>
            </div>
            <div className="register-link">
              Not a member?{" "}
              <Link to="/register" className="register-btn">
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
