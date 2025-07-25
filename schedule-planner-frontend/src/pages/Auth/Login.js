
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setUser } from "../../redux/LoginSlice";
// import axios from "axios";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     document.body.style.background = "url('/images/s6.avif') no-repeat center center fixed";
//     document.body.style.backgroundSize = "cover";
//     document.body.style.fontFamily = "'Poppins', sans-serif";
//     document.body.style.margin = "0";

//     return () => {
//       document.body.style = "";
//     };
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

//     if (!email || !password) return setError("Please fill all fields.");
//     if (!emailPattern.test(email)) return setError("Enter a valid email.");
//     if (password.length < 6) return setError("Password must be at least 6 characters.");

//     try {
//       const res = await axios.post("http://localhost:5000/auth/login", { email , password });

//       if (res.status === 200) {
//         dispatch(setUser({ token: res.data.token ,flag:true}));
//         setTimeout(() => navigate("/dashboard"), 200);
//       }
//     } catch (err) {
//       setError("Invalid email or password.");
//     }
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: "relative" }}>
//       {/* Dark overlay */}
//       <div
//         style={{
//           position: "absolute",
//           top: 0, left: 0,
//           width: "100%", height: "100%",
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 0,
//         }}
//       ></div>

//       {/* Form box */}
//       <div
//         className="form-box"
//         style={{
//           zIndex: 1,
//           background: "rgba(255, 255, 255, 0.1)",
//           padding: "30px",
//           borderRadius: "12px",
//           boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
//           width: "370px",
//           backdropFilter: "blur(10px)",
//           textAlign: "center",
//           border: "1px solid rgba(255, 255, 255, 0.2)",
//           color: "#fff",
//         }}
//       >
//         <h2 style={{ marginBottom: "25px", color: "#e2dada", fontSize: "28px", fontWeight: "bold" }}>
//           Login
//         </h2>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="mb-3 position-relative text-start">
//             <label htmlFor="email" className="form-label text-light">Email</label>
// <i className="fas fa-envelope position-absolute" style={{ top: "44px", left: "12px", color: "#000" }}></i>
//             <input
//               type="email"
//               id="email"
//               className="form-control ps-5"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-3 position-relative text-start">
//             <label htmlFor="password" className="form-label text-light">Password</label>
// <i className="fas fa-lock position-absolute" style={{ top: "44px", left: "12px", color: "#000" }}></i>
//             <input
//               type="password"
//               id="password"
//               className="form-control ps-5"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: "6px" }}
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="btn w-100"
//             style={{
//               padding: "12px",
//               background: "linear-gradient(to right, #00c9a7, #005f73)",
//               color: "white",
//               fontSize: "16px",
//               fontWeight: "bold",
//               border: "none",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             Login
//           </button>

//           {/* Footer links */}
//           <div className="footer mt-3">
//             <p style={{ color: "#eee" }}>
//               Don't have an account?{" "}
//               <Link to="/register" style={{ color: "#00c9a7", fontWeight: "bold", textDecoration: "none" }}>
//                 Register
//               </Link>
//             </p>
//             <p>
//               <Link to="/forgot-password" style={{ color: "#00c9a7", fontWeight: "bold", textDecoration: "none" }}>
//                 Forgot Password?
//               </Link>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
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
      const res = await api.post("/login", { email, password });
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
