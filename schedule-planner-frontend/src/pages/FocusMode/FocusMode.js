import { duration, tableBodyClasses } from "@mui/material";
import api from "../../api/axiosInstance";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";

const defaultWork = 25 * 60;
const defaultBreak = 5 * 60;

const quotes = [
  "✨ Push yourself, because no one else is going to do it for you.",
  "🔥 Great things never come from comfort zones.",
  "💡 Dream it. Wish it. Do it.",
  "🎯 Stay focused and never give up.",
  "📈 Don’t stop when you’re tired. Stop when you’re done.",
];

const FocusMode = () => {
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [workTime, setWorkTime] = useState(defaultWork);
  const [breakTime, setBreakTime] = useState(defaultBreak);
  const [secondsLeft, setSecondsLeft] = useState(defaultWork);
  const [isRunning, setIsRunning] = useState(false);
  const [ambientSound, setAmbientSound] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [quote, setQuote] = useState(quotes[0]);
  const [task, setTask] = useState("Finish project report");
  const audioPlayer = useRef(null);
  const {token} = useSelector((store)=>store.LoginToken);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const playAudio = useCallback(() => {
    if (audioPlayer.current && ambientSound) {
      audioPlayer.current.volume = volume;
      audioPlayer.current.play().catch(() => {});
    }
  }, [volume, ambientSound]);

  const pauseAudio = useCallback(() => {
    if (audioPlayer.current) audioPlayer.current.pause();
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    if (secondsLeft === 0) {
      alert(isWorkTime ? "✅ Work session done!" : "☕ Break over!");
      const  fo = async()=>{
        try{
let res = await api.post("/focus/save", {
  task,
  isWorkTime,
  ambientSound,
  duration: isWorkTime ? workTime : breakTime

});

        }
        catch(err){
         console.log(err);
        }
       }

      fo();
      setIsWorkTime((prev) => !prev);
      const nextTime = isWorkTime ? breakTime : workTime;
      setSecondsLeft(nextTime);
      setIsRunning(false);
      pauseAudio();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, isWorkTime, workTime, breakTime, pauseAudio]);

  useEffect(() => {
    if (audioPlayer.current) {
      if (!ambientSound) {
        audioPlayer.current.pause();
        audioPlayer.current.src = "";
      } else {
        audioPlayer.current.src = `sounds/${ambientSound}.mp3`;
        audioPlayer.current.volume = volume;
        if (isRunning) playAudio();
      }
    }
  }, [ambientSound, isRunning, volume, playAudio]);

  useEffect(() => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[random]);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const startPauseHandler = () => {
    setIsRunning((prev) => {
      const next = !prev;
      next ? playAudio() : pauseAudio();
      return next;
    });
  };

  const resetHandler = () => {
    setIsRunning(false);
    setSecondsLeft(isWorkTime ? workTime : breakTime);
    pauseAudio();
  };

  const handleTimeChange = (type, value) => {
    const seconds = parseInt(value, 10) * 60;
    if (type === "work") {
      setWorkTime(seconds);
      if (isWorkTime) setSecondsLeft(seconds);
    } else {
      setBreakTime(seconds);
      if (!isWorkTime) setSecondsLeft(seconds);
    }
  };

  return (
    <div style={pageWrapper}>
      <div style={mainContainerStyle}>
        <h2 style={headerStyle}>
          {isWorkTime ? "🎯 Focus Mode - Work Time" : "☕ Relax - Break Time"}
        </h2>

        <div style={timerStyle}>{formatTime(secondsLeft)}</div>

        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your current task"
            style={taskInput}
          />
          <p><strong>Current Task:</strong> {task}</p>
        </div>

        <blockquote style={quoteStyle}>💬 {quote}</blockquote>

        <div>
          <button onClick={startPauseHandler} style={isRunning ? pauseBtn : startBtn}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={resetHandler} style={resetBtn}>Reset</button>
        </div>

        <div style={settingsBox}>
          <div>
            <label>🎛 Work (min): </label>
            <input
              type="number"
              min="1"
              value={Math.floor(workTime / 60)}
              onChange={(e) => handleTimeChange("work", e.target.value)}
              style={numberInput}
            />
          </div>
          <div>
            <label>☕ Break (min): </label>
            <input
              type="number"
              min="1"
              value={Math.floor(breakTime / 60)}
              onChange={(e) => handleTimeChange("break", e.target.value)}
              style={numberInput}
            />
          </div>
        </div>

        <div style={soundControl}>
          <label htmlFor="ambientSound">🎶 Ambient Sound:</label>
          <select
            id="ambientSound"
            value={ambientSound}
            onChange={(e) => setAmbientSound(e.target.value)}
            style={soundSelect}
          >
            <option value="">None</option>
            <option value="rain">Rain</option>
            <option value="cafe">Cafe</option>
            <option value="white-noise">White Noise</option>
          </select>

          <label style={{ marginTop: "10px" }}>🔉 Volume:</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            style={{ width: "60%" }}
          />
          <audio ref={audioPlayer} loop />
        </div>
      </div>
    </div>
  );
};

// 🎨 Styles
const pageWrapper = {
  marginLeft: "250px",
  minHeight: "100vh",
  background: "linear-gradient(to right,rgb(21, 35, 63),rgb(6, 61, 86))",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px",
  fontFamily: "'Poppins', sans-serif",
};

const mainContainerStyle = {
  width: "100%",
  maxWidth: "700px",
  padding: "35px",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  boxShadow: "0 15px 30px rgba(137, 131, 131, 0.1)",
  textAlign: "center",
  background: "linear-gradient(to right,rgb(120, 123, 123), #e3f2fd)",
};

const headerStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#00796b",
};

const timerStyle = {
  fontSize: "4rem",
  color: "#00695c",
  margin: "25px 0",
};

const quoteStyle = {
  fontStyle: "italic",
  color: "#4e4e4e",
  margin: "10px 0 25px",
};

const taskInput = {
  padding: "10px",
  fontSize: "1rem",
  width: "80%",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "10px",
};

const startBtn = {
  padding: "12px 30px",
  fontSize: "1.1rem",
  borderRadius: "10px",
  margin: "10px",
  border: "none",
  backgroundColor: "#aed581",
  fontWeight: "bold",
  cursor: "pointer",
};

const pauseBtn = {
  ...startBtn,
  backgroundColor: "#81c784",
  color: "#fff",
};

const resetBtn = {
  ...startBtn,
  backgroundColor: "#e57373",
  color: "#fff",
};

const soundControl = {
  marginTop: "20px",
};

const soundSelect = {
  fontSize: "1rem",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  backgroundColor: "#f1f8e9",
  color: "#333",
  outline: "none",
  width: "60%",
  margin: "0 auto",
  display: "block",
};

const settingsBox = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  margin: "25px 0",
};

const numberInput = {
  padding: "8px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  width: "60px",
  textAlign: "center",
};

export default FocusMode;
