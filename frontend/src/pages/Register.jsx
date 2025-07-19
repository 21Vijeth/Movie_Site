// import React from 'react';

// const Register = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white" style={{background: 'linear-gradient(to bottom, #2d0b4c, #1a0a2e)'}}>
//       <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-400 mb-2" htmlFor="username">Username</label>
//             <input
//               type="text"
//               id="username"
//               className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Choose a username"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Enter your email"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
//             <input
//               type="password"
//               id="password"
//               className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//               placeholder="Create a password"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
//           >
//             Register
//           </button>
//         </form>
//         <p className="mt-6 text-center text-gray-400">
//           Already have an account? <a href="/login" className="text-purple-400 hover:underline">Login here</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { registerAppwriteUser } from '../auth.appwrite.js';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Use the navigate hook for redirection

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.id]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
        setError('Password must be at least 6 characters long');
        return;
    }
    try {
        // 1. Register user in your MERN backend (this remains the same)
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, formData);

        // 2. ALSO register the user in Appwrite
        await registerAppwriteUser(email, password, username);

        // 3. Navigate to the login page with a success message
        navigate('/login', { state: { message: "Registration successful! Please log in." } });

    } catch (err) {
        // This will now catch errors from either the backend or Appwrite
        setError(err.response?.data?.message || err.message || 'Something went wrong');
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white" style={{background: 'linear-gradient(to bottom, #2d0b4c, #1a0a2e)'}}>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Choose a username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
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
              placeholder="Create a password (min 8 characters)"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Already have an account? <Link to="/login" className="text-purple-400 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;