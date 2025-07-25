// import React, { useEffect, useRef, useState } from 'react';
// import Chart from 'chart.js/auto';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const Reports = () => {
//   const reportRef = useRef();
//   const [weeklyData, setWeeklyData] = useState([]);
//   const [categoryData, setCategoryData] = useState([]);
//   const [timeData, setTimeData] = useState([]);
//   const {token} = useSelector((store)=>store.LoginToken);

 

//   useEffect(() => {
//     const fetchReport = async () => {
//       try {
//         const res = await axios.get(`http://localhost:5000/reports/weekly`, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         const data = await res.json();
//         setWeeklyData(data.weeklyData);
//         setCategoryData(data.categoryData);
//         setTimeData(data.timeData);
//       } catch (err) {
//         console.error("Report fetch failed", err);
//       }
//     };

//     fetchReport();
//   }, []);

//   useEffect(() => {
//     if (!weeklyData.length || !categoryData.length || !timeData.length) return;

//     const destroyAllCharts = Chart.instances || Chart._instances || [];
//     Object.values(destroyAllCharts).forEach(chart => chart?.destroy?.());

//     const weeklyCtx = document.getElementById('weeklyChart');
//     const categoryCtx = document.getElementById('categoryChart');
//     const timeCtx = document.getElementById('timeChart');

//     new Chart(weeklyCtx, {
//       type: 'bar',
//       data: {
//         labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         datasets: [{
//           label: 'Hours Focused',
//           data: weeklyData,
//           backgroundColor: '#4682A9',
//           borderRadius: 10,
//           maxBarThickness: 28
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: { legend: { display: false }, tooltip: { enabled: true } },
//         scales: {
//           y: {
//             beginAtZero: true,
//             grid: { color: '#eee' },
//             ticks: { color: '#ffffff' }
//           },
//           x: {
//             grid: { display: false },
//             ticks: { color: '#ffffff' }
//           }
//         }
//       }
//     });

//     new Chart(categoryCtx, {
//       type: 'pie',
//       data: {
//         labels: ['Work', 'Study', 'Personal'],
//         datasets: [{
//           data: categoryData,
//           backgroundColor: ['#1e1e2f', '#2a2f4f', '#555C6D'],
//           borderColor: '#fff',
//           borderWidth: 2
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'bottom',
//             labels: { color: '#ffffff', font: { weight: 'bold' } }
//           }
//         }
//       }
//     });

//     new Chart(timeCtx, {
//       type: 'doughnut',
//       data: {
//         labels: ['Productive', 'Wasted'],
//         datasets: [{
//           data: timeData,
//           backgroundColor: ['#2A2F4F', '#8CC0DE'],
//           borderColor: '#fff',
//           borderWidth: 2
//         }]
//       },
//       options: {
//         responsive: true,
//         cutout: '70%',
//         plugins: {
//           legend: {
//             position: 'bottom',
//             labels: { color: '#ffffff', font: { weight: 'bold' } }
//           }
//         }
//       }
//     });
//   }, [weeklyData, categoryData, timeData]);

//   const handleDownloadPDF = async () => {
//     const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     pdf.save('SmartPlanner_Weekly_Report.pdf');
//   };

//   return (
//     <div style={{
//       background: 'linear-gradient(135deg, rgb(32, 44, 73), rgba(36, 47, 65, 0.73))',
//       minHeight: '100vh',
//       padding: '60px 40px',
//       marginLeft: '250px',
//       fontFamily: "'Poppins', sans-serif",
//       color: '#ffffff'
//     }}>
//       <div className="container" ref={reportRef}>
//         <h2 className="text-center fw-bold mb-5" style={{
//           fontSize: '2.8rem',
//           background: 'linear-gradient(90deg, rgba(44, 103, 159, 0.43), rgb(183, 200, 210))',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent'
//         }}>
//           SmartPlanner Report Overview
//         </h2>

//         <div className="row g-4">
//           {[{ id: 'weeklyChart', title: '📅 Weekly Focus Hours' },
//             { id: 'categoryChart', title: '📂 Task Categories' },
//             { id: 'timeChart', title: '⏱️ Time Utilization' }
//           ].map((chart, idx) => (
//             <div className="col-md-6 col-lg-4" key={idx}>
//               <div className="card border-0 shadow-lg" style={{
//                 background: 'linear-gradient(145deg, #1e1e2f, #2a2f4f)',
//                 borderRadius: '25px',
//                 boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)',
//                 padding: '24px',
//                 transition: 'transform 0.3s',
//                 animation: `fadeIn 0.8s ease ${(idx + 1) * 0.3}s both`,
//                 transform: 'translateY(0)',
//                 backdropFilter: 'blur(10px)'
//               }}>
//                 <h5 className="fw-bold text-light mb-3 border-bottom pb-2">{chart.title}</h5>
//                 <canvas id={chart.id} height="180"></canvas>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-5">
//           <button
//             className="btn px-5 py-2 fw-semibold"
//             style={{
//               background: 'linear-gradient(90deg, #2A2F4F, #8CC0DE)',
//               color: 'white',
//               fontSize: '1rem',
//               borderRadius: '50px',
//               boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
//               transition: 'transform 0.2s ease-in-out'
//             }}
//             onClick={handleDownloadPDF}
//             onMouseOver={(e) => (e.target.style.transform = 'scale(1.05)')}
//             onMouseOut={(e) => (e.target.style.transform = 'scale(1)')}
//           >
//             📥 Download Full Report (PDF)
//           </button>
//         </div>
//       </div>

//       <style>
//         {`
//           @keyframes fadeIn {
//             from { opacity: 0; transform: translateY(30px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default Reports;


import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import api from '../../api/axiosInstance';

const Reports = () => {
  const reportRef = useRef();
  const [weeklyData, setWeeklyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [timeData, setTimeData] = useState([]);
  const { token } = useSelector((store) => store.LoginToken);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get(`/reports/weekly`);
        const data = res.data;
        setWeeklyData(data.weeklyData);
        setCategoryData(data.categoryData);
        setTimeData(data.timeData);
      } catch (err) {
        console.error("Report fetch failed", err);
      }
    };
    fetchReport();
  }, [token]);

  useEffect(() => {
    if (!weeklyData.length || !categoryData.length || !timeData.length) return;
    Object.values(Chart.instances || {}).forEach(chart => chart?.destroy?.());

    const createChart = (id, type, data, options) => {
      const ctx = document.getElementById(id);
      if (ctx) new Chart(ctx, { type, data, options });
    };

    createChart('weeklyChart', 'bar', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Hours Focused',
        data: weeklyData,
        backgroundColor: '#4682A9',
        borderRadius: 8,
        maxBarThickness: 28
      }]
    }, {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { color: '#555' }, grid: { color: '#ccc' } },
        x: { ticks: { color: '#555' }, grid: { display: false } }
      }
    });

    createChart('categoryChart', 'pie', {
      labels: ['Work', 'Study', 'Personal'],
      datasets: [{
        data: categoryData,
        backgroundColor: ['#FFB6B9', '#FAE3D9', '#BBDED6'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    }, {
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#333', font: { weight: 'bold' } }
        }
      }
    });

    createChart('timeChart', 'doughnut', {
      labels: ['Productive', 'Wasted'],
      datasets: [{
        data: timeData,
        backgroundColor: ['#C4FCEF', '#FFDAC1'],
        borderColor: '#fff',
        borderWidth: 2
      }]
    }, {
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#333', font: { weight: 'bold' } }
        }
      }
    });
  }, [weeklyData, categoryData, timeData]);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('SmartPlanner_Report.pdf');
  };

  return (
    <div style={{
      backgroundImage: `url("images/details.jpg")`,
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '60px 40px',
      marginLeft: '250px',
      fontFamily: "'Poppins', sans-serif",
      color: '#2d3748'
    }}>
      <div className="container" ref={reportRef} style={{
        backgroundColor: 'rgba(244, 232, 232, 0.08)',
        padding: '40px',
        borderRadius: '30px',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 className="text-center fw-bold mb-5" style={{
          fontSize: '2.6rem',
          background: 'linear-gradient(to right, #1A2980, #26D0CE)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          📊 SmartPlanner Weekly Report
        </h1>

        <div className="row g-4">
          {[
            { id: 'weeklyChart', title: 'Weekly Focus Hours', color: '#E3F6F5' },
            { id: 'categoryChart', title: ' Task Categories', color: '#FFF1E6' },
            { id: 'timeChart', title: ' Time Utilization', color: '#FAF3E0' }
          ].map((chart, index) => (
            <div className="col-md-6 col-lg-4" key={index}>
              <div className="card border-0" style={{
                background: chart.color,
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(8px)',
                transition: 'transform 0.3s ease',
                height: '100%'
              }}>
                <h5 className="fw-semibold mb-3 border-bottom pb-2">{chart.title}</h5>
                <canvas id={chart.id} height="180" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-5">
          <button
            onClick={handleDownloadPDF}
            className="btn px-5 py-3 fw-semibold"
            style={{
              background: 'linear-gradient(90deg, #26D0CE, #1A2980)',
              color: '#fff',
              borderRadius: '40px',
              boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
              transition: 'transform 0.2s ease-in-out'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            📥 Download PDF Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
