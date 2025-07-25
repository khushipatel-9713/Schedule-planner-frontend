
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/LoginSlice";
import api from "../../api/axiosInstance"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.fontFamily = "'Poppins', sans-serif";
    document.body.style.background = "url('/images/bg.avif') no-repeat center center fixed";
    document.body.style.backgroundSize = "cover";
    return () => (document.body.style = "");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email || !password) return setError("Please fill all fields.");
    if (!emailPattern.test(email)) return setError("Enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");

    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status === 200) {
        dispatch(setUser({ token: res.data.token, flag: true }));
        setTimeout(() => navigate("/dashboard"), 200);
      }
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backdropFilter: "blur(6px)",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "500px",
          display: "flex",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Left - Form Section */}
        <div style={{ width: "50%", padding: "40px", backgroundColor: "rgba(255,255,255,0.7)" }}>
          <h2 className="text-center mb-3" style={{ fontWeight: "700", color: "#000" }}>
            Login
          </h2>
          <p className="text-center mb-4" style={{ color: "#333", fontSize: "14px" }}>
            Enter your credentials to access your dashboard
          </p>

          {error && <div className="alert alert-danger text-center p-2">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label text-dark">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "10px",
                }}
              />
            </div>

            <div className="mb-3">
              <label className="form-label text-dark">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  padding: "10px",
                }}
              />
            </div>

            <button
              type="submit"
              className="btn w-100"
              style={{
                background: "#000",
                color: "#fff",
                fontWeight: "600",
                padding: "10px",
                borderRadius: "6px",
                border: "none",
                marginTop: "10px",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => (e.target.style.background = "#222")}
              onMouseOut={(e) => (e.target.style.background = "#000")}
            >
              Login
            </button>

            <div className="text-center mt-4">
              <p style={{ fontSize: "13px", color: "#444" }}>
                Don’t have an account?{" "}
                <Link to="/register" style={{ color: "#000", textDecoration: "underline" }}>
                  Register
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" style={{ color: "#000", fontSize: "13px", textDecoration: "underline" }}>
                  Forgot Password?
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Right - Image/Quote Section */}
        <div
          style={{
            width: "50%",
            backgroundImage: "url('/images/s6.avif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            }}
          ></div>
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <h3 style={{ fontWeight: "600", fontSize: "22px" }}>Smart Scheduler</h3>
            <p style={{ fontSize: "14px", marginTop: "10px" }}>
              “Plan smarter. Work better. Live fully.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
