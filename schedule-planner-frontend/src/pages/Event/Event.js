import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
} from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';

const EventPage = () => {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewEvent({ title: '', date: '', time: '', location: '' });
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      setEvents([...events, newEvent]);
      handleClose();
    }
  };

  const navStyle = {
    background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
    color: 'white',
  };

  const navTitle = {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '22px',
    color: 'white',
    marginLeft: '10px',
  };

  const eventCardStyle = {
    backgroundImage: 'url("images/details.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '15px',
    color: 'white',
    overflow: 'hidden',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    height: '220px',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '15px',
    height: '100%',
    padding: '20px',
  };

  const pageBackground = {
    backgroundImage: 'url("images/details.jpg")',
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  const contentBoxStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0px 0px 25px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div style={pageBackground}>
      {/* Navbar */}
      <AppBar position="static" style={navStyle} elevation={6}>
        <Toolbar className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Link to="/" className="text-decoration-none d-flex align-items-center">
              <img
                src="/images/logo1.jpg"
                alt="Logo"
                width="42"
                height="42"
                className="rounded-circle"
                style={{ border: '2px solid #0d6efd', boxShadow: '0 0 8px #00aaffbb' }}
              />
              <Typography variant="h6" style={navTitle}>
                Smart Scheduler
              </Typography>
            </Link>
          </div>
          <div>
            <Tooltip title="Home"><Link to="/"><IconButton color="inherit"><HomeIcon /></IconButton></Link></Tooltip>
            <Tooltip title="Dashboard"><Link to="/dashboard"><IconButton color="inherit"><DashboardIcon /></IconButton></Link></Tooltip>
            <Tooltip title="Calendar"><Link to="/calendar"><IconButton color="inherit"><EventIcon /></IconButton></Link></Tooltip>
            <Tooltip title="Notifications"><Link to="/notifications"><IconButton color="inherit"><NotificationsIcon /></IconButton></Link></Tooltip>
            <Tooltip title="Settings"><Link to="/settings"><IconButton color="inherit"><SettingsIcon /></IconButton></Link></Tooltip>
          </div>
        </Toolbar>
      </AppBar>

      {/* Page Content */}
      <div className="container py-5">
        <div style={contentBoxStyle}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="text-primary fw-bold"> Your Events</h3>
            <Button variant="contained" color="primary" onClick={handleOpen}>
              + Add Event
            </Button>
          </div>

          <div className="row">
            {events.length > 0 ? (
              events.map((event, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div
                    className="card shadow-sm border-0 h-100"
                    style={{ ...eventCardStyle, cursor: 'pointer' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.03)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={overlayStyle}>
                      <h5 className="fw-bold">{event.title}</h5>
                      <p><strong>Date:</strong> {event.date}</p>
                      <p><strong>Time:</strong> {event.time}</p>
                      <p><strong>Location:</strong> {event.location || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted text-center py-4">No events yet. Click "Add Event" to create one.</div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="dense"
            label="Event Title"
            name="title"
            fullWidth
            value={newEvent.title}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.date}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="dense"
            label="Time"
            name="time"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={newEvent.time}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="dense"
            label="Location (optional)"
            name="location"
            fullWidth
            value={newEvent.location}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleAddEvent} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventPage;
