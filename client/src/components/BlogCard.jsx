import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link to={`/blog/${blog._id}`} className="block">
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
        <p className="text-gray-700 text-base">{`Likes: ${blog.likes}`}</p>

        </div>
      </Link>
    </div>
  );
}

export default BlogCard;
