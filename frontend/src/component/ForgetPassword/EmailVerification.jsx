import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmailVerification.scss"; // Import CSS file

export default function EmailVerification() {
  const email = localStorage.getItem("email");
  const otp = parseInt(localStorage.getItem("otp"));
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);

  function resendOTP() {
    if (disable) return;
    axios
      .post("http://localhost:5000/send_recovery_email", {
        OTP: otp,
        recipient_email: email,
      })
      .then(() => setDisable(true))
      .then(() => alert("A new OTP has successfully been sent to your email."))
      .then(() => setTimer(60))
      .catch(console.log);
  }

  function verifyOTP() {
    if (parseInt(OTPinput.join("")) === otp) {
      localStorage.setItem("otpVerified", "true");
      window.location.href = "/reset-password"; // Redirect to reset password page
      return;
    }
    alert(
      "The code you have entered is not correct, try again or re-send the link"
    );
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  return (
    <div className="email-verification-container">
      <div className="email-verification-card">
        <div className="email-verification-heading">
          <div className="email-verification-title">Email Verification</div>
          <div className="email-verification-subtitle">
            We have sent a code to your email {email}
          </div>
        </div>

        <form>
          <div className="otp-input-container">
            {OTPinput.map((value, index) => (
              <div key={index} className="otp-input-wrapper">
                <input
                  maxLength="1"
                  className="otp-input"
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const newOTPinput = [...OTPinput];
                    newOTPinput[index] = e.target.value;
                    setOTPinput(newOTPinput);
                  }}
                />
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button
              onClick={() => verifyOTP()}
              className={`verify-button ${disable ? "disabled" : ""}`}
              disabled={disable}
            >
              Verify Account
            </button>
            <button onClick={() => resendOTP()} className="resend-button">
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
