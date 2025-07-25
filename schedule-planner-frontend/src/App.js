// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Pages
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Calendar from './pages/Calendar/Calendar';
import Distractions from './pages/Distractions/Distraction';
import FocusMode from './pages/FocusMode/FocusMode';
import Goals from './pages/Goals/Goals';
import Habits from './pages/Habits/Habits';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Notifications from './pages/Notifications/Notification';
import Profile from './pages/Profile/Profile';
import Reports from './pages/Reports/Reports';
import Settings from './pages/Settings/Settings';
import SmartScheduler from './pages/SmartScheduler/SmartScheduler';
import Tasks from './pages/Tasks/Tasks';
import TimeTracker from './pages/Tracker/Tracker';
import ForgotPassword from './pages/Auth/Forgot';
import Event from './pages/Event/Event';
import Feedback from './pages/Feedback/Feedback';

// Layout with Sidebar
import Layout from './components/Layout';
import Auth from './pages/Auth/auth';
import Otpverify from './pages/Auth/Otp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - NO Sidebar */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='Otp' element ={<Otpverify />} />

        {/* Private Routes - WITH Sidebar */}
        <Route element={<Auth><Layout /></Auth>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/distractions" element={<Distractions />} />
          <Route path="/focusMode" element={<FocusMode />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/smart-scheduler" element={<SmartScheduler />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/tracker" element={<TimeTracker />} />
          <Route path="/events" element={<Event />} />
          <Route path="/feedback" element={<Feedback />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
