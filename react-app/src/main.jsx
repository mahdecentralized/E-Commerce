import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './router.jsx'
import { RouterProvider } from 'react-router-dom'
import axios from 'axios'

axios.defaults.baseURL = `http://localhost:8000/`;
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
   const token = localStorage.getItem('auth_token');
   config.headers.Authorization = token ? `Bearer ${token}` : '';
   return config;
});

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>,
)
