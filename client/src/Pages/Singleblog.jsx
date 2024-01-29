import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; 
function Singleblog() {
    const { id } = useParams(); // Access the id parameter from the route
    const [blog, setBlog] = useState(null);
    const[loading ,setLoading] = useState(true)
    useEffect(() => {
      
    
        fetchBlog();
      }, [id]);
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3000/blog/getblogbyid/${id}`);
          setBlog(response.data);
          console.log(response.data.title)

        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>
      {loading ? (
        <ClipLoader className='flex items-centerjustify-center' color="blue" size={50} loading={loading} />
      ) : blog ? (
        <div className="flex">
          {blog.photo ? (
            <img
              src={`http://localhost:3000/blog/getblogphoto/${blog._id}`}
              alt={`Photo for ${blog.title}`}
              className="w-1/4 h-auto"
            />
          ) : (
            <div className="bg-gray-300 w-1/4 h-40 flex items-center justify-center">
              <p>No Image Available</p>
            </div>
          )}
          <div className="ml-4">
            <h1 className='font-bold'>{blog.title}</h1>
            <p>{blog.content}</p>
            {/* Render the rest of the blog details here */}
          </div>
        </div>
      ) : (
        <p>Blog not found</p>
      )}
    </div>
  )
}

export default Singleblog