import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {
  FaPlus, FaSave, FaTrash, FaImage, FaShareAlt, FaSun, FaMoon,
  FaCalendarDay, FaCalendarWeek, FaCalendarAlt, FaUpload, FaTimesCircle
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useSelector } from 'react-redux';
import api from '../../api/axiosInstance';


const CalendarPage = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const {token} = useSelector((store)=>store.LoginToken);

  const [theme, setTheme] = useState('light');
  const [background, setBackground] = useState('#f4f6fa');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [filterTag, setFilterTag] = useState('All');

  // useEffect(() => {
  //   localStorage.setItem('calendarEvents', JSON.stringify(events));
  // }, [events]);

  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await api.get("/calendar", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      console.error("Failed to fetch events:", err);
    }
  };

  fetchEvents();
}, []);

  // const handleDateClick = (info) => {
  //   const title = prompt('Enter event title:');
  //   if (!title) return;
  //   const tag = prompt('Enter tag (Work, Study, General):') || 'General';
  //   const newEvent = {
  //     id: Date.now(),
  //     title,
  //     start: info.dateStr,
  //     allDay: info.allDay,
  //     tag
  //   };
  //   setEvents(prev => [...prev, newEvent]);
  // };
  const handleDateClick = async (info) => {
  const title = prompt('Enter event title:');
  if (!title) return;
  const tag = prompt('Enter tag (Work, Study, General):') || 'General';

  try {
    const res = await api.post(
      "/calendar",
      {
        title,
        start: info.dateStr,
        allDay: info.allDay,
        tag
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setEvents(prev => [...prev, res.data]);
  } catch (err) {
    console.error("Error creating event:", err);
  }
};

const handleEventClick = async (info) => {
  if (window.confirm(`Delete event "${info.event.title}"?`)) {
    try {
      await api.delete(`/calendar/${info.event._def.publicId}`);

      setEvents(prev => prev.filter(e => e._id !== info.event._def.publicId));
    } catch (err) {
      console.error("Failed to delete event:", err);
    }
  }
};

  const handleExport = async () => {
    const calendarEl = document.querySelector('.fc');
    const canvas = await html2canvas(calendarEl);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 140);
    pdf.save('calendar.pdf');
  };

  const handleReset = () => {
    setEvents([]);
    localStorage.removeItem('calendarEvents');
    setBackgroundImage(null);
    setBackground('#f4f6fa');
  };

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleBackgroundColorChange = () => {
    const newColor = prompt('Enter background color:');
    if (newColor) {
      setBackgroundImage(null);
      setBackground(newColor);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setBackgroundImage(null);
  };

  const handleViewChange = (view) => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(view);
  };

  const filteredEvents = filterTag === 'All' ? events : events.filter(e => e.tag === filterTag);

  return (
    <div
      style={{
        minHeight: '100vh',
        marginLeft: '250px',
        backgroundColor: backgroundImage ? 'transparent' : background,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: theme === 'dark' ? '#fff' : '#000',
        transition: '0.4s ease-in-out',
        fontFamily: 'Segoe UI, sans-serif'
      }}
    >
      {/* Navbar */}
   
<nav
  className={`navbar navbar-expand-lg ${theme === 'dark' ? 'bg-dark' : 'bg-light'} shadow sticky-top`}
  style={{
    zIndex: 1000,
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    padding: '0.7rem 1rem'
  }}
>
  <div className="container-fluid justify-content-center flex-wrap gap-3">

    {/* Button Group */}
    <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-primary'}`} onClick={() => handleDateClick({ dateStr: new Date().toISOString(), allDay: true })}>
      <FaPlus /> Add
    </button>

    <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-success'}`} onClick={() => localStorage.setItem('calendarEvents', JSON.stringify(events))}>
      <FaSave /> Save
    </button>

    <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-danger'}`} onClick={handleReset}>
      <FaTrash /> Reset
    </button>

    <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-warning'}`} onClick={handleExport}>
      <FaShareAlt /> Export
    </button>

    <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-info'}`} onClick={handleBackgroundColorChange}>
      <FaImage /> Color
    </button>

    <label className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-secondary'} mb-0`}>
      <FaUpload /> Image
      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
    </label>

    {backgroundImage && (
      <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-danger'}`} onClick={handleRemoveImage}>
        <FaTimesCircle /> Remove
      </button>
    )}

    {/* Theme Toggle */}
    <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'}`} onClick={handleThemeToggle}>
      {theme === 'light' ? <FaMoon /> : <FaSun />} Theme
    </button>

    {/* Filter Tag */}
    <select
      className={`form-select w-auto ${theme === 'dark' ? 'bg-dark text-light border-light' : ''}`}
      onChange={(e) => setFilterTag(e.target.value)}
      value={filterTag}
    >
      <option value="All">All</option>
      <option value="Work">Work</option>
      <option value="Study">Study</option>
      <option value="General">General</option>
    </select>

    {/* Calendar View Buttons */}
    <div className="btn-group">
      <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-primary'}`} onClick={() => handleViewChange('dayGridMonth')}>
        <FaCalendarAlt /> Month
      </button>
      <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-primary'}`} onClick={() => handleViewChange('timeGridWeek')}>
        <FaCalendarWeek /> Week
      </button>
      <button className={`btn ${theme === 'dark' ? 'btn-outline-light' : 'btn-primary'}`} onClick={() => handleViewChange('timeGridDay')}>
        <FaCalendarDay /> Day
      </button>
    </div>
  </div>
</nav>


      {/* Calendar Container */}
      <div className="container mt-4 mb-5" style={{ maxWidth: '95%' }}>
        <div className="border rounded shadow p-3" style={{ backgroundColor: backgroundImage ? 'transparent' : (theme === 'dark' ? '#2e2e2e' : '#ffffff') }}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            height="auto"
            events={filteredEvents.map(e => ({ ...e, extendedProps: { tag: e.tag } }))}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
