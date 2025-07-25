// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';

// const SmartScheduler = () => {
//   const [scheduleHtml, setScheduleHtml] = useState('');

//   const handleAction = (e, action) => {
//     const box = e.target.closest('.glass-box');
//     if (action === 'accept') {
//       box.style.borderLeft = '6px solid #28a745';
//       box.style.background = 'linear-gradient(to right, #e8f5e9, #d0f0d4)';
//     } else {
//       box.style.opacity = '0.5';
//     }
//   };

//   const generateSchedule = () => {
//     setScheduleHtml(`
//       <div class="glass-box animate__animated animate__fadeInUp">
//         <h5><i class="fas fa-lightbulb text-warning"></i> Suggested Task</h5>
//         <p><strong>9 AM - 11 AM:</strong> <span class="text-success">Finish React Project</span></p>
//         <div class="mt-2">
//           <button class="btn-accept me-2"><i class="fas fa-check"></i> Accept</button>
//           <button class="btn-reject"><i class="fas fa-times"></i> Reject</button>
//         </div>
//       </div>

//       <div class="glass-box animate__animated animate__fadeInUp animate__delay-1s">
//         <h5><i class="fas fa-brain text-primary"></i> AI Productivity Tip</h5>
//         <p><strong>4 PM - 6 PM:</strong> <span class="text-success">Java Interview Preparation</span></p>
//         <div class="mt-2">
//           <button class="btn-accept me-2"><i class="fas fa-check"></i> Accept</button>
//           <button class="btn-reject"><i class="fas fa-times"></i> Reject</button>
//         </div>
//       </div>

//       <h4 class="mt-5"><i class="fas fa-clock text-primary me-2"></i>Day Timeline</h4>
//       <div class="timeline">
//         <div class="event">🛏️ <strong>8 AM - 9 AM:</strong> Morning Routine</div>
//         <div class="event">💻 <strong>9 AM - 11 AM:</strong> Finish React Project (AI Suggested)</div>
//         <div class="event">🍽️ <strong>1 PM - 2 PM:</strong> Lunch Break</div>
//         <div class="event">📘 <strong>4 PM - 6 PM:</strong> Java Interview Prep (AI Suggested)</div>
//       </div>
//     `);
//   };

//   const handleClick = (e) => {
//     if (e.target.closest('.btn-accept')) {
//       handleAction(e, 'accept');
//     } else if (e.target.closest('.btn-reject')) {
//       handleAction(e, 'reject');
//     }
//   };

//   return (
//     <div className="smart-ai-page">
//       <div className="content-area text-center">
//         <h2 className="mb-4 animate__animated animate__fadeInDown">🤖 AI Smart Scheduler</h2>
//         <button className="btn-schedule mb-4 animate__animated animate__pulse animate__infinite" onClick={generateSchedule}>
//           <i className="fas fa-magic me-2"></i> Generate My Smart Plan
//         </button>
//         <div
//           id="scheduleArea"
//           className="mt-4"
//           dangerouslySetInnerHTML={{ __html: scheduleHtml }}
//           onClick={handleClick}
//         ></div>
//       </div>

//       <style>{`
//         @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

//         body {
//           margin: 0;
//           padding: 0;
//           font-family: 'Segoe UI', sans-serif;
//         }

//         .smart-ai-page {
//           margin-left: 250px;
//           padding: 40px 20px;
//           background: linear-gradient(to right,rgba(207, 232, 232, 0.9),rgba(183, 196, 225, 0.91));
//           min-height: 100vh;
//         }

//         .content-area {
//           max-width: 900px;
//           margin: auto;
//           background: rgba(207, 226, 226, 0.82);
//           padding: 40px 30px;
//           border-radius: 20px;
//           box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
//           backdrop-filter: blur(10px);
//         }

//         .glass-box {
//           background: linear-gradient(to right, #ffffff, #f7faff);
//           border-left: 6px solid #0d6efd;
//           border-radius: 15px;
//           padding: 25px;
//           margin: 25px auto;
//           max-width: 650px;
//           box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
//           transition: transform 0.3s ease;
//         }

//         .glass-box:hover {
//           transform: translateY(-4px);
//         }

//         .btn-schedule {
//           font-size: 1.1rem;
//           padding: 12px 35px;
//           border-radius: 30px;
//           background: linear-gradient(to right,rgb(96, 161, 134),rgb(218, 228, 156));
//           color: black;
//           border: none;
//           box-shadow: 0 6px 20px rgba(12, 13, 13, 0.5);
//           transition: all 0.3s ease;
//         }

//         .btn-schedule:hover {
//           background: linear-gradient(to right,rgb(100, 184, 72),rgb(77, 89, 196));
//         }

//         .btn-accept, .btn-reject {
//           font-size: 0.95rem;
//           padding: 6px 15px;
//           border-radius: 20px;
//           border: none;
//           transition: all 0.2s ease-in-out;
//           cursor: pointer;
//         }

//         .btn-accept {
//           background: linear-gradient(to right, #28a745, #45c06f);
//           color: white;
//         }

//         .btn-accept:hover {
//           background: linear-gradient(to right, #218838, #34d186);
//         }

//         .btn-reject {
//           background: linear-gradient(to right, #f8f9fa, #e0e0e0);
//           color: #333;
//         }

//         .btn-reject:hover {
//           background: linear-gradient(to right, #d6d6d6, #f0f0f0);
//         }

//         .timeline {
//           text-align: left;
//           padding-left: 30px;
//           border-left: 4px solidrgb(156, 176, 206);
//           margin-top: 30px;
//           color: #333;
//         }

//         .event {
//           margin-bottom: 15px;
//           font-size: 1.05rem;
//           position: relative;
//         }

//         .event::before {
//           content: '•';
//           color: #0d6efd;
//           font-size: 1.5rem;
//           position: absolute;
//           left: -18px;
//           top: 0;
//         }

//         h2 {
//           font-weight: 900;
//           background: linear-gradient(to right,rgb(133, 163, 211),rgb(138, 101, 197));
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SmartScheduler;
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const SmartScheduler = () => {
  const [scheduleHtml, setScheduleHtml] = useState('');
  const [acceptedTasks, setAcceptedTasks] = useState([]);
  const [rejectedTasks, setRejectedTasks] = useState([]);

  const handleAction = (e, action) => {
    const box = e.target.closest('.glass-box');
    const title = box.querySelector('h5')?.innerText;
    const timeText = box.querySelector('p strong')?.innerText;
    const taskText = box.querySelector('p span')?.innerText;
    const taskData = { title, time: timeText, task: taskText };

    if (action === 'accept') {
      box.style.borderLeft = '6px solid #28a745';
      box.style.background = 'linear-gradient(to right, #e8f5e9, #d0f0d4)';
      setAcceptedTasks(prev => [...prev, taskData]);
    } else {
      box.style.borderLeft = '6px solid #dc3545';
      box.style.background = 'linear-gradient(to right, #f8d7da, #f5c6cb)';
      setRejectedTasks(prev => [...prev, taskData]);
    }
  };

  const generateSchedule = () => {
    setScheduleHtml(`
      <div class="glass-box animate__animated animate__fadeInUp">
        <h5><i class="fas fa-lightbulb text-warning"></i> Suggested Task</h5>
        <p><strong>9 AM - 11 AM:</strong> <span class="text-success">Finish React Project</span></p>
        <div class="mt-2">
          <button class="btn-accept me-2"><i class="fas fa-check"></i> Accept</button>
          <button class="btn-reject"><i class="fas fa-times"></i> Reject</button>
        </div>
      </div>

      <div class="glass-box animate__animated animate__fadeInUp animate__delay-1s">
        <h5><i class="fas fa-brain text-primary"></i> AI Productivity Tip</h5>
        <p><strong>4 PM - 6 PM:</strong> <span class="text-success">Java Interview Preparation</span></p>
        <div class="mt-2">
          <button class="btn-accept me-2"><i class="fas fa-check"></i> Accept</button>
          <button class="btn-reject"><i class="fas fa-times"></i> Reject</button>
        </div>
      </div>

      <h4 class="mt-5"><i class="fas fa-clock text-primary me-2"></i>Day Timeline</h4>
      <table class="table table-striped table-bordered mt-3">
        <thead class="table-primary">
          <tr>
            <th>Time</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>8 AM - 9 AM</td>
            <td>🛏️ Morning Routine</td>
          </tr>
          <tr>
            <td>9 AM - 11 AM</td>
            <td>💻 Finish React Project (AI Suggested)</td>
          </tr>
          <tr>
            <td>1 PM - 2 PM</td>
            <td>🍽️ Lunch Break</td>
          </tr>
          <tr>
            <td>4 PM - 6 PM</td>
            <td>📘 Java Interview Prep (AI Suggested)</td>
          </tr>
        </tbody>
      </table>
    `);
  };

  const handleClick = (e) => {
    if (e.target.closest('.btn-accept')) {
      handleAction(e, 'accept');
    } else if (e.target.closest('.btn-reject')) {
      handleAction(e, 'reject');
    }
  };

  return (
    <div className="smart-ai-page">
      <div className="hero-image">
        <div className="hero-text">
          <h2 className="mb-4 animate__animated animate__fadeInDown"> AI Smart Scheduler</h2>
          <button className="btn-schedule mb-4 animate__animated animate__pulse animate__infinite" onClick={generateSchedule}>
            <i className="fas fa-magic me-2"></i> Generate My Smart Plan
          </button>
        </div>
      </div>
      <div className="content-area text-center">
        <div id="scheduleArea" className="mt-4" dangerouslySetInnerHTML={{ __html: scheduleHtml }} onClick={handleClick}></div>

        {(acceptedTasks.length > 0 || rejectedTasks.length > 0) && (
          <div className="mt-5">
            {acceptedTasks.length > 0 && (
              <>
                <h5 className="text-success mb-2"><i className="fas fa-check-circle me-2"></i>Accepted Tasks</h5>
                <table className="table table-bordered table-hover">
                  <thead className="table-success">
                    <tr>
                      <th>Title</th>
                      <th>Time</th>
                      <th>Task</th>
                    </tr>
                  </thead>
                  <tbody>
                    {acceptedTasks.map((task, index) => (
                      <tr key={index}>
                        <td>{task.title}</td>
                        <td>{task.time}</td>
                        <td>{task.task}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {rejectedTasks.length > 0 && (
              <>
                <h5 className="text-danger mt-4 mb-2"><i className="fas fa-times-circle me-2"></i>Rejected Tasks</h5>
                <table className="table table-bordered table-hover">
                  <thead className="table-danger">
                    <tr>
                      <th>Title</th>
                      <th>Time</th>
                      <th>Task</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedTasks.map((task, index) => (
                      <tr key={index}>
                        <td>{task.title}</td>
                        <td>{task.time}</td>
                        <td>{task.task}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>

      <style>{`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

        .smart-ai-page {
          margin-left: 250px;
          background: linear-gradient(to right, #f2f6fc, #dceeff);
          min-height: 100vh;
          font-family: 'Segoe UI', sans-serif;
        }

        .hero-image {
          background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0,0,0,0.5)), url('images/edit.jpg') center/cover no-repeat;
          height: 350px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: white;
        }

        .hero-text h2 {
          font-size: 2.5rem;
          font-weight: 800;
          text-shadow: 2px 2px 5px rgba(0,0,0,0.6);
        }

        .content-area {
          max-width: 950px;
          margin: -60px auto 0;
          background: rgba(255, 255, 255, 0.95);
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(15px);
        }

        .glass-box {
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
          border-left: 6px solid #0d6efd;
          border-radius: 15px;
          padding: 25px;
          margin: 25px auto;
          max-width: 650px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
          transition: transform 0.3s ease;
        }

        .glass-box:hover {
          transform: scale(1.02);
        }

        .btn-schedule {
          font-size: 1.1rem;
          padding: 12px 35px;
          border-radius: 30px;
          background: linear-gradient(to right, #48c6ef, #6f86d6);
          color: white;
          border: none;
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
          transition: all 0.3s ease;
        }

        .btn-schedule:hover {
          background: linear-gradient(to right, #6f86d6, #48c6ef);
        }

        .btn-accept, .btn-reject {
          font-size: 0.95rem;
          padding: 6px 15px;
          border-radius: 20px;
          border: none;
          transition: all 0.2s ease-in-out;
          cursor: pointer;
        }

        .btn-accept {
          background: linear-gradient(to right, #28a745, #45c06f);
          color: white;
        }

        .btn-accept:hover {
          background: linear-gradient(to right, #218838, #34d186);
        }

        .btn-reject {
          background: linear-gradient(to right, #dc3545, #e4606d);
          color: white;
        }

        .btn-reject:hover {
          background: linear-gradient(to right, #c82333, #d9534f);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th, td {
          padding: 12px 20px;
          text-align: left;
        }

        th {
          background-color: #dee9f7;
        }

        tr:nth-child(even) {
          background-color: #f3f6fb;
        }

        .event::before {
          content: '';
        }
      `}</style>
    </div>
  );
};

export default SmartScheduler;
