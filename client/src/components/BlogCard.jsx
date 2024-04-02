// import React from 'react';
// import { Link } from 'react-router-dom';

// function BlogCard({ blog }) {
//   return (
//     <div className="max-w-sm rounded w-100 overflow-hidden shadow-lg">
//       <Link to={`/blog/${blog._id}`} className="block">
//         <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
//         <div className="h-40">
//           {blog.photo ? (
//             <img
//               src={`http://localhost:3000/blog/getblogphoto/${blog._id}`}
//               alt={`Photo for ${blog.title}`}
//               className="w-full h-full object-cover"
//             />
//           ) : (
//             <div className="bg-gray-300 w-full h-full flex items-center justify-center">
//               <p>No Image Available</p>
//             </div>
//           )}
//         </div>
//         <div className="mt-2">
//           <p className="text-gray-700 text-base">{`Likes: ${blog.likes}`}</p>
//         </div>
//       </Link>
//     </div>
//   );
// }

// export default BlogCard;
import React from 'react';
import { Link } from 'react-router-dom';

function BlogCard({ blog }) {
  return (
    // <Link to={`/blog/${blog._id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 block hover:border-blue-500">
    //   <img className="rounded-t-lg w-100" src={`http://localhost:3000/blog/getblogphoto/${blog._id}`} alt={`Photo for ${blog.title}`} />
    //   <div className="p-5">
    //     <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
  
    //     <p className="text-gray-700 text-base">{`Likes: ${blog.likes}`}</p>
    //   </div>
    // </Link>
    <Link to={`/blog/${blog._id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 block hover:border-blue-500">
        <img className="rounded-t-lg" src={`http://localhost:3000/blog/getblogphoto/${blog._id}`} alt={blog.title} />
        <div className="p-5">
            <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{blog.title}</h5>
            <h6 className="mb-2  tracking-tight text-gray-900 dark:text-white">{`likes:${blog.likes}`}</h6>
         
        </div>
       
    </Link>
  );
}

export default BlogCard;
