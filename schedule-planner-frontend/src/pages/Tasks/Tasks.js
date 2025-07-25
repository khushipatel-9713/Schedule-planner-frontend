// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Modal } from "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaSave,
//   FaTimes,
//   FaListUl,
//   FaSearch,
//   FaCheck,
// } from "react-icons/fa";
// import { useSelector } from "react-redux";

// export default function Tasks() {
//   const modalRef = useRef(null);
//   const [tasks, setTasks] = useState([]);
//   const [editingTask, setEditingTask] = useState(null);
//   const [activeTab, setActiveTab] = useState("All");
//   const [searchText, setSearchText] = useState("");
//   const bootstrapModal = useRef(null);
//   const {token}= useSelector((store)=>store.LoginToken);

//   useEffect(() => {
//     bootstrapModal.current = new Modal(modalRef.current);
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/tasks",{headers:{Authorization:`Bearer ${token}`}});
//       setTasks(res.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const openModal = (task = null) => {
//     setEditingTask(task);
//     bootstrapModal.current.show();
//   };

//   const closeModal = () => {
//     bootstrapModal.current.hide();
//     setEditingTask(null);
//   };

//   const saveTask = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const taskData = {
//       title: form.taskTitle.value,
//       description: form.taskDesc.value,
//       dueDate: form.taskDate.value || null,
//       priority: form.taskPriority.value,
//       completed: editingTask?.completed || false,
//     };
//     try {
//       if (editingTask) {
//         await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, taskData,{headers:{Authorization:`Bearer ${token}`}});
//       } else {
//         await axios.post("http://localhost:5000/api/tasks", taskData,{headers:{Authorization:`Bearer ${token}`}});
//       }
//       fetchTasks();
//       closeModal();
//     } catch (error) {
//       console.error("Error saving task:", error);
//     }
//   };

//   const deleteTask = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this task?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${id}`);
//       fetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const toggleComplete = async (task) => {
//     try {
//       await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
//         ...task,
//         completed: !task.completed,
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error toggling task completion:", error);
//     }
//   };

//   const getFilteredTasks = () => {
//     const todayStr = new Date().toISOString().slice(0, 10);
//     return tasks.filter((t) => {
//       const matchesTab =
//         activeTab === "Today"
//           ? t.dueDate === todayStr && !t.completed
//           : activeTab === "Upcoming"
//           ? t.dueDate && t.dueDate > todayStr && !t.completed
//           : activeTab === "Completed"
//           ? t.completed
//           : true;

//       const search = searchText.toLowerCase();
//       const matchesSearch =
//         t.title.toLowerCase().includes(search) ||
//         (t.description && t.description.toLowerCase().includes(search)) ||
//         (t.priority && t.priority.toLowerCase().includes(search));

//       return matchesTab && matchesSearch;
//     });
//   };

//   const filteredTasks = getFilteredTasks();

//   const tabOptions = [
//     { label: "All", icon: <FaListUl /> },
//     { label: "Today", icon: <FaCheck /> },
//     { label: "Upcoming", icon: <FaPlus /> },
//     { label: "Completed", icon: <FaCheck /> },
//   ];

//   return (
//     <div className="tasks-container px-4 pt-4 text-white" style={{ marginLeft: 250, minHeight: "100vh", backgroundColor: "#1e1e2f" }}>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-white d-flex align-items-center">
//           <FaListUl className="me-2 text-info" /> Task Manager
//         </h2>
//         <button className="btn btn-info shadow-sm" onClick={() => openModal(null)}>
//           <FaPlus className="me-1" /> Add Task
//         </button>
//       </div>

//       <div className="input-group mb-3 w-50 mx-auto">
//         <span className="input-group-text bg-white">
//           <FaSearch />
//         </span>
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search tasks..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//       </div>

//       <ul className="nav nav-pills mb-3 justify-content-center">
//         {tabOptions.map((tab) => (
//           <li className="nav-item me-2" key={tab.label}>
//             <button
//               className={`nav-link ${activeTab === tab.label ? "active" : ""}`}
//               onClick={() => setActiveTab(tab.label)}
//             >
//               {tab.icon} {tab.label}
//             </button>
//           </li>
//         ))}
//       </ul>

//       {filteredTasks.length === 0 ? (
//         <div className="alert alert-warning shadow-sm">
//           No tasks in "<strong>{activeTab}</strong>"
//         </div>
//       ) : (
//         <div className="row">
//           {filteredTasks.map((task) => {
//             const priorityColor =
//               task.priority === "High"
//                 ? "danger"
//                 : task.priority === "Medium"
//                 ? "warning"
//                 : "success";

//             return (
//               <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
//                <div
//   className={`border-start border-4 border-${priorityColor} p-3 rounded shadow task-card h-100 d-flex flex-column justify-content-between`}
//   style={{ backgroundColor: "#FFF8F8", color: "#1e1e2f" }}
// >
//                   <div>
//                     <h5 className={`mb-1 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>
//                       {task.title}
//                     </h5>
//                     <p className="mb-2 small">{task.description || "No description provided."}</p>
//                     <small className="text-light">
//                       📅 Due: {task.dueDate || "Not set"} | 🎯 Priority:{" "}
//                       <span className={`badge bg-${priorityColor}`}>{task.priority}</span>
//                     </small>
//                   </div>
//                   <div className="d-flex justify-content-between align-items-center mt-3">
//                     <div className="form-check">
//                       <input
//                         type="checkbox"
//                         className="form-check-input"
//                         checked={task.completed}
//                         onChange={() => toggleComplete(task)}
//                         id={`task-complete-${task._id}`}
//                       />
//                       <label className="form-check-label" htmlFor={`task-complete-${task._id}`}>
//                         Done
//                       </label>
//                     </div>
//                     <div>
//                       <button className="btn btn-sm btn-outline-light me-1" onClick={() => openModal(task)}>
//                         <FaEdit />
//                       </button>
//                       <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task._id)}>
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* Modal */}
//       <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <form onSubmit={saveTask}>
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">{editingTask ? "Edit Task" : "Add Task"}</h5>
//                 <button type="button" className="btn-close" onClick={closeModal}></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label htmlFor="taskTitle" className="form-label">Title</label>
//                   <input type="text" name="taskTitle" id="taskTitle" defaultValue={editingTask?.title || ""} className="form-control" required autoFocus />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="taskDesc" className="form-label">Description</label>
//                   <textarea name="taskDesc" id="taskDesc" defaultValue={editingTask?.description || ""} className="form-control" />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="taskDate" className="form-label">Due Date</label>
//                   <input type="date" name="taskDate" id="taskDate" defaultValue={editingTask?.dueDate ? editingTask.dueDate.slice(0, 10) : ""} className="form-control" />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="taskPriority" className="form-label">Priority</label>
//                   <select name="taskPriority" id="taskPriority" defaultValue={editingTask?.priority || "Medium"} className="form-select">
//                     <option value="High">High</option>
//                     <option value="Medium">Medium</option>
//                     <option value="Low">Low</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button type="button" className="btn btn-secondary" onClick={closeModal}>
//                   <FaTimes /> Cancel
//                 </button>
//                 <button type="submit" className="btn btn-success">
//                   <FaSave /> Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>

//     <style>{`
//   .task-card {
//     transition: all 0.3s ease;
//     border-radius: 1rem;
//     background-color: #ffffff;
//     color: #1e1e2f;
//   }

//   .task-card:hover {
//     background-color: #f0f9ff; /* Light blue hover */
//     box-shadow: 0 0 16px rgba(0, 123, 255, 0.3); /* Blue glow */
//     transform: translateY(-4px);
//   }

//   .form-control:focus, .form-select:focus {
//     box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
//     border-color: #86b7fe;
//   }

//   .btn-success {
//     background: linear-gradient(90deg,rgb(49, 196, 169),rgb(14, 62, 11));
//     border: none;
//   }

//   .modal-header.bg-primary {
//     background: linear-gradient(to right, #0066ff, #0099cc);
//   }
// `}</style>

//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import api from "../../api/axiosInstance";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaListUl,
  FaSearch,
  FaCheck,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Tasks() {
  const modalRef = useRef(null);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [searchText, setSearchText] = useState("");
  const bootstrapModal = useRef(null);
  const { token } = useSelector((store) => store.LoginToken);

  // Sound for task added
  const successAudio = useRef(null);

  useEffect(() => {
    bootstrapModal.current = new Modal(modalRef.current);
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const openModal = (task = null) => {
    setEditingTask(task);
    bootstrapModal.current.show();
  };

  const closeModal = () => {
    bootstrapModal.current.hide();
    setEditingTask(null);
  };

  const saveTask = async (e) => {
    e.preventDefault();
    const form = e.target;
    const taskData = {
      title: form.taskTitle.value,
      description: form.taskDesc.value,
      dueDate: form.taskDate.value || null,
      priority: form.taskPriority.value,
      completed: editingTask?.completed || false,
    };
    try {
      if (editingTask) {
        await api.put(`/tasks/${editingTask._id}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post("/tasks", taskData);
        // Play sound only when a new task is added
        if (successAudio.current) {
          successAudio.current.play();
        }
      }
      fetchTasks();
      closeModal();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await api.put(
        `/tasks/${task._id}`,
        { ...task, completed: !task.completed }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error toggling task completion:", error);
    }
  };

  const getFilteredTasks = () => {
    const todayStr = new Date().toISOString().slice(0, 10);
    return tasks.filter((t) => {
      const matchesTab =
        activeTab === "Today"
          ? t.dueDate === todayStr && !t.completed
          : activeTab === "Upcoming"
          ? t.dueDate && t.dueDate > todayStr && !t.completed
          : activeTab === "Completed"
          ? t.completed
          : true;

      const search = searchText.toLowerCase();
      const matchesSearch =
        t.title.toLowerCase().includes(search) ||
        (t.description && t.description.toLowerCase().includes(search)) ||
        (t.priority && t.priority.toLowerCase().includes(search));

      return matchesTab && matchesSearch;
    });
  };

  const filteredTasks = getFilteredTasks();

  const tabOptions = [
    { label: "All", icon: <FaListUl /> },
    { label: "Today", icon: <FaCheck /> },
    { label: "Upcoming", icon: <FaPlus /> },
    { label: "Completed", icon: <FaCheck /> },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        marginLeft: "250px",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("/images/task1.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 30px",
      }}
    >
      {/* Hidden audio tag */}
      <audio ref={successAudio} src="/sounds/success.mp3" preload="auto" />

      <style>{`
        .task-card {
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.85), rgba(240, 240, 240, 0.9));
          backdrop-filter: blur(10px);
          border-radius: 1rem;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          color: #1e1e2f;
        }
        .task-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
        .btn-custom-add {
          background: linear-gradient(135deg,rgb(68, 187, 219), #0072ff);
          border: none;
          box-shadow: 0 4px 12px rgba(0, 114, 255, 0.4);
          color: #000;
          font-weight: bold;
          border-radius: 10px;
          padding: 10px 20px;
          transition: all 0.3s ease;
        }
        .btn-custom-add:hover {
          background: linear-gradient(135deg,rgb(114, 79, 188),rgb(100, 65, 188));
          transform: scale(1.03);
        }
      `}</style>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark d-flex align-items-center">
          <FaListUl className="me-2 text-info" /> Task Manager
        </h2>
        <button className="btn-custom-add" onClick={() => openModal(null)}>
          <FaPlus className="me-1" /> Add Task
        </button>
      </div>

      <div className="input-group mb-4 w-50 mx-auto shadow">
        <span className="input-group-text bg-white">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search tasks..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <ul className="nav nav-pills mb-4 justify-content-center">
        {tabOptions.map((tab) => (
          <li className="nav-item me-2" key={tab.label}>
            <button
              className={`nav-link ${activeTab === tab.label ? "active" : ""}`}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.icon} {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {filteredTasks.length === 0 ? (
        <div className="alert alert-warning shadow text-center fs-5">
          No tasks in "<strong>{activeTab}</strong>"
        </div>
      ) : (
        <div className="row">
          {filteredTasks.map((task) => {
            const priorityColor =
              task.priority === "High"
                ? "danger"
                : task.priority === "Medium"
                ? "warning"
                : "success";

            return (
              <div className="col-md-6 col-lg-4 mb-4" key={task._id}>
                <div className="p-3 task-card shadow-sm h-100 d-flex flex-column justify-content-between">
                  <div>
                    <h5 className={`mb-2 ${task.completed ? "text-decoration-line-through text-muted" : ""}`}>
                      {task.title}
                    </h5>
                    <p className="mb-2 small">{task.description || "No description provided."}</p>
                    <small className="text-dark">
                      📅 Due: {task.dueDate || "Not set"} | 🎯 Priority:{" "}
                      <span className={`badge bg-${priorityColor}`}>{task.priority}</span>
                    </small>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={task.completed}
                        onChange={() => toggleComplete(task)}
                        id={`task-complete-${task._id}`}
                      />
                      <label className="form-check-label" htmlFor={`task-complete-${task._id}`}>
                        Done
                      </label>
                    </div>
                    <div>
                      <button className="btn btn-sm btn-outline-primary me-1" onClick={() => openModal(task)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => deleteTask(task._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      <div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={saveTask}>
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">{editingTask ? "Edit Task" : "Add Task"}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="taskTitle" className="form-label">Title</label>
                  <input type="text" name="taskTitle" id="taskTitle" defaultValue={editingTask?.title || ""} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="taskDesc" className="form-label">Description</label>
                  <textarea name="taskDesc" id="taskDesc" defaultValue={editingTask?.description || ""} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="taskDate" className="form-label">Due Date</label>
                  <input type="date" name="taskDate" id="taskDate" defaultValue={editingTask?.dueDate?.slice(0, 10) || ""} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="taskPriority" className="form-label">Priority</label>
                  <select name="taskPriority" id="taskPriority" defaultValue={editingTask?.priority || "Medium"} className="form-select">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  <FaTimes /> Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  <FaSave /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
