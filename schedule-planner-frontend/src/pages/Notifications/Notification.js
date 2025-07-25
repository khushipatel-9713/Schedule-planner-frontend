// import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const notificationData = [
//   { id: 1, icon: "📅", type: "task", title: "Upcoming Task", message: "Finish UI design today", time: "10 mins ago", read: false },
//   { id: 2, icon: "💧", type: "habit", title: "Habit Reminder", message: "Drink at least 2L water", time: "30 mins ago", read: false },
//   { id: 3, icon: "🎯", type: "goal", title: "Goal Progress", message: "You’re 50% through your Study Plan!", time: "1 hour ago", read: true },
//   { id: 4, icon: "📈", type: "tracker", title: "Tracker Alert", message: "Your productivity is up 12%", time: "Today, 9:00 AM", read: true },
//   { id: 5, icon: "⏱️", type: "time", title: "Time Tracker", message: "You spent 2 hrs on Reading", time: "Yesterday", read: true },
//   { id: 6, icon: "🧠", type: "schedule", title: "Smart Schedule", message: "A new plan is ready based on your tasks", time: "2 hours ago", read: false },
//   { id: 7, icon: "📊", type: "report", title: "Weekly Report", message: "Your focus score improved 15%", time: "Sunday", read: true },
// ];

// const typeStyles = {
//   task: "bg-task",
//   habit: "bg-habit",
//   goal: "bg-goal",
//   tracker: "bg-tracker",
//   time: "bg-time",
//   schedule: "bg-schedule",
//   report: "bg-report",
// };

// export default function Notifications() {
//   const [filter, setFilter] = useState("all");
//   const [notifications, setNotifications] = useState(notificationData);

//   useEffect(() => {
//     const style = document.createElement("style");
//     style.innerHTML = `
//       body {
//         margin: 0;
//         font-family: 'Segoe UI', sans-serif;
//         background-color: #1e1e2f;
//       }
//       .notif-container {
//         margin-left: 290px;
//         margin-top: 5px;
//         padding: 30px;
//         max-width: 850px;
//         background: rgba(85, 92, 109, 0.86);
//         border-radius: 16px;
//         box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
//         color: #e0e0e0;
//         backdrop-filter: blur(10px);
//       }
//       h2 {
//         text-align: center;
//         color: #00ADB5;
//         margin-bottom: 30px;
//         font-weight: bold;
//       }
//       .notif-card {
//         display: flex;
//         align-items: center;
//         background: linear-gradient(135deg, #2f3144, #252636);
//         padding: 20px;
//         margin-bottom: 20px;
//         border-radius: 16px;
//         border: 1px solid rgba(255, 255, 255, 0.05);
//         transition: all 0.3s ease;
//         position: relative;
//         box-shadow: 0 0 15px rgba(0,0,0,0.3);
//       }
//       .notif-card:hover {
//         transform: scale(1.01);
//         background-color: #313452;
//       }
//       .notif-icon {
//         width: 50px;
//         height: 50px;
//         font-size: 24px;
//         border-radius: 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         margin-right: 20px;
//         color: #fff;
//       }
//       .text-muted {
//         font-size: 13px;
//         color: #aaa !important;
//         margin-top: 5px;
//       }
//       .filter-btns {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 12px;
//         justify-content: center;
//         margin-bottom: 30px;
//       }
//       .btn-custom {
//         border-radius: 20px;
//         padding: 8px 18px;
//         font-weight: 600;
//         background: #2a2c3b;
//         border: 1px solid #444;
//         color: #e0e0e0;
//         transition: all 0.3s ease;
//       }
//       .btn-custom:hover {
//         background: #00ADB5;
//         color: #fff;
//         border: 1px solid #00ADB5;
//       }
//       .top-actions {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         flex-wrap: wrap;
//         margin-bottom: 20px;
//       }

//       /* Individual icon colors */
//       .bg-task { background-color: #0d6efd; }
//       .bg-habit { background-color: #198754; }
//       .bg-goal { background-color: #ffc107; color: #000; }
//       .bg-tracker { background-color: #6f42c1; }
//       .bg-time { background-color: #0dcaf0; color: #000; }
//       .bg-schedule { background-color: #d63384; }
//       .bg-report { background-color: #fd7e14; color: #000; }

//       .mark-read {
//         position: absolute;
//         top: 10px;
//         right: 20px;
//         font-size: 14px;
//         color: #00ADB5;
//         cursor: pointer;
//       }

//       @media (max-width: 576px) {
//         .notif-container {
//           margin-left: 0;
//           padding: 20px;
//         }
//         .top-actions {
//           flex-direction: column;
//           align-items: flex-start;
//         }
//       }
//     `;
//     document.head.appendChild(style);
//     return () => document.head.removeChild(style);
//   }, []);

//   const filteredNotifications = notifications.filter((notif) => {
//     if (filter === "all") return true;
//     if (filter === "unread") return !notif.read;
//     return notif.type === filter;
//   });

//   const markAllRead = () => {
//     setNotifications(notifications.map(n => ({ ...n, read: true })));
//   };

//   const toggleRead = (id) => {
//     setNotifications(
//       notifications.map(n =>
//         n.id === id ? { ...n, read: !n.read } : n
//       )
//     );
//   };

//   return (
//     <div className="notif-container">
//       <div className="top-actions">
//         <h2> Notifications</h2>
//         <button className="btn btn-custom btn-sm" onClick={markAllRead}>
//           ✔️ Mark All as Read
//         </button>
//       </div>

//       <div className="filter-btns">
//         {["all", "unread", "task", "habit", "goal", "tracker", "time", "schedule", "report"].map((type) => (
//           <button key={type} className="btn btn-custom btn-sm" onClick={() => setFilter(type)}>
//             {type.charAt(0).toUpperCase() + type.slice(1)}
//           </button>
//         ))}
//       </div>

//       {filteredNotifications.map(({ id, icon, type, title, message, time, read }) => (
//         <div key={id} className="notif-card">
//           <div className={`notif-icon ${typeStyles[type]}`}>{icon}</div>
//           <div>
//             <strong>{title}:</strong> {message}
//             <div className="text-muted">{time}</div>
//           </div>
//           <span className="mark-read" onClick={() => toggleRead(id)}>
//             {read ? "📖 Read" : "📬 Unread"}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

const typeStyles = {
  task: "bg-task",
  habit: "bg-habit",
  goal: "bg-goal",
  tracker: "bg-tracker",
  time: "bg-time",
  schedule: "bg-schedule",
  report: "bg-report",
};

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const {token} = useSelector((store)=>store.LoginToken);

  // ✅ Fetch data from backend API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/notifications",{headers:{Authorization:`Bearer ${token}`}});
        const formatted = res.data.map(item => ({
          id: item._id,
          icon: item.icon || "🔔",
          type: item.type.toLowerCase(),
          title: item.title,
          message: item.message,
          time: item.time,
          read: item.read,
        }));
        setNotifications(formatted);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // ✅ Inject styles
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      body {
        margin: 0;
        font-family: 'Segoe UI', sans-serif;
        background-color: #1e1e2f;
      }
      .notif-container {
        margin-left: 290px;
        margin-top: 5px;
        padding: 30px;
        max-width: 850px;
        background: rgba(85, 92, 109, 0.86);
        border-radius: 16px;
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        color: #e0e0e0;
        backdrop-filter: blur(10px);
      }
      h2 {
        text-align: center;
        color: #00ADB5;
        margin-bottom: 30px;
        font-weight: bold;
      }
      .notif-card {
        display: flex;
        align-items: center;
        background: linear-gradient(135deg, #2f3144, #252636);
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 16px;
        border: 1px solid rgba(255, 255, 255, 0.05);
        transition: all 0.3s ease;
        position: relative;
        box-shadow: 0 0 15px rgba(0,0,0,0.3);
      }
      .notif-card:hover {
        transform: scale(1.01);
        background-color: #313452;
      }
      .notif-icon {
        width: 50px;
        height: 50px;
        font-size: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 20px;
        color: #fff;
      }
      .text-muted {
        font-size: 13px;
        color: #aaa !important;
        margin-top: 5px;
      }
      .filter-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        justify-content: center;
        margin-bottom: 30px;
      }
      .btn-custom {
        border-radius: 20px;
        padding: 8px 18px;
        font-weight: 600;
        background: #2a2c3b;
        border: 1px solid #444;
        color: #e0e0e0;
        transition: all 0.3s ease;
      }
      .btn-custom:hover {
        background: #00ADB5;
        color: #fff;
        border: 1px solid #00ADB5;
      }
      .top-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        margin-bottom: 20px;
      }

      .bg-task { background-color: #0d6efd; }
      .bg-habit { background-color: #198754; }
      .bg-goal { background-color: #ffc107; color: #000; }
      .bg-tracker { background-color: #6f42c1; }
      .bg-time { background-color: #0dcaf0; color: #000; }
      .bg-schedule { background-color: #d63384; }
      .bg-report { background-color: #fd7e14; color: #000; }

      .mark-read {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 14px;
        color: #00ADB5;
        cursor: pointer;
      }

      @media (max-width: 576px) {
        .notif-container {
          margin-left: 0;
          padding: 20px;
        }
        .top-actions {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  // ✅ Filter notifications
  const filteredNotifications = notifications.filter((notif) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notif.read;
    return notif.type === filter;
  });

  // ✅ Mark all as read
const markAllRead = async () => {
  try {
       const res = await api.put(
      "/notifications/mark-All-Read",
      {}
    );

    // Update UI after successful server update
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    console.log(res.data.message); // optional: show toast or alert
  } catch (err) {
    console.error("Failed to mark all as read:", err);
  }
};

  // ✅ Toggle read/unread
 const toggleRead = async (id) => {
  try {
    const res = await api.put(`/api/notifications/${id}/toggle`,{});
    const updated = res.data;
    setNotifications(notifications.map(n => n.id === updated._id ? {
      ...n,
      read: updated.read
    } : n));
  } catch (err) {
    console.error("Failed to toggle read status:", err);
  }
};


  return (
    <div className="notif-container">
      <div className="top-actions">
        <h2> Notifications</h2>
        <button className="btn btn-custom btn-sm" onClick={markAllRead}>
          ✔️ Mark All as Read
        </button>
      </div>

      <div className="filter-btns">
        {["all", "unread", "task", "habit", "goal", "tracker", "time", "schedule", "report"].map((type) => (
          <button key={type} className="btn btn-custom btn-sm" onClick={() => setFilter(type)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {filteredNotifications.map(({ id, icon, type, title, message, time, read }) => (
        <div key={id} className="notif-card">
          <div className={`notif-icon ${typeStyles[type] || "bg-task"}`}>{icon}</div>
          <div>
            <strong>{title}:</strong> {message}
            <div className="text-muted">{time}</div>
          </div>
          <span className="mark-read" onClick={() => toggleRead(id)}>
            {read ? "📖 Read" : "📬 Unread"}
          </span>
        </div>
      ))}

      {filteredNotifications.length === 0 && (
        <p className="text-center mt-4">🚫 No notifications found for this filter.</p>
      )}
    </div>
  );
}
