// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { BsCheckCircle, BsPencilFill, BsTrashFill } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import axios from "axios";

// export default function Habits() {
//   const [habits, setHabits] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editingHabit, setEditingHabit] = useState(null);
//   const [title, setTitle] = useState("");
//   const [streak, setStreak] = useState(0);
//   const [fusion, setFusion] = useState(false);
//   const [showToast, setShowToast] = useState(false);
//     const [list ,setList]=useState([]);
//     const {token} = useSelector((store)=>store.LoginToken);

//   useEffect(() => {
//     const hab = async ()=>{
//       try{
//           let res= await axios.get("http://localhost:5000/habits",{headers:{Authorization:`Bearer ${token}`}});
//           if(res.status===200){
//             console.log(res);
//           } 
//       }
//       catch(err){
//       console.log(err)
//       }

//       hab();
//     }

//     const stored = JSON.parse(localStorage.getItem("habits") || "[]");
//     setHabits(stored);
//   }, []);

//   const saveHabits = (newHabits) => {
//     localStorage.setItem("habits", JSON.stringify(newHabits));
//     setHabits(newHabits);
//   };

//   const openAddModal = () => {
//     setEditingHabit(null);
//     setTitle("");
//     setStreak(0);
//     setFusion(false);
//     setModalOpen(true);
//   };

//   const openEditModal = (habit) => {
//     setEditingHabit(habit);
//     setTitle(habit.title);
//     setStreak(habit.streak);
//     setFusion(habit.fusion);
//     setModalOpen(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this habit?")) {
//       const updated = habits.filter((h) => h.id !== id);
//       saveHabits(updated);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!title.trim()) return alert("Please enter a habit title.");

//     const newHabit = {
//       id: editingHabit ? editingHabit.id : Date.now().toString(),
//       title: title.trim(),
//       streak: Number(streak),  // ensure number type
//       fusion,
//     };

//     const updated = editingHabit
//       ? habits.map((h) => (h.id === editingHabit.id ? newHabit : h))
//       : [...habits, newHabit];

//     saveHabits(updated);
//     setModalOpen(false);
//     setShowToast(true);

//     // Auto hide toast after 3 seconds
//     setTimeout(() => setShowToast(false), 3000);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         marginLeft: "250px",
//         background: "linear-gradient(to right top, #fef9f9, #e3f2fd)",
//         padding: "40px 30px",
//       }}
//     >
//       <style>{`
//         .habit-card {
//           background: linear-gradient(135deg, #f9fbe7, #e3f2fd);
//           border-radius: 20px;
//           transition: all 0.3s ease-in-out;
//           box-shadow: 0 4px 8px rgba(0,0,0,0.1);
//         }
//         .habit-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 20px rgba(0,0,0,0.2);
//         }
//         .add-btn {
//           background: linear-gradient(to right, #00bcd4, #2196f3);
//           border: none;
//         }
//         .add-btn:hover {
//           background: linear-gradient(to right, #2196f3, #00bcd4);
//         }
//         .modal-content {
//           border-radius: 20px;
//         }
//         .btn-gradient {
//           background: linear-gradient(to right, #2196f3, #00bcd4);
//           color: white;
//           border: none;
//         }
//         .btn-gradient:hover {
//           background: linear-gradient(to right, #00bcd4, #2196f3);
//         }
//         .toast-body {
//           font-size: 1rem;
//         }
//       `}</style>

//       <div className="container-fluid">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <h2 className="fw-bold text-success"> Habit Tracker</h2>
//           <button
//             className="btn add-btn fw-semibold text-white px-4 py-2"
//             onClick={openAddModal}
//           >
//             + Add Habit
//           </button>
//         </div>

//         {habits.length === 0 ? (
//           <div className="alert alert-info text-center fs-5">
//             🚫 No habits found. Start by adding one!
//           </div>
//         ) : (
//           <div className="row">
//             {habits.map((habit) => (
//               <div className="col-md-6 col-lg-4" key={habit.id}>
//                 <div className="card habit-card mb-4 p-3">
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold text-dark mb-2">
//                       {habit.title}
//                     </h5>
//                     <p className="mb-2 text-muted">
//                       🔥 Streak: <strong>{habit.streak}</strong> day
//                       {habit.streak !== 1 && "s"}
//                     </p>
//                     {habit.fusion && (
//                       <span className="badge bg-success mb-2">
//                         <BsCheckCircle className="me-1" />
//                         Task Fused
//                       </span>
//                     )}
//                     <div className="d-flex justify-content-end gap-2 mt-2">
//                       <button
//                         className="btn btn-sm btn-outline-primary"
//                         onClick={() => openEditModal(habit)}
//                       >
//                         <BsPencilFill /> Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-outline-danger"
//                         onClick={() => handleDelete(habit.id)}
//                       >
//                         <BsTrashFill /> Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {modalOpen && (
//         <div
//           className="modal show d-block"
//           tabIndex="-1"
//           style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
//           onClick={() => setModalOpen(false)}
//           onKeyDown={(e) => e.key === "Escape" && setModalOpen(false)}
//           role="dialog"
//           aria-modal="true"
//         >
//           <div
//             className="modal-dialog"
//             onClick={(e) => e.stopPropagation()}
//             style={{ maxWidth: "400px" }}
//           >
//             <div className="modal-content shadow-lg">
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-header bg-primary text-white rounded-top">
//                   <h5 className="modal-title">
//                     {editingHabit ? "Edit Habit" : "Add Habit"}
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setModalOpen(false)}
//                     aria-label="Close"
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">Habit Title</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={title}
//                       onChange={(e) => setTitle(e.target.value)}
//                       required
//                       placeholder="e.g. Morning Walk"
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Streak (days)</label>
//                     <input
//                       type="number"
//                       className="form-control"
//                       value={streak}
//                       min={0}
//                       onChange={(e) => setStreak(Number(e.target.value))}
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Fusion with Task</label>
//                     <select
//                       className="form-select"
//                       value={fusion}
//                       onChange={(e) => setFusion(e.target.value === "true")}
//                     >
//                       <option value="false">No</option>
//                       <option value="true">Yes</option>
//                     </select>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setModalOpen(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-gradient px-3">
//                     Save Habit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Toast */}
//       {showToast && (
//         <div
//           className="position-fixed bottom-0 end-0 p-3"
//           style={{ zIndex: 11, maxWidth: "320px" }}
//         >
//           <div
//             className="toast align-items-center text-white bg-info border-0 show"
//             role="alert"
//             aria-live="assertive"
//             aria-atomic="true"
//           >
//             <div className="d-flex">
//               <div className="toast-body fw-bold"> Habit saved successfully!</div>
//               <button
//                 type="button"
//                 className="btn-close btn-close-white me-2 m-auto"
//                 onClick={() => setShowToast(false)}
//                 aria-label="Close"
//               ></button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { BsCheckCircle, BsPencilFill, BsTrashFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import api from "../../api/axiosInstance";

export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [title, setTitle] = useState("");
  const [streak, setStreak] = useState(0);
  const [fusion, setFusion] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { token } = useSelector((store) => store.LoginToken);

  useEffect(() => {
    const getHabits = async () => {
      try {
        const res = await api.get("/habits");
        if (res.status === 200) {
          setHabits(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getHabits();
  }, [token]);

  // const saveHabits =async (newHabits) => {
  //    try{
  //     if(!editingHabit){
  //       const res = await axios.post("http://localhost:5000/habits",
  //          {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //       );
  //     }
    
  //    }
  //    catch(err){
  //     console.log(err);
  //    }
  //   setHabits(newHabits);
  // };
  const saveHabits = async (newHabits) => {
  try {
    if (editingHabit) {
      // PUT for update
      await api.put(
        `/habits/${editingHabit._id}`,
        {
          title,
          streak,
          fusion,
        }
      );
    } else {
      // POST for new
      await api.post(
        "/habits",
        {
          title,
          streak,
          fusion,
        }
      );
    }

    const res = await api.get("/habits");
    setHabits(res.data);
  } catch (err) {
    console.error(err);
  }
};


  const openAddModal = () => {
    setEditingHabit(null);
    setTitle("");
    setStreak(0);
    setFusion(false);
    setModalOpen(true);
  };

  const openEditModal = (habit) => {
    setEditingHabit(habit);
    setTitle(habit.title);
    setStreak(habit.streak);
    setFusion(habit.fusion);
    setModalOpen(true);
  };

  const handleDelete = async(id) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      const updated = habits.filter((h) => h.id !== id);
      try{
        let res =await api.delete(`/habits/${id}`)
        if(res.status === 200){
          alert("delete");
        }
         const res2 = await api.get("/habits");
    setHabits(res2.data);
      }
      catch(err){
        console.log(err)
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Please enter a habit title.");

    const newHabit = {
      id: editingHabit ? editingHabit.id : Date.now().toString(),
      title: title.trim(),
      streak: Number(streak),
      fusion,
    };

    const updated = editingHabit
      ? habits.map((h) => (h.id === editingHabit.id ? newHabit : h))
      : [...habits, newHabit];

    saveHabits(updated);
    setModalOpen(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        marginLeft: "250px",
        backgroundImage: `url("images/habit1.avif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "40px 30px",
      }}
    >
      {/* ✅ CSS Styling */}
      <style>{`
        .habit-card {
          background: rgba(198, 242, 233, 0.75);
          border-radius: 20px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease-in-out;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }

        .habit-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .add-btn {
          background: linear-gradient(135deg,rgb(68, 187, 219), #0072ff);
          border: none;
          box-shadow: 0 4px 12px rgba(0, 114, 255, 0.4);
        }

        .add-btn:hover {
          background: linear-gradient(135deg, #0072ff, #00c6ff);
        }

        .modal-content {
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(8px);
        }

        .btn-gradient {
          background: linear-gradient(to right, #2196f3, #00bcd4);
          color: white;
          border: none;
        }

        .btn-gradient:hover {
          background: linear-gradient(to right, #00bcd4, #2196f3);
        }

        .toast-body {
          font-size: 1rem;
        }
      `}</style>

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-white shadow"> Habit Tracker</h2>
        <button className="btn add-btn text-white px-4 py-2" onClick={openAddModal}>
          + Add Habit
        </button>
      </div>

      {/* Habit List */}
      {habits.length === 0 ? (
        <div className="alert alert-light text-center fs-5 shadow">
          🚫 No habits found. Start by adding one!
        </div>
      ) : (
        <div className="row">
          {habits.map((habit) => (
            <div className="col-md-6 col-lg-4" key={habit.id}>
              <div className="card habit-card mb-4 p-3">
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark mb-2">{habit.title}</h5>
                  <p className="mb-2 text-muted">
                    🔥 Streak: <strong>{habit.streak}</strong> day{habit.streak !== 1 && "s"}
                  </p>
                  {habit.fusion && (
                    <span className="badge bg-success mb-2">
                      <BsCheckCircle className="me-1" />
                      Task Fused
                    </span>
                  )}
                  <div className="d-flex justify-content-end gap-2 mt-2">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openEditModal(habit)}
                    >
                      <BsPencilFill /> Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(habit._id)}
                    >
                      <BsTrashFill /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-dialog"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "400px" }}
          >
            <div className="modal-content shadow-lg">
              <form onSubmit={handleSubmit}>
                <div className="modal-header bg-primary text-white rounded-top">
                  <h5 className="modal-title">
                    {editingHabit ? "Edit Habit" : "Add Habit"}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setModalOpen(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Habit Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                      placeholder="e.g. Drink Water"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Streak (days)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={streak}
                      min={0}
                      onChange={(e) => setStreak(Number(e.target.value))}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Fusion with Task</label>
                    <select
                      className="form-select"
                      value={fusion}
                      onChange={(e) => setFusion(e.target.value === "true")}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-gradient px-3">
                    Save Habit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {showToast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 11, maxWidth: "320px" }}
        >
          <div className="toast align-items-center text-white bg-info border-0 show">
            <div className="d-flex">
              <div className="toast-body fw-bold">Habit saved successfully!</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setShowToast(false)}
                aria-label="Close"
              ></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
