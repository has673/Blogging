import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader from react-spinners

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
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

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Blog List</h1>
        {loading ? ( // Show spinner when loading is true
          <ClipLoader color="#36D7B7" size={50} loading={loading} />
        ) : (
          <ul className="flex flex-wrap justify-center">
            {blogs.map((blog) => (
              <li key={blog._id} className="mb-6 mx-4">
                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                  <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                  {blog.photo ? (
                    <img
                      src={`http://localhost:3000/blog/getblogphoto/${blog._id}`}
                      alt={`Photo for ${blog.title}`}
                      className="w-25 h-auto"
                    />
                  ) : (
                    <div className="bg-gray-300 w-full h-40 flex items-center justify-center">
                      <p>No Image Available</p>
                    </div>
                  )}
                  <div className="mt-2">
                    <p className="text-gray-700 text-base">{blog.summary}</p>
                  </div>
                  <div className="mt-4">
                    <Link to={`/blog/${blog._id}`} className="text-blue-500 underline">
                      Read Full Blog
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
