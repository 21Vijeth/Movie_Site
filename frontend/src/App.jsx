import React, { useEffect, useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { logoutAppwriteUser } from './auth.appwrite.js';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await axios.get('/api/users/me');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common['Authorization'];
          console.error("Failed to fetch user data:", err);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    // Logout from MERN stack
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common['Authorization'];
    
    // ALSO logout from Appwrite
    logoutAppwriteUser();
};

  // While checking for a token, show a loading indicator to prevent route flickers
  if (loading) {
    // You can replace this with your <Spinner /> component for a better look
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        
        {/* --- THIS IS THE KEY CHANGE --- */}
        {/* The Home route is now protected. It only renders if 'user' is truthy. */}
        {/* Otherwise, it redirects the user to the login page. */}
        <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
        
        {/* These routes are for guests. If a user is logged in, redirect them away. */}
        <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />

      </Routes>
    </Router>
  );
};

export default App;