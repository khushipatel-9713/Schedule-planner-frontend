import React, { useState, useEffect } from "react";
import api from "../../api/axiosInstance";
import { useSelector } from "react-redux";

export default function Profile() {
  const [profilePic, setProfilePic] = useState("images/default-avatar.png");
  const [darkMode, setDarkMode] = useState(false);
  const {token} = useSelector((store)=>store.LoginToken);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    password: "",
    bio: "",
  });

  const [completion, setCompletion] = useState(0);

  

  useEffect(() => {
    api
      .get(`/profile`)
      .then((res) => {
        setFormData(res.data);
        if (res.data.profilePic) setProfilePic(res.data.profilePic);
      })
      .catch((err) => console.error("Failed to fetch profile", err));
  },[]);

  useEffect(() => {
    const filled = Object.values(formData).filter(Boolean).length;
    const percent = Math.round((filled / Object.keys(formData).length) * 100);
    setCompletion(percent);
  }, [formData]);

  const uploadProfile = (e) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setProfilePic(event.target.result);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/profile`, {
        ...formData,
        profilePic,
      });
      alert("✅ Profile updated!");
    } catch (err) {
      console.error("❌ Update failed:", err);
    }
  };

  const theme = {
    background: 'linear-gradient(135deg, rgb(32, 44, 73), rgba(36, 47, 65, 0.73))',
    cardBg: darkMode ? "#1e1e1edd" : "#ffffffdd",
    textColor: darkMode ? "#fff" : "#000",
    inputBg: darkMode ? "#2c2c2c" : "#f9f9f9",
    inputBorder: darkMode ? "#555" : "#ccc",
  };

  const inputStyle = {
    padding: "12px 15px",
    borderRadius: "10px",
    border: `1.5px solid ${theme.inputBorder}`,
    background: theme.inputBg,
    width: "100%",
    fontSize: "14px",
    color: theme.textColor,
    outline: "none",
    marginBottom: "15px",
  };

  return (
    <div
      style={{
        marginLeft: "250px",
        minHeight: "100vh",
        background: theme.background,
        color: theme.textColor,
        padding: "60px 20px",
        transition: "0.4s",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(30, 30, 47, 0.85)",
          padding: "40px 30px",
          borderRadius: "20px",
          maxWidth: "700px",
          width: "100%",
          boxShadow: "0 25px 55px rgba(0,0,0,0.3)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: darkMode ? "#f0f0f0" : "#000",
            color: darkMode ? "#000" : "#fff",
            padding: "6px 14px",
            fontWeight: "bold",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <label htmlFor="upload">
            <img
              src={profilePic}
              alt="Profile"
              title="Click to upload"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                border: "4px solid #3F72AF",
                objectFit: "cover",
                boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                cursor: "pointer",
              }}
            />
          </label>
          <input
            id="upload"
            type="file"
            accept="image/*"
            onChange={uploadProfile}
            style={{ display: "none" }}
          />
          <h2 style={{ marginTop: "15px", color: "#8CC0DE" }}>
            👤 Profile Settings
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "15px" }}>
            <input
              style={inputStyle}
              placeholder="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              style={inputStyle}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: "flex", gap: "15px" }}>
            <input
              type="number"
              style={inputStyle}
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
{/* 
          <input
            style={inputStyle}
            type="date"
            name="dob"
             placeholder="DOB"
            value={formData.dob}
            onChange={handleChange}
          /> */}
        <label
  htmlFor="dob"
  style={{
    display: 'block',
    marginBottom: '5px',
    color: 'white',
    fontWeight: 'bold'  // Optional: Bold text for better visibility
  }}
>
  Date of Birth
</label>

<input
  style={inputStyle}
  type="date"
  name="dob"
  id="dob"
  value={formData.dob}
  onChange={handleChange}
/>


          <input
            style={inputStyle}
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
          />
          <textarea
            name="bio"
            value={formData.bio}
            placeholder="Write your bio..."
            style={{ ...inputStyle, resize: "none" }}
            onChange={handleChange}
          />

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontSize: "14px", fontWeight: "600", color: "white" }}>
              Profile Completion: {completion}%
            </label>
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#ccc",
                borderRadius: "10px",
                marginTop: "5px",
              }}
            >
              <div
                style={{
                  width: `${completion}%`,
                  height: "100%",
                  background: "#3F72AF",
                  borderRadius: "10px",
                  transition: "0.4s",
                }}
              ></div>
            </div>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#3F72AF",
              color: "#fff",
              border: "none",
              borderRadius: "30px",
              fontWeight: "bold",
              fontSize: "15px",
              boxShadow: "0 6px 15px rgba(63,114,175,0.4)",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            💾 Save Changes
          </button>

          <a
            href="/"
            style={{
              display: "block",
              marginTop: "18px",
              textAlign: "center",
              color: "#8CC0DE",
              fontWeight: "600",
              textDecoration: "none",
              border: "2px solid #8CC0DE",
              padding: "10px",
              borderRadius: "30px",
              transition: "0.3s ease",
            }}
          >
            🔐 Logout
          </a>
        </form>
      </div>
    </div>
  );
}
