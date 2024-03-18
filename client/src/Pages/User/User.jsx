import React , {useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; 

function User() {
    const { id } = useParams(); // Access the id parameter from the route
    const [user, setUser] = useState(null);
    const[loading ,setLoading] = useState(true)
    useEffect(() => {
      
    
        fetchUser();
      }, [id]);
      const fetchUser = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`http://localhost:3000/User/getuserbyid/${id}`);
          setUser(response.data);
          console.log(response.data.email)

        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div>
    {loading ? (
      <ClipLoader className='flex items-centerjustify-center' color="#2196F3" size={50} loading={loading} />
    ) : user? (
      <div className="flex">
        {/* {blog.photo ? (
          <img
            src={`http://localhost:3000/blog/getblogphoto/${blog._id}`}
            alt={`Photo for ${blog.title}`}
            className="w-1/4 h-auto"
          />
        ) : (
          <div className="bg-gray-300 w-1/4 h-40 flex items-center justify-center">
            <p>No Image Available</p>
          </div>
        )} */}
        <div className="ml-4">
          <h1 className='font-bold'>{user.email}</h1>
          <p>{user.name}</p>
          <p>{user.role}</p>
          <p>{user.phone}</p>
          {/* Render the rest of the blog details here */}
        </div>
      </div>
    ) : (
      <p>User not found</p>
    )}
  </div>
  )
}

export default User