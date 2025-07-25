import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import api from "../../api/axiosInstance";

// 🔷 Styles
const pageBackground = {
  minHeight: "100vh",
  background: `linear-gradient(rgba(30, 30, 30, 0.56), rgba(50, 50, 50, 0.77)), url('/images/tracker.jpeg') no-repeat center/cover`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 20px",
  transition: "all 0.4s ease-in-out",
};


const glassContainer = {
  background: "rgba(72, 74, 74, 0.79)",
  borderRadius: "20px",
  padding: "50px 40px",
  width: "90%",
  maxWidth: "650px",
  color: "#f5f5f5",
  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(15px)",
  textAlign: "center",
  marginLeft: "250px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
};

const greetingStyle = {
  fontSize: "2.2rem",
  fontWeight: "600",
  color: "#00e5ff",
};

const dateStyle = {
  fontSize: "1rem",
  marginBottom: "25px",
  color: "#ccc",
};

const inputBox = {
  padding: "14px",
  borderRadius: "12px",
  width: "100%",
  fontSize: "1rem",
  marginBottom: "20px",
  border: "1px solid #ccc",
  outline: "none",
  backgroundColor: "#f9f9f9",
  color: "#333",
};

const timerText = {
  fontSize: "3.5rem",
  fontWeight: "bold",
  margin: "20px 0",
  color: "#76ff03",
  textShadow: "0 0 10px #76ff03",
};

const btnRow = {
  display: "flex",
  justifyContent: "center",
  gap: "15px",
  marginBottom: "25px",
};

const buttonBase = {
  padding: "12px 25px",
  borderRadius: "50px",
  border: "none",
  fontWeight: "600",
  fontSize: "1rem",
  color: "#fff",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const btnGreen = {
  ...buttonBase,
  backgroundColor: "#4caf50",
  boxShadow: "0 4px 12px rgba(76, 175, 80, 0.4)",
};

const btnOrange = {
  ...buttonBase,
  backgroundColor: "#ff9800",
  boxShadow: "0 4px 12px rgba(255, 152, 0, 0.4)",
};

const btnRed = {
  ...buttonBase,
  backgroundColor: "#f44336",
  boxShadow: "0 4px 12px rgba(244, 67, 54, 0.4)",
};

const logHeader = {
  fontSize: "1.3rem",
  margin: "10px 0",
  color: "#e1f5fe",
};

const logBox = {
  maxHeight: "180px",
  overflowY: "auto",
  textAlign: "left",
  padding: "10px",
  background: "rgba(255,255,255,0.08)",
  borderRadius: "12px",
};

const logItem = {
  padding: "10px",
  borderBottom: "1px solid #777",
  color: "#b2dfdb",
};

// 🔷 Component
const Tracker = () => {
  const [taskName, setTaskName] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(new Date());
  const timerRef = useRef(null);
  const {token} = useSelector((store)=>store.LoginToken);


  useEffect(() => {

    const clockInterval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
      const list =async ()=>{
        try{
          let res = await api.get("/tracker" );
         if(res.status ===200){
          setLogs(res.data);
         }
        }
        catch(err){
         console.log(err)
        }   
      }

      list();
  
    if (isRunning) {
      timerRef.current = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (secs) => {
    const hrs = String(Math.floor(secs / 3600)).padStart(2, "0");
    const mins = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const sec = String(secs % 60).padStart(2, "0");
    return `${hrs}:${mins}:${sec}`;
  };

  const greeting = () => {
    const hour = date.getHours();
    if (hour < 12) return "🌅 Good Morning";
    if (hour < 18) return "🌞 Good Afternoon";
    return "🌙 Good Evening";
  };

  const startTimer = () => !isRunning && setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);

  const stopTimer = async () => {
    if (seconds > 0) {
      const newLog = {
        task: taskName || "Unnamed Task",
        time: formatTime(seconds),
        seconds,
      };

      try {
        let res = api.post("/tracker",newLog)
        // await api.post("/api/tracker", newLog);
      } catch (err) {
        console.error("❌ Failed to save log:", err);
      }

      
    }

    setIsRunning(false);
    setSeconds(0);
    setTaskName("");
  };

  const totalTracked = logs.reduce((acc, log) => acc + log.seconds, 0);

  return (
    <div style={pageBackground}>
      <div style={glassContainer}>
        <h2 style={greetingStyle}>{greeting()}</h2>
        <h4 style={dateStyle}>
          {date.toLocaleDateString()} — {date.toLocaleTimeString()}
        </h4>

        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          style={inputBox}
        />

        <div style={{ ...timerText, animation: isRunning ? "pulse 1s infinite" : "none" }}>
          {formatTime(seconds)}
        </div>

        <div style={btnRow}>
          <button style={btnGreen} onClick={startTimer}>▶ Start</button>
          <button style={btnOrange} onClick={pauseTimer}>⏸ Pause</button>
          <button style={btnRed} onClick={stopTimer}>⏹ Stop</button>
        </div>

        <h4 style={logHeader}> Logs</h4>
        <div style={logBox}>
          {logs.length === 0 ? (
            <p style={{ color: "#ccc", fontStyle: "italic" }}>No logs yet</p>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} style={logItem}>
                ✅ {log.task} — <span style={{ fontFamily: "monospace" }}>{log.time}</span>
              </div>
            ))
          )}
        </div>

        <p style={{ color: "#fff", marginTop: "15px" }}>
          ⏱ Total Time Tracked: <strong>{formatTime(totalTracked)}</strong>
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Tracker;
