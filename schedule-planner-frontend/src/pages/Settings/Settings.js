// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   Form,
//   Button,
//   Container,
//   Row,
//   Col,
//   Alert,
// } from 'react-bootstrap';

// const SettingsPage = () => {
//   const [formData, setFormData] = useState({
//     theme: 'light',
//     notifications: true,
//     timeZone: 'Asia/Kolkata',
//   });
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState(null);

//   const fetchSettings = async () => {
//     try {
//       const { data } = await axios.get('/api/settings', {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`, // Adjust token logic as per your app
//         },
//       });
//       if (data) {
//         setFormData(data);
//       }
//     } catch (err) {
//       console.error('Error fetching settings');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSettings();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     const val = type === 'checkbox' ? checked : value;
//     setFormData((prev) => ({ ...prev, [name]: val }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/settings', formData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setAlert({ type: 'success', message: 'Settings updated successfully' });
//     } catch (err) {
//       setAlert({ type: 'danger', message: 'Failed to update settings' });
//     }
//   };

//   return (
//     <div style={{ marginLeft: '250px', padding: '30px', background: '#f8f9fa', minHeight: '100vh' }}>
//       <Container>
//         <h2 className="mb-4">User Settings</h2>
//         {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
//         {!loading && (
//           <Form onSubmit={handleSubmit}>
//             <Row className="mb-3">
//               <Col md={6}>
//                 <Form.Group controlId="themeSelect">
//                   <Form.Label>Theme</Form.Label>
//                   <Form.Select
//                     name="theme"
//                     value={formData.theme}
//                     onChange={handleChange}
//                   >
//                     <option value="light">Light</option>
//                     <option value="dark">Dark</option>
//                   </Form.Select>
//                 </Form.Group>
//               </Col>

//               <Col md={6}>
//                 <Form.Group controlId="timeZone">
//                   <Form.Label>Time Zone</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="timeZone"
//                     value={formData.timeZone}
//                     onChange={handleChange}
//                     placeholder="e.g. Asia/Kolkata"
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>

//             <Row className="mb-4">
//               <Col>
//                 <Form.Check
//                   type="switch"
//                   id="notifications"
//                   name="notifications"
//                   label="Enable Notifications"
//                   checked={formData.notifications}
//                   onChange={handleChange}
//                 />
//               </Col>
//             </Row>

//             <Button variant="primary" type="submit">
//               Save Settings
//             </Button>
//           </Form>
//         )}
//       </Container>
//     </div>
//   );
// };

// export default SettingsPage;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Settings = () => {
  const [calendarView, setCalendarView] = useState("week");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("english");
  const [sound, setSound] = useState("chime");
  const [saved, setSaved] = useState(false);

  const translations = {
    english: {
      title: "Settings",
      calendar: "Calendar View",
      sound: "Notification Sound",
      theme: "Theme",
      lang: "Language",
      save: "Save Settings",
      saved: "Settings Saved!",
    },
    hindi: {
      title: "सेटिंग्स",
      calendar: "कैलेंडर दृश्य",
      sound: "सूचना ध्वनि",
      theme: "थीम",
      lang: "भाषा",
      save: "सेटिंग सहेजें",
      saved: "सेटिंग सहेजी गई!",
    },
    japanese: {
      title: "設定",
      calendar: "カレンダービュー",
      sound: "通知音",
      theme: "テーマ",
      lang: "言語",
      save: "設定を保存",
      saved: "設定が保存されました！",
    },
    spanish: {
      title: "Configuraciones",
      calendar: "Vista del calendario",
      sound: "Sonido de notificación",
      theme: "Tema",
      lang: "Idioma",
      save: "Guardar configuración",
      saved: "¡Configuración guardada!",
    },
  };

  const t = translations[language];

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setCalendarView(parsed.calendarView || "week");
      setTheme(parsed.theme || "light");
      setLanguage(parsed.language || "english");
      setSound(parsed.sound || "chime");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light-theme", "dark-theme");
    html.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
  }, [theme]);

  const playSound = (soundType) => {
    if (soundType === "none") return;
    const audio = new Audio(`/sounds/${soundType}.mp3`);
    audio.play().catch((err) => console.warn("Sound error:", err));
  };

  const handleSave = () => {
    const settings = { calendarView, theme, language, sound };
    localStorage.setItem("settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={getContainerStyle(theme)}>
      <div className="settings-panel">
        <h2 className="page-title">⚙️ {t.title}</h2>

        <SettingRow icon="bi-calendar2-week" label={t.calendar} value={calendarView} onChange={setCalendarView} options={[
          { value: "month", label: "Monthly" },
          { value: "week", label: "Weekly" },
          { value: "day", label: "Daily" },
        ]} />

        <SettingRow icon="bi-bell-fill" label={t.sound} value={sound} onChange={(v) => {
          setSound(v);
          playSound(v);
        }} options={[
          { value: "chime", label: "Chime" },
          { value: "ding", label: "Ding" },
          { value: "pop", label: "Pop" },
          { value: "none", label: "None" },
        ]} />

        <SettingRow icon="bi-brightness-high" label={t.theme} value={theme} onChange={setTheme} options={[
          { value: "light", label: "Light" },
          { value: "dark", label: "Dark" },
        ]} />

        <SettingRow icon="bi-translate" label={t.lang} value={language} onChange={setLanguage} options={[
          { value: "english", label: "English" },
          { value: "hindi", label: "Hindi" },
          { value: "japanese", label: "Japanese" },
          { value: "spanish", label: "Spanish" },
        ]} />

        <div className="save-wrapper">
          <button className="btn-save" onClick={handleSave}>
            <i className="bi bi-save2 me-2"></i> {t.save}
          </button>
          {saved && <p className="mt-3 text-success fw-bold">{t.saved}</p>}
        </div>
      </div>

      <style>{`
      .settings-panel {
  max-width: 600px;
  width: 100%;
  padding: 30px;
  background: var(--panel-bg); /* adaptive */
  backdrop-filter: blur(16px);
  border-radius: 15px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  color: var(--text-main);
  transition: background 0.3s ease;
}
  .light-theme {
  --text-main: #111;
  --panel-bg: rgba(214, 238, 235, 0.35);
}

.dark-theme {
  --text-main: #f1f1f1;
  --panel-bg: rgba(94, 96, 96, 0.47);
}



        .page-title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 30px;
        }

        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .setting-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
        }

        .setting-select {
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 1rem;
          border: 1px solid #ccc;
        }

        .btn-save {
          background: #007bff;
          color: white;
          padding: 10px 24px;
          border-radius: 25px;
          border: none;
          font-weight: 600;
          transition: background 0.3s;
        }

        .btn-save:hover {
          background: #0056b3;
        }

        .save-wrapper {
          text-align: center;
          margin-top: 25px;
        }

        .light-theme {
          --text-main: #111;
        }

        .dark-theme {
          --text-main: #f1f1f1;
        }
      `}</style>
    </div>
  );
};

const getContainerStyle = (theme) => ({
  marginLeft: "250px",
  minHeight: "100vh",
  background: theme === "dark"
    ? "linear-gradient(135deg,rgb(102, 110, 110),rgb(114, 118, 124))"
    : "linear-gradient(135deg, #f9f9f9, #eaeaea)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "60px 20px",
  transition: "all 0.4s ease-in-out",
});

const SettingRow = ({ icon, label, value, onChange, options }) => (
  <div className="setting-row">
    <div className="setting-label">
      <i className={`bi ${icon}`} style={{ fontSize: "1.2rem" }}></i>
      <span>{label}</span>
    </div>
    <select className="setting-select" value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export default Settings;

