import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; 
import { Link } from 'react-router-dom';
import MyBlogCard from '../../components/MyBlogCard';

function User() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const [user, setUser] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingBlogs, setLoadingBlogs] = useState(true);
    const token = localStorage.getItem('token'); // Retrieve token from local storage

    useEffect(() => {
        if (currentUser) {
            fetchUser(currentUser.id);
            fetchBlogs();
        }
    }, [currentUser]);

    const fetchUser = async (userId) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/User/getuserbyid/${userId}`, {
                headers: {
                    Authorization: token // Include token in the request headers
                }
            });
            setUser(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
   const deleteblog = async ()=>{
    try{
        const res = axios.delete(`http://localhost:3000/User/deletemyblog/${blogId}`)
        console.log('blod dellted')

    }
    catch(err){
        console.log(err)
    }
   }
    const fetchBlogs = async () => {
        try {
            setLoadingBlogs(true);
            const response = await axios.get('http://localhost:3000/User/myblogs', {
                headers: {
                    Authorization: token // Include token in the request headers
                }
            });
            setBlogs(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingBlogs(false);
        }
    };
    
    return (
        <div>
            {loading ? (
                <ClipLoader className='flex items-centerjustify-center' color="#2196F3" size={50} loading={loading} />
            ) : user ? (
                <div>
                    <div className="ml-4">
                        <h1 className='font-bold'>{user.email}</h1>
                        <p>{user.name}</p>
                        <p>{user.role}</p>
                        <p>{user.phone}</p>
                       
                        <Link to="/updateprofile/:id" className="text-blue-500">Edit Profile</Link>
                        <div> <Link to="/writeblog" className="text-blue-500">writeblog</Link>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold text-2xl mt-4 mb-2">My Blogs</h2>
                        {loadingBlogs ? (
                            <ClipLoader className='flex items-centerjustify-center' color="#2196F3" size={50} loading={loadingBlogs} />
                        ) : (
                            <div className='flex-row'>
                                {blogs.map(blog => (
                                    <MyBlogCard key={blog._id} blog={blog} ondelete={deleteblog(blog._id)}/>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <p>User not found</p>
            )}
        </div>
    );
}

export default User;
