import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/userslice';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  const [userdata, setUserdata] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
      email: userdata.email,
      password: userdata.password,
    }, {
      withCredentials: true  // Include credentials (cookies) in the request
    });

      if (res.status === 200) {
        const { token } = res.data; // Extract the JWT token from the response
        localStorage.setItem('token', token);
        dispatch(loginSuccess(res.data));
        navigate('/Home');
      } else {
        dispatch(loginFailure());
      }
    } catch (error) {
      dispatch(loginFailure());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form className="flex flex-col items-center border-green-300 rounded-2xl p-8">
        <div className="mb-4">
          <input
            placeholder='Email'
            type='text'
            name='email'
            value={userdata.email}
            onChange={handleInputChange}
            className="p-2 m-2 border border-gray-300 rounded-2xl"
          />
        </div>
        <div className="mb-4">
          <input
            placeholder='Password'
            type='password'
            name='password'
            value={userdata.password}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-2xl"
          />
        </div>
        {error && <p className='text-red-500 mb-8'>Login failed. Please try again.</p>}
        <button
          type='submit'
          onClick={handleSubmit}
          disabled={loading}
          className="p-3 bg-green-500 text-white rounded-xl cursor-pointer hover:bg-green-600"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <span><Link to='/forgot'>Forgot Password ?</Link></span>
      <span><Link to='/signup'>Don't have an account? Signup</Link></span>
    </div>
  );
}

export default Login;
