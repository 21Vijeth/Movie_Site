// import React, { useState } from 'react';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="bg-transparent text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <a href="/" className="text-2xl font-bold">YourLogo</a>
//         <div className="hidden md:flex items-center space-x-4">
//           <a href="/" className="hover:text-purple-400">Home</a>
//           <a href="/movies" className="hover:text-purple-400">Movies</a>
//           <a href="/tv-shows" className="hover:text-purple-400">TV Shows</a>
//           <a href="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
//             Login
//           </a>
//           <a href="/register" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
//             Register
//           </a>
//         </div>
//         <div className="md:hidden">
//           <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
//             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
//             </svg>
//           </button>
//         </div>
//       </div>
//       {isMenuOpen && (
//         <div className="md:hidden mt-4">
//           <a href="/" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">Home</a>
//           <a href="/movies" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">Movies</a>
//           <a href="/tv-shows" className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">TV Shows</a>
//           <a href="/login" className="block w-full text-left mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
//             Login
//           </a>
//           <a href="/register" className="block w-full text-left mt-2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
//             Register
//           </a>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-transparent text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* The logo is the primary link to home */}
        <Link to="/" className="text-2xl font-bold">MovieApp</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {/* The explicit "Home" link has been removed */}
          {user ? (
            <>
              <span className="font-semibold">Welcome, {user.username}</span>
              <button onClick={handleLogoutClick} className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Login
              </Link>
              <Link to="/register" className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                Register
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {/* We keep a home link here for mobile accessibility, as the logo is less obvious */}
          <Link to="/" onClick={closeMenu} className="block py-2 px-4 text-sm hover:bg-gray-700 rounded">Home</Link>
          {user ? (
            <button onClick={handleLogoutClick} className="block w-full text-left mt-2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="block w-full text-left mt-2 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                Login
              </Link>
              <Link to="/register" onClick={closeMenu} className="block w-full text-left mt-2 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;