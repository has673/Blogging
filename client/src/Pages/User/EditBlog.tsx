import axios from 'axios';
import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';

function EditBlog() {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        fetchBlog();
        
    }, [id]);

    const fetchBlog = async () => {
        
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/blog/getblogbyid/${id}`);
            setBlog(response.data);
            // setIsLiked(response.data.likes.includes(userId)); // Check if the current user ID is in the likes array
            console.log(`blog user ${ response.data.user}`)
           
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
  return (
    <div>EditBlog</div>
  )
}

export default EditBlog