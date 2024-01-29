import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBlogs();
    getUsers()
  }, []);

  const getBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blog/getblogs');
      setBlogs(response.data);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };
  const getUsers= async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/Showusers');
      setUsers(response.data);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };
  
  const deleteuser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/deleteauser/${id}`);
      getUsers()
      // setBlogs(response.data);
      // setLoading(false); // Set loading to false after fetching data
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        console.error('Invalid data format received:', response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const deleteblog = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/admin/deleteablog/${id}`);
      getBlogs()
      // setBlogs(response.data);
      // setLoading(false); // Set loading to false after fetching data
      if (Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        console.error('Invalid data format received:', response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setLoading(false); // Set loading to false in case of an error
    }
  };
  return (
    <>
    <div className="flex justify-center">
  <div className="w-1/2">
    <h1 className="text-3xl font-bold mb-4">Blog List</h1>
    {loading ? (
      <ClipLoader className='flex items-center justify-center' color="blue" size={50} loading={loading} />
    ) : (
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200 border-b text-left font-bold">Title</th>
            <th className="px-6 py-3 bg-gray-200 border-b text-left font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{blog.title}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => deleteblog(blog._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
                <Link to={`/blog/${blog._id}`} >
                 <button
                 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  View
                </button>
                 </Link>
                {/* <button
                  onClick={() => console.log('View clicked for blog with id:', blog._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  View
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>
<div className="flex justify-center">
  <div className="w-1/2">
    <h1 className="text-3xl font-bold mb-4">User List</h1>
    {loading ? (
      <ClipLoader className='flex items-center justify-center' color="blue" size={50} loading={loading} />
    ) : (
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-200 border-b text-left font-bold">Title</th>
            <th className="px-6 py-3 bg-gray-200 border-b text-left font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => deleteuser(user._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
                {/* <Link to={`/blog/${blog._id}`} >
                 <button
                 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  View
                </button>
                 </Link> */}
                {/* <button
                  onClick={() => console.log('View clicked for blog with id:', blog._id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  View
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
</div>
</>

    
  )
}

export default Dashboard