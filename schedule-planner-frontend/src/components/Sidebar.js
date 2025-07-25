// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const Sidebar = () => {
//   const location = useLocation();

//   const navItems = [
//     { to: "/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
//     { to: "/calendar", icon: "fas fa-calendar-alt", label: "Calendar" },
//     { to: "/notifications", icon: "fas fa-bell", label: "Notifications" },
//     { to: "/reports", icon: "fas fa-chart-pie", label: "Reports" },
//     { to: "/profile", icon: "fas fa-user", label: "Profile" },
//     { to: "/settings", icon: "fas fa-cog", label: "Settings" },
//     { to: "/focusMode", icon: "fas fa-eye", label: "Focus Mode" },
//     { to: "/tracker", icon: "fas fa-bullseye", label: "Tracker" },
//     { to: "/goals", icon: "fas fa-flag-checkered", label: "Goals" },
//     { to: "/tasks", icon: "fas fa-tasks", label: "Tasks" },
//     { to: "/habits", icon: "fas fa-dumbbell", label: "Habits" },
//     { to: "/distractions", icon: "fas fa-exclamation-triangle", label: "Distractions" },
//     { to: "/smart-scheduler", icon: "fas fa-brain", label: "Smart Scheduler" },
   
//      { to: "/feedback", icon: "fas fa-comment-dots", label: "Feedback" },
//     { to: "/", icon: "fas fa-sign-out-alt", label: "Logout" },
//   ];

//   const sidebarStyle = {
//     width: '250px',
//     height: '100vh',
//     background: 'linear-gradient(145deg, #1f1c2c, #928DAB)',
//     color: '#fff',
//     padding: '30px 22px',
//     position: 'fixed',
//     overflowY: 'auto',
//     display: 'flex',
//     flexDirection: 'column',
//     backdropFilter: 'blur(18px)',
//     borderRight: '1px solid rgba(255,255,255,0.1)',
//     zIndex: 999,
//     fontFamily: 'Poppins, sans-serif',
//     boxShadow: '8px 0 30px rgba(0,0,0,0.6)',
//   };

//   const logoStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     marginBottom: '40px',
//     textDecoration: 'none',
//     color: '#fff',
//     borderBottom: '2px dashed #9be7ff',
//     paddingBottom: '18px',
//   };

//   const logoTextStyle = {
//     margin: 0,
//     fontWeight: '700',
//     fontSize: '22px',
//     letterSpacing: '1px',
//     background: 'linear-gradient(to right, #00f2fe, #7a7aff)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//   };

//   const linkStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     padding: '12px 18px',
//     color: '#e0e0e0',
//     textDecoration: 'none',
//     borderRadius: '14px',
//     marginBottom: '14px',
//     transition: 'all 0.4s ease',
//     fontSize: '15.5px',
//     fontWeight: 500,
//   };

//   const activeLinkStyle = {
//     background: 'linear-gradient(to right, #654ea3, #eaafc8)',
//     color: '#fff',
//     fontWeight: 'bold',
//     boxShadow: '0 0 16px rgba(178, 122, 255, 0.6)',
//   };

//   const iconStyle = {
//     marginRight: '15px',
//     fontSize: '17px',
//     width: '24px',
//     textAlign: 'center',
//   };

//   const handleHover = (e, isActive) => {
//     if (!isActive) {
//       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
//       e.currentTarget.style.transform = 'translateX(6px)';
//       e.currentTarget.style.boxShadow = '0 0 10px rgba(255,255,255,0.08)';
//     }
//   };

//   const handleLeave = (e, isActive) => {
//     if (!isActive) {
//       e.currentTarget.style.background = 'transparent';
//       e.currentTarget.style.transform = 'translateX(0px)';
//       e.currentTarget.style.boxShadow = 'none';
//     }
//   };

//   const feedbackButtonStyle = {
//     marginTop: 'auto',
//     padding: '13px 24px',
//     borderRadius: '12px',
//     background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
//     border: 'none',
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: '15px',
//     cursor: 'pointer',
//     boxShadow: '0 6px 16px rgba(255, 105, 135, 0.4)',
//     transition: 'all 0.3s ease',
//     width: '100%',
//     textAlign: 'center',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: '10px',
//   };

  
//   return (
//     <div style={sidebarStyle}>
//       <Link to="/" style={logoStyle}>
//         <img
//           src="/images/logo1.jpg"
//           alt="Logo"
//           width="48"
//           height="48"
//           className="rounded-circle border border-info"
//           style={{ marginRight: '14px' }}
//         />
//         <h5 style={logoTextStyle}>Schedule Planner</h5>
//       </Link>

//       <div style={{ flexGrow: 1 }}>
//         {navItems.map((item, index) => {
//           const isActive = location.pathname === item.to;
//           return (
//             <Link
//               key={index}
//               to={item.to}
//               style={{
//                 ...linkStyle,
//                 ...(isActive ? activeLinkStyle : {}),
//               }}
//               onMouseEnter={(e) => handleHover(e, isActive)}
//               onMouseLeave={(e) => handleLeave(e, isActive)}
//             >
//               <i className={item.icon} style={iconStyle}></i>
//               {item.label}
//             </Link>
//           );
//         })}
//       </div>

//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/LoginSlice';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handle = ()=>{
    dispatch(setUser({token:null,flag:false}));
    navigate("/");
  }

  const navItems = [
    { to: "/dashboard", icon: "fas fa-chart-line", label: "Dashboard" },
    { to: "/calendar", icon: "fas fa-calendar-alt", label: "Calendar" },
    { to: "/notifications", icon: "fas fa-bell", label: "Notifications" },
    { to: "/reports", icon: "fas fa-chart-pie", label: "Reports" },
    { to: "/profile", icon: "fas fa-user", label: "Profile" },
    { to: "/settings", icon: "fas fa-cog", label: "Settings" },
    { to: "/focusMode", icon: "fas fa-eye", label: "Focus Mode" },
    { to: "/tracker", icon: "fas fa-bullseye", label: "Tracker" },
    { to: "/goals", icon: "fas fa-flag-checkered", label: "Goals" },
    { to: "/tasks", icon: "fas fa-tasks", label: "Tasks" },
    { to: "/habits", icon: "fas fa-dumbbell", label: "Habits" },
    { to: "/distractions", icon: "fas fa-exclamation-triangle", label: "Distractions" },
    { to: "/smart-scheduler", icon: "fas fa-brain", label: "Smart Scheduler" },
    { to: "/feedback", icon: "fas fa-comment-dots", label: "Feedback" },
    { to: "",action:handle, icon: "fas fa-sign-out-alt", label: "Logout" },
  ];

  const sidebarStyle = {
    width: '250px',
    height: '100vh',
    background: 'linear-gradient(150deg, #232526, #414345)',
    color: '#fff',
    padding: '30px 22px',
    position: 'fixed',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid rgba(255,255,255,0.1)',
    zIndex: 999,
    fontFamily: 'Poppins, sans-serif',
    backdropFilter: 'blur(12px)',
    boxShadow: '10px 0 40px rgba(0,0,0,0.4)',
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '35px',
    textDecoration: 'none',
    color: '#fff',
    borderBottom: '2px dashed #9be7ff',
    paddingBottom: '18px',
  };

  const logoTextStyle = {
    margin: 0,
    fontWeight: 700,
    fontSize: '20px',
    letterSpacing: '1px',
    background: 'linear-gradient(to right, #00f2fe, #4facfe)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    color: '#cfd8dc',
    textDecoration: 'none',
    borderRadius: '12px',
    marginBottom: '12px',
    transition: 'all 0.4s ease',
    fontSize: '15.5px',
    fontWeight: 500,
    position: 'relative',
  };

  const activeLinkStyle = {
    background: 'linear-gradient(to right,rgb(127, 228, 168),rgb(141, 176, 181))',
    color: '#fff',
    fontWeight: 'bold',
    boxShadow: '0 0 16px rgba(162, 106, 222, 0.5)',
    transform: 'translateX(8px)',
  };

  const iconStyle = {
    marginRight: '14px',
    fontSize: '17px',
    width: '24px',
    textAlign: 'center',
  };

  const handleHover = (e, isActive) => {
    if (!isActive) {
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
      e.currentTarget.style.transform = 'translateX(6px)';
      e.currentTarget.style.boxShadow = '0 0 10px rgba(255,255,255,0.1)';
    }
  };

  const handleLeave = (e, isActive) => {
    if (!isActive) {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.transform = 'translateX(0px)';
      e.currentTarget.style.boxShadow = 'none';
    }
  };

  return (
    <div style={sidebarStyle}>
      <Link to="/" style={logoStyle}>
        <img
          src="/images/logo1.jpg"
          alt="Logo"
          width="48"
          height="48"
          className="rounded-circle border border-info"
          style={{ marginRight: '12px' }}
        />
        <h5 style={logoTextStyle}>Schedule Planner</h5>
      </Link>

      <div style={{ flexGrow: 1 }}>
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={index}
              to={item.to}
              onClick={item.action}
              style={{
                ...linkStyle,
                ...(isActive ? activeLinkStyle : {}),
              }}
              onMouseEnter={(e) => handleHover(e, isActive)}
              onMouseLeave={(e) => handleLeave(e, isActive)}
            >
              <i className={item.icon} style={iconStyle}></i>
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
