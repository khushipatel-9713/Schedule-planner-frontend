import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      if (response.status === 200) {
        alert("OTP send successfully");
        navigate("/Otp");
      }
    } catch (err) {
      console.log("Registration failed:", err);
      alert("Registration failed. Please try again."+err);
    }
  };

  return (
    <>
      {/* FontAwesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
      />

      <div style={styles.formContainer}>
        <div style={styles.formBox}>
          <h2 style={styles.heading}>Register</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div style={styles.inputGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <i className="fas fa-user icon" style={styles.icon}></i>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full Name"
                required
                value={formData.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <i className="fas fa-envelope icon" style={styles.icon}></i>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <i className="fas fa-lock icon" style={styles.icon}></i>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Create a password"
                required
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
              <i className="fas fa-lock icon" style={styles.icon}></i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <button type="submit" style={styles.btn}>Register</button>
            </div>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Already have an account?{" "}
                <Link to="/login" style={styles.footerLink}>Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

const styles = {
  formContainer: {
    fontFamily: "'Arial', sans-serif",
    backgroundImage: 'url("images/register.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "105vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  formBox: {
    background: "rgba(15, 14, 14, 0.55)",
    padding: "5px 30px",
    borderRadius: 15,
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
    width: 380,
    maxWidth: "100%",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    color: "#fff",
  },

  heading: {
    marginBottom: 30,
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },

  inputGroup: {
    marginBottom: 22,
    textAlign: "left",
    position: "relative",
  },

  label: {
    display: "block",
    fontSize: 14,
    marginBottom: 6,
    color: "#ddd",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "12px 12px 12px 40px",
    fontSize: 15,
    border: "none",
    borderRadius: 8,
    outline: "none",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#222",
    boxShadow: "inset 0 2px 6px rgba(0, 0, 0, 0.15)",
    transition: "box-shadow 0.3s ease",
  },

  icon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 18,
    color: "#888",
    pointerEvents: "none",
  },

  btn: {
    width: "100%",
    padding: 14,
    background: "linear-gradient(90deg, rgba(0,201,167,1) 0%, rgba(0,95,115,1) 100%)",
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.3s ease",
  },

  footer: {
    marginTop: 18,
  },

  footerText: {
    fontSize: 14,
    color: "#eee",
  },

  footerLink: {
    color: "#00c9a7",
    textDecoration: "none",
    fontWeight: "bold",
  },
};
