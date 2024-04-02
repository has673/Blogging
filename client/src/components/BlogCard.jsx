
// import React from 'react';
// import { Link } from 'react-router-dom';

// function BlogCard({ blog }) {
//   return (

//     <Link to={`/blog/${blog._id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 block hover:border-blue-500">
//         <img className="rounded-t-lg" src={`http://localhost:3000/blog/getblogphoto/${blog._id}`} alt={blog.title} />
//         <div className="p-5">
//             <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
//             <h6 className="mb-2  tracking-tight text-gray-900 dark:text-white">{`likes:${blog.likes}`}</h6>
         
//         </div>
       
//     </Link>
//   );
// }

// export default BlogCard;

import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  return (
    <Link to={`/blog/${blog._id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 block hover:border-blue-500">
      <div className="aspect-w-16 aspect-h-9">
        <img className="object-cover rounded-t-lg" src={`http://localhost:3000/blog/getblogphoto/${blog._id}`} alt={blog.title} />
      </div>
      <div className="p-5">
        <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
        <h6 className="mb-2 tracking-tight text-gray-900 dark:text-white">{`Likes: ${blog.likes}`}</h6>
      </div>
    </Link>
  );
}

export default BlogCard;

