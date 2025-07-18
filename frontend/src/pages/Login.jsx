// import React from 'react';

// const Login = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white" style={{background: 'linear-gradient(to bottom, #2d0b4c, #1a0a2e)'}}>
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-400 mb-2" htmlFor="email">Email or Username</label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter your email or username"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter your password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-6 text-center text-gray-400">
//           Don't have an account? <a href="/register" className="text-purple-400 hover:underline">Register here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { loginAppwriteUser } from '../auth.appwrite.js';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  
  // Use useLocation to get the state passed from the navigate function
  const location = useLocation();
  // Set the success message from the location state, if it exists
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');
  
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = e => {
    // Clear success message when user starts typing
    if (successMessage) setSuccessMessage('');
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
        // 1. Log in via your MERN backend to get the JWT
        const res = await axios.post('/api/users/login', formData);
        localStorage.setItem('token', res.data.token);

        // 2. ALSO log in via Appwrite to create an Appwrite session
        await loginAppwriteUser(email, password);

        // 3. Redirect to home page
        window.location.href = '/';
    } catch (err) {
        setError(err.response?.data?.message || err.message || 'Login failed.');
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white" style={{background: 'linear-gradient(to bottom, #2d0b4c, #1a0a2e)'}}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        
        {/* Display the success message here */}
        {successMessage && <p className="text-green-400 text-center mb-4">{successMessage}</p>}
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter your password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account? <Link to="/register" className="text-purple-400 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;