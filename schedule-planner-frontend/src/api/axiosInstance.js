// import axios from 'axios';
// import { useSelector } from 'react-redux';

// const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // हर request में token भेजो


// api.interceptors.request.use((config) => {
//     const { token } = useSelector((store) => store.LoginToken);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;

// api.js
import axios from 'axios';
import store from "../redux/Store.js"; 
const api = axios.create({
  baseURL: 'https://schedule-planner-1.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use(
  (config) => {
    const { token } = store.getState().LoginToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

