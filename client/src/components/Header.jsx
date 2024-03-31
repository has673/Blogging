import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/userslice';

function Header() {
  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    // Optionally clear any local storage or perform server-side logout logic
    navigate('/login');
  };

  return (
    <header>
      <div className="bg-blue-500 p-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white font-bold text-lg">Your Logo</div>

          {/* Navbar Links */}
          <div className="space-x-4">
            <Link to="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
           
            {/* Profile Link */}
            {user ? (
              <>
                <Link to={`/user/${user.uid}`}  className="text-white hover:text-gray-300">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              // If user is not logged in, show login and signup links
              <>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:text-gray-300">
                  Signup
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
