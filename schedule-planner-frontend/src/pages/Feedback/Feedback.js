// // src/pages/Feedback.jsx
// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Avatar,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Card,
//   CardContent,
//   Fade
// } from '@mui/material';
// import { Star, Chat, Send, Person } from '@mui/icons-material';
// import 'animate.css/animate.min.css';

// const Feedback = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [formData, setFormData] = useState({ name: '', rating: '', description: '' });
//   const [charCount, setCharCount] = useState(0);
//   const [alertVisible, setAlertVisible] = useState(false);

//   const avatars = [
//     "https://i.pravatar.cc/150?img=3",
//     "https://i.pravatar.cc/150?img=5",
//     "https://i.pravatar.cc/150?img=8",
//     "https://i.pravatar.cc/150?img=10",
//     "https://i.pravatar.cc/150?img=15"
//   ];

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({ ...prev, [id]: value }));
//     if (id === 'description') setCharCount(value.length);
//   };

//   const handleRatingChange = (e) => {
//     setFormData(prev => ({ ...prev, rating: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, rating, description } = formData;

//     if (name && rating && description) {
//       const newFeedback = {
//         id: Date.now(),
//         name,
//         rating,
//         description,
//         avatar: avatars[Math.floor(Math.random() * avatars.length)],
//         timestamp: new Date().toLocaleString()
//       };

//       setFeedbacks([newFeedback, ...feedbacks]);
//       setAlertVisible(true);
//       setTimeout(() => setAlertVisible(false), 3000);
//       setFormData({ name: '', rating: '', description: '' });
//       setCharCount(0);
//     }
//   };

//   return (
//     <Box sx={{ marginLeft: '250px', backgroundColor: '#f9fafe', minHeight: '100vh', pb: 5 }}>
      
//       {/* 🌄 Hero Section */}
//       <Box
//         sx={{
//           background: `linear-gradient(rgba(120, 166, 219, 0.7), rgba(170, 119, 190, 0.7)), url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1470&q=80') center/cover no-repeat`,
//           height: '300px',
//           borderBottomLeftRadius: '50px',
//           borderBottomRightRadius: '50px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           color: 'white',
//           textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold" className="animate__animated animate__fadeInDown">
//           <Chat sx={{ mr: 1 }} /> Schedule Planner Feedback
//         </Typography>
//       </Box>

//       {/* 📝 Form Section */}
//       <Box
//         sx={{
//           maxWidth: '1100px',
//           mx: 'auto',
//           mt: -6,
//           p: 4,
//          background: 'linear-gradient(to right,rgba(223, 218, 222, 0.73),rgb(248, 235, 247))',

//           borderRadius: 4,
//           boxShadow: 3
//         }}
//       >
//         <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
//           <Chat sx={{ mb: -0.5, mr: 1 }} /> We'd love your feedback!
//         </Typography>

//         {alertVisible && (
//           <Fade in={alertVisible}>
//             <Box className="animate__animated animate__fadeInDown" sx={{ mt: 2 }}>
//               <Typography align="center" color="success.main" fontWeight="bold">
//                  Thank you for your valuable feedback!
//               </Typography>
//             </Box>
//           </Fade>
//         )}

//         <form onSubmit={handleSubmit}>
//           <Box display="flex" flexWrap="wrap" gap={3} mt={3}>
//             <TextField
//               id="name"
//               label="Your Name"
//               placeholder="Enter Your Name"
//               variant="outlined"
//               fullWidth
//               value={formData.name}
//               onChange={handleChange}
//               InputProps={{
//                 startAdornment: <Person sx={{ color: '#888', mr: 1 }} />
//               }}
//               required
//             />

//             <FormControl fullWidth>
//               <InputLabel>Rating</InputLabel>
//               <Select
//                 id="rating"
//                 value={formData.rating}
//                 label="Rating"
//                 onChange={handleRatingChange}
//                 required
//               >
//                 <MenuItem value="5">⭐⭐⭐⭐⭐</MenuItem>
//                 <MenuItem value="4">⭐⭐⭐⭐</MenuItem>
//                 <MenuItem value="3">⭐⭐⭐</MenuItem>
//                 <MenuItem value="2">⭐⭐</MenuItem>
//                 <MenuItem value="1">⭐</MenuItem>
//               </Select>
//             </FormControl>

//             <TextField
//               id="description"
//               label="Feedback"
//               placeholder="Helpful to manage tasks!"
//               variant="outlined"
//               fullWidth
//               value={formData.description}
//               onChange={handleChange}
//               inputProps={{ maxLength: 100 }}
//               helperText={`${charCount} / 100`}
//               required
//             />
//           </Box>

//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             sx={{
//               mt: 4,
//               borderRadius: 3,
//               px: 4,
//               background: 'linear-gradient(to right, #6a11cb, #2575fc)',
//               color: 'white',
//               fontWeight: 'bold',
//               textTransform: 'none',
//               '&:hover': {
//                 background: 'linear-gradient(to right, #2575fc, #6a11cb)'
//               }
//             }}
//             startIcon={<Send />}
//             fullWidth
//           >
//             Submit Feedback
//           </Button>
//         </form>

//         {/* 💬 Feedback List */}
//         <Box mt={6}>
//           <Typography variant="h6" fontWeight="bold" gutterBottom>
//             <Star sx={{ mb: -0.7, mr: 1 }} /> What Others Are Saying
//           </Typography>

//           {feedbacks.length === 0 ? (
//             <Typography color="text.secondary" fontStyle="italic">
//               No feedback yet. Be the first to share your thoughts!
//             </Typography>
//           ) : (
//             feedbacks.map((item) => (
//               <Card
//                 key={item.id}
//                 sx={{
//                   my: 2,
//                   p: 2,
//                   borderRadius: 4,
//                   background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
//                   boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
//                   transition: 'transform 0.3s ease',
//                   '&:hover': {
//                     transform: 'scale(1.02)',
//                     boxShadow: '0 10px 28px rgba(0, 0, 0, 0.15)',
//                   }
//                 }}
//               >
//                 <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
//                   <Avatar
//                     src={item.avatar}
//                     sx={{
//                       width: 60,
//                       height: 60,
//                       mr: 3,
//                       border: '2px solid #4A90E2',
//                       boxShadow: '0 0 10px rgba(74, 144, 226, 0.5)'
//                     }}
//                   />
//                   <Box>
//                     <Typography
//                       variant="subtitle1"
//                       fontWeight="bold"
//                       sx={{
//                         background: 'linear-gradient(to right, #5f2c82, #49a09d)',
//                         WebkitBackgroundClip: 'text',
//                         WebkitTextFillColor: 'transparent',
//                         fontSize: '1.1rem'
//                       }}
//                     >
//                       {item.name}
//                     </Typography>

//                     <Box sx={{ mb: 1 }}>
//                       {'⭐'.repeat(item.rating).split('').map((star, i) => (
//                         <Star key={i} sx={{ color: '#fbc02d' }} fontSize="small" />
//                       ))}
//                     </Box>

//                     <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}>
//                       “{item.description}”
//                     </Typography>

//                     <Typography variant="caption" sx={{ color: '#999' }}>
//                       🕒 {item.timestamp}
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             ))
//           )}
//         </Box>

//         {/* 📸 Footer Image */}
//         <Box textAlign="center" mt={6}>
//           <img
//             src="https://t4.ftcdn.net/jpg/11/85/53/09/360_F_1185530926_1EgH3B1O7wtACzWaeqXywUo61ECS0bNk.jpg"
//             alt="Planner Visual"
//             className="img-fluid"
//             style={{ maxWidth: '90%', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
//           />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Feedback;
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Fade
} from '@mui/material';
import { Star, Chat, Send } from '@mui/icons-material';
import 'animate.css/animate.min.css';
import api from '../../api/axiosInstance';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ rating: '', description: '' });
  const [charCount, setCharCount] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  
  const avatars = [
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=5",
    "https://i.pravatar.cc/150?img=8",
    "https://i.pravatar.cc/150?img=10",
    "https://i.pravatar.cc/150?img=15"
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (id === 'description') setCharCount(value.length);
  };

  const handleRatingChange = (e) => {
    setFormData(prev => ({ ...prev, rating: e.target.value }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const { rating, description } = formData;

    if (rating && description) {
      try {
      

      const response = await api.post(
        '/feedback',
        {
          rating: parseInt(rating),
          message: description
        },
   
      );
      if(response.status==200){
        alert("already submit");
      }
      if(response.status ===201){
        alert("feedback submited");
      }

    }catch(err){
      console.log(err)
    }
  }
};

  return (
    <Box sx={{ marginLeft: '250px', backgroundColor: '#f4f7fc', minHeight: '100vh', pb: 5 }}>
      {/* 🌄 Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(rgba(60, 70, 90, 0.7), rgba(80, 30, 100, 0.7)), url('https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1470&q=80') center/cover no-repeat`,
          height: '300px',
          borderBottomLeftRadius: '40px',
          borderBottomRightRadius: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        <Typography variant="h4" fontWeight="bold" className="animate__animated animate__fadeInDown">
          <Chat sx={{ mr: 1 }} /> Share Your Experience
        </Typography>
      </Box>

      {/* 📝 Form Section */}
      <Box
        sx={{
          maxWidth: '1000px',
          mx: 'auto',
          mt: -8,
          p: 5,
          background: 'linear-gradient(to right, #ffffff, #e3f2fd)',
          borderRadius: 5,
          boxShadow: '0 10px 35px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h5" fontWeight="bold" align="center" gutterBottom>
          <Chat sx={{ mb: -0.5, mr: 1 }} /> We'd love to hear your feedback!
        </Typography>

        {alertVisible && (
          <Fade in={alertVisible}>
            <Box className="animate__animated animate__fadeInDown" sx={{ mt: 2 }}>
              <Typography align="center" color="success.main" fontWeight="bold">
                ✅ Thanks for your feedback!
              </Typography>
            </Box>
          </Fade>
        )}

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={3} mt={3}>
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                id="rating"
                value={formData.rating}
                label="Rating"
                onChange={handleRatingChange}
                required
              >
                <MenuItem value="5">⭐⭐⭐⭐⭐</MenuItem>
                <MenuItem value="4">⭐⭐⭐⭐</MenuItem>
                <MenuItem value="3">⭐⭐⭐</MenuItem>
                <MenuItem value="2">⭐⭐</MenuItem>
                <MenuItem value="1">⭐</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <TextField
            id="description"
            label="Your Feedback"
            multiline
            rows={4}
            fullWidth
            sx={{ mt: 3 }}
            value={formData.description}
            onChange={handleChange}
            inputProps={{ maxLength: 100 }}
            helperText={`${charCount} / 100 characters`}
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 4,
              py: 1.5,
              px: 5,
              fontWeight: 'bold',
              borderRadius: '30px',
              background: 'linear-gradient(to right, #6a11cb, #2575fc)',
              '&:hover': {
                background: 'linear-gradient(to right, #2575fc, #6a11cb)'
              }
            }}
            startIcon={<Send />}
            fullWidth
          >
            Submit Feedback
          </Button>
        </form>

        {/* 💬 Feedback List */}
        <Box mt={6}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            <Star sx={{ mb: -0.7, mr: 1 }} /> Recent Feedbacks
          </Typography>

          {feedbacks.length === 0 ? (
            <Typography color="text.secondary" fontStyle="italic">
              Be the first to leave your feedback!
            </Typography>
          ) : (
            feedbacks.map((item) => (
              <Card
                key={item.id}
                sx={{
                  my: 2,
                  borderRadius: 4,
                  background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
                  boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  }
                }}
              >
                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={item.avatar}
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 3,
                      border: '2px solid #6a1b9a'
                    }}
                  />
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={{
                        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Box sx={{ mb: 1 }}>
                      {'⭐'.repeat(item.rating).split('').map((_, i) => (
                        <Star key={i} sx={{ color: '#fbc02d' }} fontSize="small" />
                      ))}
                    </Box>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#555' }}>
                      “{item.description}”
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#999' }}>
                      🕒 {item.timestamp}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))
          )}
        </Box>

        {/* 📸 Footer Image */}
        <Box textAlign="center" mt={6}>
          <img
            src="https://t4.ftcdn.net/jpg/11/85/53/09/360_F_1185530926_1EgH3B1O7wtACzWaeqXywUo61ECS0bNk.jpg"
            alt="Planner Visual"
            className="img-fluid"
            style={{ maxWidth: '90%', borderRadius: '20px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Feedback;