// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../App.css';
// import { useSelector } from 'react-redux';

// const Dashboard = () => {
//   const {token} = useSelector((store)=>store.LoginToken);
//   const navigate = useNavigate();
//   const [profilePic, setProfilePic] = useState("images/default-avatar.png");
//    const [formData, setFormData] = useState({
//       name: "",
//       email: "",
//       phone: "",
//       gender: "",
//       dob: "",
//       password: "",
//       bio: "",
//     });

  
//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/profile`,{headers:{Authorization:`Bearer ${token}`}})
//       .then((res) => {
//         setFormData(res.data);
//         if (res.data.profilePic) setProfilePic(res.data.profilePic);
//       })
//       .catch((err) => console.error("Failed to fetch profile", err));
//   },[]);

//   const [dashboardData, setDashboardData] = useState({
//     totalTasks: 0,
//     completedGoals: 0,
//     focusTime: '0h 0m',
//   });

//   const [theme, setTheme] = useState('dark');
//   const isDark = theme === 'dark';

//   const styles = {
//     bg: isDark ? '#1e1e2f' : '#f7f9fc',
//     card: isDark ? '#2c2e3a' : '#ffffff',
//     text: isDark ? '#f0f0f0' : '#222831',
//     accent: '#00ADB5',
//     shadow: '0 4px 18px rgba(0,0,0,0.1)',
//     radius: '16px'
//   };

//   const toggleTheme = () => {
//     setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   // const fetchData = async () => {
//   //   try {
//   //     const [tasks] = await Promise.all([
//   //       axios.get('http://localhost:5000/api/tasks/count',{headers:{Authorization :`Bearer ${token}`}}),
//   //       axios.get('http://localhost:5000/api/goals/completed',{headers:{Authorization :`Bearer ${token}`}}),
//   //       axios.get('http://localhost:5000/api/focus/today',{headers:{Authorization :`Bearer ${token}`}}),
//   //     ]);

    
//   //     setDashboardData({
//   //       totalTasks: tasks.data.count || 24,
//   //       completedGoals: goals.data.count || 12,
//   //       focusTime: focus.data.time || '3h 45m',
//   //     });
//   //   } catch (err) {
//   //     console.error("API fetch error:", err.message);
//   //   }
//   // };
//   const fetchData = async () => {
//   try {
//     const [tasks, goals, focus] = await Promise.all([
//       axios.get('http://localhost:5000/api/tasks/count', {
//         headers: { Authorization: `Bearer ${token}` },
//       }),
//       axios.get('http://localhost:5000/api/goals/completed/count', {
//         headers: { Authorization: `Bearer ${token}` },
//       }),
//       axios.get('http://localhost:5000/api/focus/time/today', {
//         headers: { Authorization: `Bearer ${token}` },
//       }),
//     ]);
   

//     setDashboardData({
//       totalTasks: tasks.data.count|| 0,
//       completedGoals: goals.data.completedGoals || 0,
//       focusTime: focus.data.todayFocusTimeInSeconds || '0h 0m',
//     });
//   } catch (err) {
//     console.error("API fetch error:", err?.response?.data || err.message);
//   }
// };

//   useEffect(() => {
//     fetchData(); 
//   }, []);

//   const statCards = [
//     { title: 'Total Tasks', value: dashboardData.totalTasks, icon: 'fas fa-tasks', percent: 100 },
//     { title: 'Completed Goals', value: dashboardData.completedGoals, icon: 'fas fa-bullseye', percent: 85 },
//     { title: "Today's Focus", value: dashboardData.focusTime, icon: 'fas fa-clock', percent: 60 },
//   ];

//   return (
//     <div style={{
//       backgroundColor: styles.bg,
//       color: styles.text,
//       minHeight: '100vh',
//       padding: '30px',
//       marginLeft: '250px',
//       transition: '0.5s',
//     }}>
//       {/* Navbar */}
//       <div className="d-flex justify-content-between align-items-center mb-4 p-3"
//         style={{
//           background: isDark ? 'rgba(44, 46, 58, 0.9)' : 'rgba(204, 225, 236, 0.9)',
//           borderRadius: styles.radius,
//           boxShadow: styles.shadow,
//           backdropFilter: 'blur(10px)'
//         }}>
//         <h3 style={{ color: styles.accent, fontWeight: 700 }}>📅 Schedule Planner Dashboard</h3>
//         <div className="d-flex align-items-center gap-4 position-relative">
//           {/* Theme toggle */}
//           <div className="d-flex align-items-center gap-2">
//             <i className="fas fa-sun text-warning"></i>
//             <div className="form-check form-switch">
//               <input className="form-check-input" type="checkbox" onChange={toggleTheme} checked={isDark} />
//             </div>
//             <i className="fas fa-moon text-light"></i>
//           </div>

//           {/* Profile */}
//           <img src= {profilePic} alt="User" className="rounded-circle border border-light" width="40" />
//           <span className="fw-semibold">{formData.name}</span>
//         </div>
//       </div>

//       {/* Motivational Quote */}
//       <div className="alert text-center fw-semibold" style={{
//         background: `linear-gradient(90deg, ${styles.accent},rgba(195, 231, 231, 0.84))`,
//         borderRadius: styles.radius,
//         color: '#fff',
//         fontSize: '1.05rem',
//         boxShadow: styles.shadow
//       }}>
//         "Push your limits every day. Your schedule defines your success!"
//       </div>

//       {/* Stat Cards */}
//       <div className="row g-4 mt-3">
//         {statCards.map((card, idx) => (
//           <div className="col-md-4" key={idx}>
//             <div className="card text-center h-100 border-0"
//               style={{
//                 background: styles.card,
//                 color: styles.text,
//                 borderRadius: styles.radius,
//                 boxShadow: styles.shadow,
//                 transition: 'transform 0.2s',
//               }}>
//               <div className="card-body">
//                 <i className={`${card.icon} fa-3x mb-3`} style={{ color: styles.accent }}></i>
//                 <h5 className="card-title">{card.title}</h5>
//                 <h2>{card.value}</h2>
//                 <div className="progress mt-3" style={{ height: '6px' }}>
//                   <div className="progress-bar" style={{
//                     width: `${card.percent}%`,
//                     backgroundColor: styles.accent
//                   }}></div>
//                 </div>
//                 <small>{card.percent}% achieved</small>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Smart Suggestions & Reports */}
//       <div className="row mt-5 g-4">
//         <div className="col-md-6">
//           <div className="card h-100 border-0"
//             style={{ background: styles.card, color: styles.text, borderRadius: styles.radius, boxShadow: styles.shadow }}>
//             <div className="card-body">
//               <h5 className="card-title">Smart Suggestions</h5>
//               <p>You perform best between <strong>10 AM - 12 PM</strong>. Plan your toughest tasks then!</p>
//               <button className="btn text-white" style={{ backgroundColor: styles.accent }} onClick={() => navigate('/smart-scheduler')}>
//                 See Suggestions
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="card h-100 border-0"
//             style={{ background: styles.card, color: styles.text, borderRadius: styles.radius, boxShadow: styles.shadow }}>
//             <div className="card-body">
//               <h5 className="card-title"> Weekly Overview</h5>
//               <p>Track your week’s performance and productivity visually.</p>
//               <button className="btn text-white" style={{ backgroundColor: styles.accent }} onClick={() => navigate('/reports')}>
//                 Open Reports
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="row mt-5 g-4">
//         {[{ label: '🎧 Enter Focus Mode', link: '/focusMode' },
//         { label: '➕ Add New Task', link: '/tasks' },
//         { label: '📅 Manage Habits', link: '/habits' }].map((btn, idx) => (
//           <div className="col-md-4" key={idx}>
//             <button className="btn w-100 py-3 fw-bold"
//               style={{
//                 backgroundColor: styles.accent,
//                 color: '#fff',
//                 borderRadius: '14px',
//                 boxShadow: styles.shadow,
//                 transition: '0.2s'
//               }}
//               onClick={() => navigate(btn.link)}>
//               {btn.label}
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import { useSelector } from 'react-redux';
import api from '../../api/axiosInstance';

const Dashboard = () => {
  const { token } = useSelector((store) => store.LoginToken);
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState('images/default-avatar.png');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    password: '',
    bio: '',
  });

  useEffect(() => {
    api
      .get(`/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData(res.data);
        if (res.data.profilePic) setProfilePic(res.data.profilePic);
      })
      .catch((err) => console.error('Failed to fetch profile', err));
  }, []);

  const [dashboardData, setDashboardData] = useState({
    totalTasks: 0,
    completedGoals: 0,
    focusTime: '0h 0m',
  });

  const [theme, setTheme] = useState('dark');
  const isDark = theme === 'dark';

  const styles = {
    bg: isDark ? '#161824' : '#f2f6fa',
    card: isDark ? '#2E3246' : '#ffffff',
    text: isDark ? '#f8f9fa' : '#2d2d2d',
    accent: '#00ADB5',
    glow: isDark ? '0 0 10px rgba(0,173,181,0.4)' : '0 0 5px rgba(0,173,181,0.3)',
    shadow: '0 4px 20px rgba(0,0,0,0.08)',
    radius: '18px',
    cardLight: isDark ? '#3a3f55' : '#fdfdfd'  // new lighter card color
  };

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const fetchData = async () => {
    try {
      const [tasks, goals, focus] = await Promise.all([
        api.get('/tasks/count'),
        api.get('/goals/completed/count'),
        api.get('/focus/time/today'),
      ]);

      setDashboardData({
        totalTasks: tasks.data.count || 0,
        completedGoals: goals.data.completedGoals || 0,
        focusTime: focus.data.todayFocusTimeInSeconds || '0h 0m',
      });
    } catch (err) {
      console.error('API fetch error:', err?.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    { title: 'Total Tasks', value: dashboardData.totalTasks, icon: 'fas fa-tasks', percent: 100 },
    { title: 'Completed Goals', value: dashboardData.completedGoals, icon: 'fas fa-bullseye', percent: 85 },
    { title: "Today's Focus", value: dashboardData.focusTime, icon: 'fas fa-clock', percent: 60 },
  ];

  return (
    <div style={{
      backgroundColor: styles.bg,
      color: styles.text,
      minHeight: '100vh',
      padding: '30px',
      marginLeft: '250px',
      transition: '0.5s',
      fontFamily: 'Segoe UI, sans-serif',
    }}>
      {/* Top Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3"
        style={{
          background: isDark ? 'rgba(31, 53, 97, 0.9)' : 'rgba(220, 240, 245, 0.9)',
          borderRadius: styles.radius,
          boxShadow: styles.shadow,
          backdropFilter: 'blur(10px)'
        }}>
        <h3 style={{ color: styles.accent, fontWeight: 700 }}>📅 Schedule Planner Dashboard</h3>
        <div className="d-flex align-items-center gap-4 position-relative">
          {/* Theme Toggle */}
          <div className="d-flex align-items-center gap-2">
            <i className="fas fa-sun text-warning"></i>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" onChange={toggleTheme} checked={isDark} />
            </div>
            <i className="fas fa-moon text-light"></i>
          </div>

          {/* Profile Picture */}
          <img src={profilePic} alt="User" className="rounded-circle border border-info"
            width="45" height="45" style={{ boxShadow: styles.glow }} />
          <span className="fw-semibold">{formData.name}</span>
        </div>
      </div>

      {/* Quote */}
      <div className="alert text-center fw-semibold" style={{
        background: `linear-gradient(90deg, ${styles.accent}, rgba(0, 173, 181, 0.5))`,
        borderRadius: styles.radius,
        color: '#fff',
        fontSize: '1.1rem',
        boxShadow: styles.shadow
      }}>
        "Push your limits every day. Your schedule defines your success!"
      </div>

      {/* Stat Cards */}
      <div className="row g-4 mt-3">
        {statCards.map((card, idx) => (
          <div className="col-md-4" key={idx}>
            <div className="card text-center h-100 border-0 hover-shadow"
              style={{
                background: styles.cardLight,
                color: styles.text,
                borderRadius: styles.radius,
                boxShadow: styles.shadow,
                transition: 'transform 0.3s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              <div className="card-body">
                <i className={`${card.icon} fa-3x mb-3`} style={{ color: styles.accent }}></i>
                <h5 className="card-title">{card.title}</h5>
                <h2>{card.value}</h2>
                <div className="progress mt-3" style={{ height: '6px' }}>
                  <div className="progress-bar" style={{
                    width: `${card.percent}%`,
                    backgroundColor: styles.accent
                  }}></div>
                </div>
                <small>{card.percent}% achieved</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions & Reports */}
      <div className="row mt-5 g-4">
        <div className="col-md-6">
          <div className="card h-100 border-0"
            style={{ background: styles.cardLight, color: styles.text, borderRadius: styles.radius, boxShadow: styles.shadow }}>
            <div className="card-body">
              <h5 className="card-title">Smart Suggestions</h5>
              <p>You perform best between <strong>10 AM - 12 PM</strong>. Plan your toughest tasks then!</p>
              <button className="btn text-white" style={{
                backgroundColor: styles.accent,
                borderRadius: '12px',
                boxShadow: styles.glow
              }} onClick={() => navigate('/smart-scheduler')}>
                See Suggestions
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100 border-0"
            style={{ background: styles.cardLight, color: styles.text, borderRadius: styles.radius, boxShadow: styles.shadow }}>
            <div className="card-body">
              <h5 className="card-title">Weekly Overview</h5>
              <p>Track your week’s performance and productivity visually.</p>
              <button className="btn text-white" style={{
                backgroundColor: styles.accent,
                borderRadius: '12px',
                boxShadow: styles.glow
              }} onClick={() => navigate('/reports')}>
                Open Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="row mt-5 g-4">
        {[
          { label: '🎧 Enter Focus Mode', link: '/focusMode' },
          { label: '➕ Add New Task', link: '/tasks' },
          { label: '📅 Manage Habits', link: '/habits' }
        ].map((btn, idx) => (
          <div className="col-md-4" key={idx}>
            <button className="btn w-100 py-3 fw-bold"
              style={{
                backgroundColor: styles.accent,
                color: '#fff',
                borderRadius: '14px',
                boxShadow: styles.shadow,
                transition: 'all 0.3s ease-in-out'
              }}
              onClick={() => navigate(btn.link)}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
              {btn.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

