// import React, { useState, useEffect } from "react";

// const Distraction = () => {
//   const [logs, setLogs] = useState([]);
//   const [quote, setQuote] = useState("");
//   const [time, setTime] = useState(new Date());
//   const [darkMode, setDarkMode] = useState(true);

//   const quotes = [
//     "Stay focused, stay sharp.",
//     "Discipline is the bridge between goals and accomplishment.",
//     "You can do anything, but not everything.",
//     "Silence the noise, amplify your purpose.",
//     "Distractions are just tests of your will."
//   ];

//   useEffect(() => {
//     setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const handleLog = (type) => {
//     const entry = {
//       type,
//       time: new Date().toLocaleString(),
//     };
//     setLogs([entry, ...logs]);
//   };

//   const handleClearLogs = () => setLogs([]);

//   const countByType = logs.reduce((acc, curr) => {
//     acc[curr.type] = (acc[curr.type] || 0) + 1;
//     return acc;
//   }, {});

//   const mostFrequent = Object.entries(countByType).sort((a, b) => b[1] - a[1])[0];

//   const typeColors = {
//     "📱 Phone": "#00bfff",
//     "💬 Social Media": "#ff69b4",
//     "🔊 Noise": "#00fa9a",
//     "❓ Other": "#6c757d",
//   };

//   const bgStyle = {
//     fontFamily: "'Poppins', sans-serif",
//     background: darkMode
//       ? "linear-gradient(135deg, #1e1e2f, #2c3e50)"
//       : "linear-gradient(135deg, #fdfbfb, #ebedee)",
//     backgroundSize: "cover",
//     minHeight: "100vh",
//     padding: "20px",
//     marginLeft: "250px",
//     transition: "all 0.5s ease-in-out",
//   };

//   const overlayStyle = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     height: "100%",
//     width: "100%",
//     backgroundColor: darkMode ? "rgba(0, 0, 0, 0.5)" : "rgba(255,255,255,0.3)",
//     zIndex: 0,
//   };

//   const cardStyle = {
//     position: "relative",
//     zIndex: 1,
//     maxWidth: "950px",
//     margin: "50px auto",
//     background: darkMode ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)",
//     padding: "40px",
//     borderRadius: "25px",
//     boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
//     backdropFilter: "blur(20px)",
//     color: darkMode ? "#ffffff" : "#1a1a1a",
//     transition: "0.4s ease",
//   };

//   return (
//     <div style={bgStyle}>
//       <div style={overlayStyle}></div>

//       <div className="container" style={cardStyle}>
//         <div className="text-end mb-3">
//           <button
//             className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"} fw-bold`}
//             onClick={() => setDarkMode(!darkMode)}
//           >
//             {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
//           </button>
//         </div>

//         <h1 className="text-center fw-bold mb-3">🚫 Distraction Logger</h1>
//         <p className="text-center fs-5 fst-italic">{quote}</p>

//         <div className="text-center mb-4">
//           <h5>🕒 {time.toLocaleTimeString()}</h5>
//         </div>

//         <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
//           {Object.keys(typeColors).map((type) => (
//             <button
//               key={type}
//               onClick={() => handleLog(type)}
//               style={{
//                 backgroundColor: typeColors[type],
//                 color: "#fff",
//                 padding: "12px 22px",
//                 borderRadius: "50px",
//                 fontSize: "1.05rem",
//                 border: "none",
//                 fontWeight: "600",
//                 transition: "transform 0.3s, box-shadow 0.3s",
//                 boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.transform = "scale(1.08)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.transform = "scale(1)";
//               }}
//             >
//               {type}
//             </button>
//           ))}
//         </div>

//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <h4>🧾 Logged Distractions</h4>
//           <button className="btn btn-danger btn-sm px-3 py-1 fw-semibold" onClick={handleClearLogs}>
//             Clear All
//           </button>
//         </div>

//         {logs.length === 0 ? (
//           <p className={`text-${darkMode ? "light" : "dark"} text-center fst-italic`}>
//             No distractions logged yet.
//           </p>
//         ) : (
//           <div style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "8px" }}>
//             {logs.map((log, index) => (
//               <div
//                 key={index}
//                 className="mb-3 p-3 rounded"
//                 style={{
//                   background: darkMode ? "rgba(255,255,255,0.15)" : "#f7f7f7",
//                   borderLeft: `6px solid ${typeColors[log.type]}`,
//                   fontWeight: "500",
//                   color: darkMode ? "#fff" : "#000",
//                   boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
//                 }}
//               >
//                 <span style={{ fontSize: "1.1rem" }}>{log.type}</span>
//                 <br />
//                 <small className="fst-italic">Logged at: {log.time}</small>
//               </div>
//             ))}
//           </div>
//         )}

//         <hr style={{ borderColor: darkMode ? "#aaa" : "#000" }} />

//         <div className="mt-4">
//           <h5>📊 Summary</h5>
//           <p>Total Distractions: <strong>{logs.length}</strong></p>
//           {mostFrequent && (
//             <p>Most Frequent: <strong>{mostFrequent[0]}</strong> ({mostFrequent[1]} times)</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Distraction;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Distraction = () => {
  const [logs, setLogs] = useState([]);
  const [quote, setQuote] = useState("");
  const [time, setTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(true);

  const quotes = [
    "Stay focused, stay sharp.",
    "Discipline is the bridge between goals and accomplishment.",
    "You can do anything, but not everything.",
    "Silence the noise, amplify your purpose.",
    "Distractions are just tests of your will.",
  ];

  

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLog = (type) => {
    const entry = {
      type,
      time: new Date().toLocaleString(),
    };
    setLogs([entry, ...logs]);
  };

  const handleClearLogs = () => setLogs([]);

  const countByType = logs.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const mostFrequent = Object.entries(countByType).sort((a, b) => b[1] - a[1])[0];

  const typeColors = {
    "📱 Phone": "#007bff",
    "💬 Social Media": "#dc3545",
    "🔊 Noise": "#28a745",
    "❓ Other": "#6c757d",
  };

  const bgStyle = {
    fontFamily: "'Poppins', sans-serif",
    background: darkMode
      ? "linear-gradient(135deg, #fdfbfb, #ebedee)" // light bg in darkMode
      : "linear-gradient(135deg,rgb(99, 99, 107),rgb(73, 90, 107))", // dark bg in lightMode
    color: darkMode ? "#000" : "#fff",
    minHeight: "100vh",
    padding: "20px",
    marginLeft: "250px",
    transition: "all 0.5s ease-in-out",
  };

  const cardStyle = {
    maxWidth: "900px",
    margin: "auto",
    marginTop: "40px",
    padding: "40px",
    borderRadius: "20px",
    background: darkMode ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    color: darkMode ? "#000" : "#fff",
  };

  const summaryTextColor = darkMode ? "#333" : "#ccc";

  return (
    <div style={bgStyle}>
      <div style={cardStyle}>
        <div className="text-end mb-3">
          <button
            className={`btn ${darkMode ? "btn-dark" : "btn-light"} fw-bold`}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌙 Dark Mode" : "☀ Light Mode"}
          </button>
        </div>

        <h1 className="text-center fw-bold mb-3">🚫 Distraction Logger</h1>
        <p className="text-center fs-5 fst-italic">{quote}</p>

        <div className="text-center mb-4">
          <h5>🕒 {time.toLocaleTimeString()}</h5>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
          {Object.keys(typeColors).map((type) => (
            <button
              key={type}
              onClick={() => handleLog(type)}
              style={{
                backgroundColor: typeColors[type],
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "30px",
                fontSize: "1rem",
                border: "none",
                fontWeight: "600",
                transition: "all 0.3s ease",
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>🧾 Logged Distractions</h4>
          <button className="btn btn-danger btn-sm px-3 py-1 fw-semibold" onClick={handleClearLogs}>
            Clear All
          </button>
        </div>

        {logs.length === 0 ? (
          <p className={`text-${darkMode ? "dark" : "light"} text-center fst-italic`}>
            No distractions logged yet.
          </p>
        ) : (
          <div className="table-responsive mb-4">
            <table className={`table ${darkMode ? "table-light" : "table-dark"} table-bordered table-hover`}>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, index) => (
                  <tr key={index}>
                    <td>{log.type}</td>
                    <td>{log.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <hr />
<div
  className="mt-4 px-3 py-3 rounded"
  style={{
    // 🔄 Background Reverse Logic:
    backgroundColor: darkMode ?"#1e1e1e" : "#f1f1f1", // Light in darkMode, Dark in lightMode
    // 🔤 Text Color:
    color: darkMode ? "#f5f5f5": "#1a1a1a",
    // ☁️ Shadow Adjust:
    boxShadow: darkMode
      ? "0 3px 8px rgba(0,0,0,0.2)"
      : "0 3px 8px rgba(255,255,255,0.1)",
    transition: "all 0.4s ease",
  }}
>
  <h5 style={{ fontWeight: "600" }}>📊 Summary</h5>
  <p>
    Total Distractions:{" "}
    <strong style={{ color: darkMode ? "#B31312":"#B31312" }}>
      {logs.length}
    </strong>
  </p>
  {mostFrequent && (
    <p>
      Most Frequent:{" "}
      <strong style={{ color: darkMode ?"#B31312":"#B31312" }}>
        {mostFrequent[0]}
      </strong>{" "}
      ({mostFrequent[1]} times)
    </p>
  )}
</div>



      </div>
    </div>
  );
};

export default Distraction;

