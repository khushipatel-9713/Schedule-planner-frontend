import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Box, Typography, Grid, Paper,Container } from '@mui/material';
import api from '../../api/axiosInstance';


const Home = () => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();
  const { Login } = useSelector((store) => store.LoginToken);
  const [showContactForm, setShowContactForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleGetStarted = () => {
    if (Login) navigate('/dashboard');
    else {
      alert('Please login first.');
      navigate('/login');
    }
  };
const onSubmit = async (data) => {
    setLoading(true);
    const userInfo = {
      access_key: "061d37e8-d94b-40b0-b1c4-02418362c48e",
      name: data.username,
      email: data.email,
      message: data.message
    };
    try {
      await axios.post("https://api.web3forms.com/submit", userInfo);
      toast.success("Message sent successfully!");
      reset();
      setShowContactForm(false);
    } catch (error) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await api.get('/feedback')
        setFeedbackList(res.data);
      } catch (err) {
        console.error("Failed to fetch feedbacks", err);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', backgroundColor: '#f8f9fa' }}>
      <style>{`
       /* Hero Video Container */
.hero-video-container {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
  margin-top: 50px; /* compensate for sticky navbar */
  
}

.hero-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Centered Hero Content */
.hero-content-centered {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  text-align: center;
  z-index: 2;
  padding: 30px 40px;
  border-radius: 12px;
  max-width: 750px;
}

.hero-content-centered h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.hero-content-centered .tagline {
  font-size: 1.2rem;
  margin-bottom: 15px;
}

.hero-content-centered .desc {
  font-size: 1rem;
  margin-bottom: 25px;
  color: #222;
}

.get-started-button {
  background-color: #ff5b2e;
  color: white;
  border: none;
  padding: 12px 28px;
  font-weight: bold;
  font-size: 1rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.get-started-button:hover {
  background-color: #e0481f;
}

.mute-button {
  position: absolute;
  bottom: 25px;
  right: 25px;
  z-index: 3;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.25rem;
}

/* Sticky Navbar (Already Done) */
.navbar {
  z-index: 1000;
}
.feature-card {
  box-shadow: none;
}

.zoom-img img {
  transition: transform 0.4s ease;
  width: 100%;
  height: 150px;
  object-fit: contain;
  background-color: #f7f9fc;
  padding: 16px;
}

.zoom-img:hover img {
  transform: scale(1.1);
}


        .footer {
          background: #fff;
          color: white;
          padding: 40px 0;
        }

        .fab {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: #00bcd4;
          border: none;
          color: white;
          font-size: 2rem;
          border-radius: 50%;
          width: 55px;
          height: 55px;
          z-index: 1000;
        }
      `}</style>

   {/* Sticky Navbar */}
<nav className="navbar navbar-expand-lg fixed-top bg-white shadow-sm px-4 py-2">
  <Link className="navbar-brand fw-bold fs-4 text-dark" to="/">
    Schedule Planner
  </Link>
  <div className="ms-auto d-flex gap-3">
    <Link className="nav-link fw-semibold text-dark" to="/login">Login</Link>
    <Link className="nav-link fw-semibold text-dark" to="/register">Register</Link>
    <button className="btn btn-outline-dark btn-sm rounded-pill" onClick={() => setShowContactForm(true)}>
      Contact Us
    </button>
  </div>
</nav>

{/* Hero with Clean Video Background and Centered Content */}
<div className="hero-video-container">
  <video className="hero-video" ref={videoRef} autoPlay loop muted={isMuted} playsInline>
    <source src="/vedio/v1.mp4" type="video/mp4" />
  </video>

  <div className="hero-content-centered">
    <h1>Schedule Planner</h1>
    <p><strong>Schedule Planner</strong> helps you stay focused and organized.</p>
    <p>Manage your <strong>tasks, events, and goals</strong> with a clean calendar interface.</p>
        <p>Enable <strong>reminders, habit tracking</strong>, and <strong>focus mode</strong> to boost productivity.</p>
    <button className="get-started-button" onClick={handleGetStarted}>Get Started</button>
  </div>

  {/* Mute Toggle */}
  <button className="mute-button" onClick={toggleMute}>
    {isMuted ? <i className="bi bi-volume-mute-fill"></i> : <i className="bi bi-volume-up-fill"></i>}
  </button>
</div>


{/* Features Section — 4 cards in one line with smaller width */}
<Box py={6} textAlign="center" sx={{ backgroundColor: '#fff' }}>
  <Typography
    variant="h4"
    fontWeight={700}
    mb={4}
    sx={{
      background: 'linear-gradient(to right,rgb(20, 21, 21),rgb(16, 16, 17))',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}
  >
    Our Smart Features
  </Typography>

  {/* Flex instead of Grid for exact control */}
  <Box
    display="flex"
    justifyContent="center"
    alignItems="stretch"
    flexWrap="nowrap"
    gap={3}
    px={2}
    overflow="auto"
  >
    {[
      {
        img: 'https://cdn-icons-png.flaticon.com/512/2885/2885434.png',
        title: 'Focus Mode',
        desc: 'Block distractions and enter smart BUSY mode anytime.',
      },
      {
        img: 'https://cdn-icons-png.flaticon.com/512/1055/1055644.png',
        title: 'Smart Calendar',
        desc: 'Drag-drop tasks & events with labels and filters.',
      },
      {
        img: 'https://cdn-icons-png.flaticon.com/512/159/159469.png',
        title: 'Reminders & Habits',
        desc: 'Set custom reminders and track your habits daily.',
      },
      {
        img: 'https://cdn-icons-png.flaticon.com/512/5968/5968350.png',
        title: 'Developer Friendly',
        desc: 'Built using React, Node.js and MongoDB architecture.',
      },
    ].map((f, i) => (
      <Box
        key={i}
        className="feature-card"
        sx={{
          width: '230px',
          p: 2,
          borderRadius: 3,
          backgroundColor: '#fff',
          textAlign: 'center',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          },
        }}
      >
        <div className="zoom-img">
          <img src={f.img} alt={f.title} />
        </div>
        <Typography variant="h6" mt={2} fontWeight="bold">{f.title}</Typography>
        <Typography
          variant="body2"
          sx={{ color: '#6c757d', fontStyle: 'italic', fontSize: '0.85rem' }}
        >
          {f.desc}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>

   {/* ✅ Why Choose Smart Planner Section */}
<Box py={8} sx={{ background: '#fff' }}>
  <Container>
    <Grid container spacing={5} alignItems="center">
      {/* ✅ TEXT LEFT SIDE */}
      <Grid item xs={12} md={6}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{
            color: '#111',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Why Choose Smart Planner?
        </Typography>

        <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 3, fontSize: '1.05rem', color: '#333' }}>
          <li className="mb-3">
            <i className="fas fa-bolt text-warning me-2"></i> AI-based Scheduling
          </li>
          <li className="mb-3">
            <i className="fas fa-tasks text-primary me-2"></i> Habit & Goal Tracking
          </li>
          <li className="mb-3">
            <i className="fas fa-eye-slash text-danger me-2"></i> Distraction-Free UI
          </li>
          <li className="mb-3">
            <i className="fas fa-user-shield text-success me-2"></i> Focus BUSY Mode
          </li>
          <li className="mb-3">
            <i className="fas fa-chart-line text-info me-2"></i> Weekly Productivity Reports
          </li>
        </Box>
      </Grid>

     <Grid
  item
  xs={12}
  md={6}
  sx={{
    display: 'flex',
    justifyContent: { xs: 'center', md: 'flex-end' },
    alignItems: 'center',
  }}
>
  <Box
    sx={{
      maxWidth: 480,
      width: '100%',
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      transition: 'transform 0.4s ease-in-out',
      ml: { md: 10 }, // ✅ Margin-left added on medium screen and above
      '&:hover img': {
        transform: 'scale(1.08)',
      },
    }}
  >
    <Box
      component="img"
      src="/images/choose.jpeg"
      alt="Why Choose Us"
      sx={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
        transition: 'transform 0.4s ease-in-out',
        display: 'block',
      }}
    />
  </Box>
</Grid>


    </Grid>
  </Container>
</Box>


{/* ✅ What Our Users Say */}
<Box py={8} sx={{ background: '#fff' }}>
  <Container maxWidth="lg">
    <Typography
      variant="h4"
      fontWeight={700}
      textAlign="center"
      mb={3}
      sx={{
        color: '#111',
        animation: 'fadeIn 1.5s ease-in-out',
      }}
    >
      What Our Users Say
    </Typography>

    <Typography variant="body1" textAlign="center" color="text.secondary" mb={6}>
      Transform your routine into results — win and grow powerfully!
    </Typography>

    <Grid container spacing={4} justifyContent="center">
      {feedbackList.map((user, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              minHeight: 300,
              width: '100%',
              textAlign: 'center',
              borderRadius: 5,
              background: '#ffffff',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '&:hover': {
                transform: 'translateY(-6px)',
                boxShadow: '0 16px 30px rgba(0,0,0,0.1)',
              },
            }}
          >
            {user.profilePic && (
              <Box
                component="img"
                src={user.profilePic}
                alt={user.name}
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  mb: 2,
                  border: '2px solid #000',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
                }}
              />
            )}

            <Typography variant="subtitle1" fontWeight={600} sx={{ color: '#222' }}>
              {user.name}
            </Typography>

            <Typography sx={{ color: '#fbc02d', fontSize: '1.1rem', mb: 1 }}>
              {'⭐'.repeat(user.rating)}
              <Typography component="span" sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                {' '}({user.rating}/5)
              </Typography>
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              fontStyle="italic"
              sx={{ fontSize: '1rem', px: 1 }}
            >
              “{user.message}”
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>

{/* ✅ BUSY Mode Section */}
<Box py={8} sx={{ backgroundColor: '#fff' }}>
  <Container maxWidth="lg">
    <Grid
      container
      spacing={4}
      alignItems="center"
      justifyContent="space-between"
      sx={{
        flexWrap: 'nowrap',
        '@media (max-width:900px)': {
          flexWrap: 'wrap',
        },
      }}
    >
      {/* ✅ Left Side Content */}
      <Grid item xs={12} md={6}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#111' }}>
          Show You’re <Box component="span" sx={{ color: 'red', display: 'inline' }}>BUSY</Box>
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          Stop others from interrupting your deep focus. The display shows you're busy and when you’ll be free again.
        </Typography>

        <Box display="flex" mb={3}>
          <Box
            component="img"
            src="/images/a.png"
            alt="Instant"
            sx={{ width: 50, height: 50, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Instant activation</Typography>
            <Typography variant="body2" color="text.secondary">
              Start/stop BUSY manually with a physical button.
            </Typography>
          </Box>
        </Box>

        <Box display="flex">
          <Box
            component="img"
            src="/images/b.png"
            alt="Timer"
            sx={{ width: 50, height: 50, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">Set timer</Typography>
            <Typography variant="body2" color="text.secondary">
              Show others when you'll be available again.
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* ✅ Right Side Video */}
      <Grid item xs={12} md={6} sx={{ textAlign: 'right' }}>
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          sx={{
            width: '100%',
            maxWidth: 460,
            borderRadius: '12px',
            objectFit: 'cover',
            boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
          }}
        >
          <source src="/vedio/v2.mp4" type="video/mp4" />
        </Box>
      </Grid>
    </Grid>
  </Container>
</Box>


 {/* Contact Details */}

{showContactForm && (
  <div style={{ backgroundColor: 'white', padding: '60px 0' }}>
    <div className="container bg-white rounded-4 p-4 border" style={{ borderColor: '#ccc' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0 fw-bold text-dark">✉️ Get in Touch</h2>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setShowContactForm(false)}
        >
          <i className="bi bi-x-circle me-1"></i> Close
        </button>
      </div>

      <div className="row">
        {/* Contact Details */}
        <div className="col-lg-5 mb-4">
          <h6 className="fw-bold text-dark mb-3">Contact Info</h6>
          <p><FaPhone className="me-2" /> +91 123456789</p>
          <p><FaEnvelope className="me-2" /> smart@schedule.com</p>
          <p><FaMapMarkerAlt className="me-2" /> Indore, MP, India</p>
          <img
            src="images/contactus.jpeg"
            alt="Contact"
            className="img-fluid rounded-3 mt-3"
            style={{ maxHeight: 200 }}
          />
        </div>

        {/* Form */}
        <div className="col-lg-7">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label text-dark">Your Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                {...register("username", { required: true })}
              />
              {errors.username && <small className="text-danger">Name is required</small>}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Your Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="email@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && <small className="text-danger">Email is required</small>}
            </div>
            <div className="mb-3">
              <label className="form-label text-dark">Your Message</label>
              <textarea
                rows="4"
                className="form-control"
                placeholder="Write your message"
                {...register("message", { required: true })}
              ></textarea>
              {errors.message && <small className="text-danger">Message is required</small>}
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span> Sending...
                </>
              ) : (
                <>
                  <i className="bi bi-send me-2"></i>Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
)}


<footer
  style={{
    backgroundColor: '#fff',
    padding: '60px 0 30px',
    fontFamily: 'Segoe UI, sans-serif',
    borderTop: '1px solid #ddd',
  }}
>
  <div className="container">
    <div className="row justify-content-between align-items-start flex-wrap">
      
      {/* footer */}
      <div className="col-md-6 col-lg-5 mb-4">
        <h4 className="fw-bold text-dark mb-3" style={{ color: '#222' }}>
          <i className="bi bi-calendar2-check-fill me-2 text-primary"></i> Smart Planner
        </h4>
        <p className="text-muted" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
          Stay focused, stay productive. Smart Planner helps you organize your day with AI scheduling, habit tracking, and clean UI.
        </p>
        <ul className="list-unstyled text-muted mt-3" style={{ fontSize: '0.95rem' }}>
          <li className="mb-2"><i className="bi bi-envelope-fill me-2 text-info"></i> khushipatel4902@gmail.com</li>
          <li className="mb-2"><i className="bi bi-telephone-fill me-2 text-success"></i> +91 9714674117</li>
          <li className="mb-2"><i className="bi bi-geo-alt-fill me-2 text-warning"></i> Indore, India</li>
        </ul>
      </div>

      {/* RIGHT: Links & Socials */}
      <div className="col-md-5 col-lg-6 text-md-end">
        <div className="row">
          
          {/* Quick Links */}
          <div className="col-6">
            <h6 className="fw-semibold text-dark mb-3">Quick Links</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><a href="/" className="footer-link">Home</a></li>
              <li className="mb-2"><a href="/features" className="footer-link">Features</a></li>
              <li className="mb-2"><a href="/login" className="footer-link">Login</a></li>
              <li className="mb-2"><a href="/register" className="footer-link">Register</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-6">
            <h6 className="fw-semibold text-dark mb-3">Follow Us</h6>
            <div className="d-flex justify-content-md-end gap-3">
              <a href="https://linkedin.com/in/khushipatel4902" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-linkedin fs-5 text-primary"></i>
              </a>
              <a href="https://www.instagram.com/walker_khushi" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-instagram fs-5 text-danger"></i>
              </a>
              <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-facebook fs-5 text-primary"></i>
              </a>
              <a href="https://x.com/i/flow/login" target="_blank" rel="noopener noreferrer">
                <i className="bi bi-twitter fs-5 text-dark"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

    {/* Divider */}
    <hr className="my-4" />

    {/* Bottom Text */}
    <p className="text-center text-muted small mb-0">
      &copy; 2025 <strong>Smart Planner</strong> — Made with 💙 by <strong>Khushi Patel</strong>
    </p>
  </div>

  {/* Extra CSS */}
  <style>
    {`
      .footer-link {
        text-decoration: none;
        color: #555;
        transition: color 0.3s ease;
      }
      .footer-link:hover {
        color: #007bff;
      }
    `}
  </style>
</footer>


  

      {/* Scroll to Top */}
      <button className="fab" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <i className="bi bi-arrow-up-circle-fill"></i>
      </button>
    </div>
  );
};

export default Home;

