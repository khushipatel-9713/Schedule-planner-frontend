// import React, { useState, useRef, useEffect } from 'react';
// import * as bootstrap from 'bootstrap';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Goals = () => {
//   const [goals, setGoals] = useState({});
//   const [title, setTitle] = useState('');
//   const [milestones, setMilestones] = useState('');
//   const successSound = useRef(null);
//   const [list,setList] = useState([]);
//  const {token} = useSelector((store)=>store.LoginToken)
//   useEffect(() => {
//     successSound.current = new Audio('/sounds/success.mp3'); 
//     const goal = async ()=>{
//       try{
//          let res = await axios.get("http://localhost:5000/api/goals/get",{headers:{Authorization:`Bearer ${token}`}});
//          if(res.status===200){
//           console.log(res.data);
//           setList(res.data);
//          }
//       }
//       catch(err){
//          console.log(err)
//       }
//     }

//     goal(); 
//   }, []);

//   const openGoalModal = () => {
//     const modalEl = document.getElementById('goalModal');
//     const modal = new bootstrap.Modal(modalEl);
//     modal.show();
//   };

//   const saveGoal = async(e) => {
//     e.preventDefault();
//    const msArray = milestones.split(',').map(m => m.trim());

//     try{
//        let res = await axios.post(" http://localhost:5000/api/goals",{title,milestones:msArray},{headers:{Authorization:`Bearer ${token}`}});
//        if(res.status===200){
//         console.log(res.data);
//        }
//     }
//     catch(err){
//         console.log(err)
//     }

//     setTitle('');
//     setMilestones('');
//     bootstrap.Modal.getInstance(document.getElementById("goalModal")).hide();

//     successSound.current?.play().catch((err) => {
//       console.warn("Sound error:", err);
//     });
//   };



//    const handleCheck = (goalId, index) => {
//   const updatedList = list.map(goal => {
//     if (goal._id === goalId) { 
//       const newChecked = [...goal.checked];
//       newChecked[index] = !newChecked[index];
//       return { ...goal, checked: newChecked };
//     }
//     return goal;
//   });

//   setList(updatedList);
// };

//   const calculateProgress = (goal) => {
//     const checkedCount = goal.checked.filter(c => c).length;
//     return Math.floor((checkedCount / goal.milestones.length) * 100);
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         marginLeft: "250px",
//         background: "linear-gradient(to right,rgb(232, 237, 209), #f1f8e9)",
//         padding: "30px",
//         transition: "margin 0.3s ease"
//       }}
//     >
//       <div className="container">
//         <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
//           <h2 className="fw-bold" style={{ color: "#2e7d32" }}>
//             🌿 Your Smart Goals
//           </h2>
//           <button
//             onClick={openGoalModal}
//             className="btn fw-bold"
//             style={{
//               background: "linear-gradient(to right,rgb(185, 198, 235),rgb(109, 148, 238))",
//               color: "#1b5e20",
//               border: "1px solidrgb(10, 10, 10)",
//               borderRadius: "12px",              padding: "10px 20px",
//               boxShadow: "0 5px 10px rgba(0, 0, 0, 0.1)",
//               transition: "all 0.3s"
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.15)"}
//             onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.1)"}
//           >
//             + Add Goal
//           </button>
//         </div>

//         {list.length === 0 ? (
//           <div className="text-center bg-white rounded shadow-sm p-4 text-muted">
//             🎯 You have no goals yet. Let’s set one!
//           </div>
//         ) : (
//           list.map(goal => (
//             <div
//               key={goal.id}
//               className="p-4 mb-4 shadow-sm rounded-4"
//               style={{
//                background: "linear-gradient(to right,rgb(228, 240, 214),rgba(190, 222, 220, 0.92))",
//                 borderLeft: "6px solid #81c784",
              
//               }}
//             >
//               <div className="d-flex justify-content-between align-items-center mb-2">
//                 <h5 className="text-success fw-bold">{goal.title}</h5>
//                 <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">
//                   {calculateProgress(goal)}% Done
//                 </span>
//               </div>

//               {goal.milestones.map((m, index) => (
//                 <div key={index} className="form-check mb-2">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={goal.checked[index]}
//                     onChange={() => handleCheck(goal.id, index)}
//                     id={`${goal.id}_ms_${index}`}
//                   />
//                   <label
//                     className="form-check-label"
//                     htmlFor={`${goal.id}_ms_${index}`}
//                   >
//                     {m}
//                   </label>
//                 </div>
//               ))}

//               <div className="progress mt-3" style={{ height: "10px", borderRadius: "6px" }}>
//                 <div
//                   className="progress-bar"
//                   style={{
//                     width: `${calculateProgress(goal)}%`,
//                     background: "linear-gradient(to right, #aed581, #dce775)"
//                   }}
//                 ></div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Modal */}
//       <div
//         className="modal fade"
//         id="goalModal"
//         tabIndex="-1"
//         aria-hidden="true"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//       >
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content shadow-sm">
//             <form onSubmit={saveGoal}>
//               <div
//                 className="modal-header"
//                 style={{
//                   background: "linear-gradient(to right,rgb(172, 230, 176), #f1f8e9)",
//                   borderBottom: "1px solid #c8e6c9"
//                 }}
//               >
//                 <h5 className="modal-title text-dark">Add New Goal</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                 ></button>
//               </div>
//               <div className="modal-body bg-white">
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Goal Title</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     placeholder="e.g. Build Full-Stack App"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label fw-semibold">Milestones (comma-separated)</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={milestones}
//                     onChange={(e) => setMilestones(e.target.value)}
//                     placeholder="e.g. Setup Backend, Create API, Connect DB"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="modal-footer bg-light">
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn btn-success"
//                 >
//                   Save Goal
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Goals;
import React, { useState, useRef, useEffect } from 'react';
import * as bootstrap from 'bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import api from '../../api/axiosInstance';

const Goals = () => {
  const [title, setTitle] = useState('');
  const [milestones, setMilestones] = useState('');
  const [list, setList] = useState([]);
  const successSound = useRef(null);
  const { token } = useSelector((store) => store.LoginToken);

  useEffect(() => {
    successSound.current = new Audio('/sounds/success.mp3');
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await api.get('/goals/get');
      if (res.status === 200) {
        setList(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openGoalModal = () => {
    const modalEl = document.getElementById('goalModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  };

  const saveGoal = async (e) => {
    e.preventDefault();
    const msArray = milestones.split(',').map((m) => m.trim());
    try {
      const res = await api.post(
        '/goals',
        { title, milestones: msArray }
        
      );
      if (res.status === 200) {
        setList((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error(err);
    }

    setTitle('');
    setMilestones('');
    bootstrap.Modal.getInstance(document.getElementById('goalModal')).hide();
    successSound.current?.play().catch((err) => console.warn('Sound error:', err));
  };

const handleCheck = async (goalId, index) => {
  const goalToUpdate = list.find(goal => goal._id === goalId);
  if (!goalToUpdate) return;

  const newChecked = [...goalToUpdate.checked];
  newChecked[index] = !newChecked[index];

  try {
    const res = await api.put(
      `http://localhost:5000/goals/${goalId}`,
      {
        title: goalToUpdate.title,              
        milestones: goalToUpdate.milestones,
        checked: newChecked
      }
    );

    if (res.status === 200) {
      const updatedList = list.map((goal) =>
        goal._id === goalId ? { ...goal, checked: newChecked } : goal
      );
      setList(updatedList);
    }
  } catch (error) {
    console.error('Error updating goal:', error);
  }
};

  const calculateProgress = (goal) => {
    const checkedCount = goal.checked.filter((c) => c).length;
    return Math.floor((checkedCount / goal.milestones.length) * 100);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        marginLeft: '250px',
        background: `linear-gradient(to bottom right, rgba(66, 80, 82, 0.95), rgba(13, 31, 15, 0.9)), url('/images/goals-bg.jpg') no-repeat center/cover`,
        padding: '40px',
        color: '#2e7d32',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
          <h2 className="fw-bold" style={{ color: 'white', textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            🎯 Smart Goals Dashboard
          </h2>
          <button
            onClick={openGoalModal}
            className="btn fw-bold"
            style={{
              background: 'linear-gradient(to right,rgb(48, 158, 180),rgb(133, 181, 185))',
              color: '#1b5e20',
              borderRadius: '14px',
              padding: '12px 24px',
              fontSize: '1rem',
              boxShadow: '0 6px 10px rgba(1, 18, 10, 0.5)',
              border: 'none',
              transition: 'all 0.3s ease-in-out',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 10px 22px rgba(19, 88, 92, 0.6)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 6px 15px rgba(67, 107, 159, 0.5)')}
          >
            ➕ Add Goal
          </button>
        </div>

        {list.length === 0 ? (
          <div
            className="text-center p-5 rounded-4"
            style={{
              background: 'rgba(214, 236, 234, 0.7)',
              border: '1px solid #dcedc8',
              color: '#8e9e8c',
              fontStyle: 'italic',
            }}
          >
            🚀 No goals yet. Let’s get started!
          </div>
        ) : (
          list.map((goal) => (
            <div
              key={goal._id}
              className="p-4 mb-4 rounded-4"
              style={{
                background: '#ffffff',
                border: '1px solid #d0f0c0',
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 style={{ color: '#33691e' }}>{goal.title}</h5>
                <span className="badge text-dark bg-light px-3 py-2 rounded-pill border border-success">
                  {calculateProgress(goal)}% Done
                </span>
              </div>

              {goal.milestones.map((m, index) => (
                <div key={index} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={goal.checked[index]}
                    onChange={() => handleCheck(goal._id, index)}
                    id={`${goal._id}_ms_${index}`}
                  />
                  <label className="form-check-label" htmlFor={`${goal._id}_ms_${index}`}>
                    {m}
                  </label>
                </div>
              ))}

              <div className="progress mt-3" style={{ height: '10px', borderRadius: '6px' }}>
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-success"
                  style={{
                    width: `${calculateProgress(goal)}%`,
                  }}
                ></div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="goalModal"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4" style={{ background: '#ffffff', border: '1px solid #c8e6c9' }}>
            <form onSubmit={saveGoal}>
              <div className="modal-header border-0" style={{ backgroundColor: '#dcedc8' }}>
                <h5 className="modal-title text-dark">➕ Add New Goal</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Goal Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Master MERN Stack"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Milestones (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={milestones}
                    onChange={(e) => setMilestones(e.target.value)}
                    placeholder="e.g. Setup backend, build API, design frontend"
                    required
                  />
                </div>
              </div>
              <div className="modal-footer border-0 bg-light">
                <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;
