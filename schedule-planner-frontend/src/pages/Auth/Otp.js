
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";

const Otpverify = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/verify", {
        email,
        otp,
      });

      if (response.status === 201) {
        setMessage("✅ OTP verified successfully!");
        setMessageColor("green");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage("❌ Invalid OTP.");
        setMessageColor("red");
      }
    } catch (error) {
      setMessage("❌ Server Error. Try again.");
      setMessageColor("red");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h2 style={styles.title}>Verify Your OTP</h2>
        <p style={styles.subtitle}>Please enter the OTP sent to your email.</p>
        <form onSubmit={handleVerify} style={styles.form}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Verify OTP
          </button>
          {message && (
            <p style={{ ...styles.message, color: messageColor }}>{message}</p>
          )}
        </form>
      </div>

      <div style={styles.rightPanel}>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/otp-authentication-4482668-3722193.png"
          alt="OTP Illustration"
          style={styles.image}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f2f2f2", // light gray background
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  leftPanel: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "4rem 3rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  rightPanel: {
    flex: 1,
    backgroundColor: "#e0e0e0", // gray panel
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    maxHeight: "80%",
    objectFit: "contain",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#000",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    color: "#000",
    backgroundColor: "#fff",
  },
  button: {
    padding: "12px",
    fontSize: "1rem",
    backgroundColor: "#000",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  message: {
    marginTop: "1rem",
    fontWeight: "500",
  },
};

export default Otpverify;
