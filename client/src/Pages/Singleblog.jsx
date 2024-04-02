import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import Comment from '../components/Comment'; // Import the Comment component
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import MakeComment from '../components/MakeComment';

// import { checkLiked } from '../../../server/Controllers/User';

function SingleBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const[my , setMy] = useState(false)
    const[mycomment, setMyComment] = useState(false)
    const[content , setContent ]= useState('')
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(true);
    const [isLiked, setIsLiked] = useState(false); // Track if the user has already liked the blog
    const userId = useSelector(state => state.user.currentUser.uid);
    const token = useSelector(state => state.user.currentUser.token);
    console.log(userId)

    useEffect(() => {
        fetchBlog();
        fetchComments();
        checkLiked()
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:3000/comment/makecomment/${id}`,
                { Content : content},
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            setContent('')
            fetchComments()
       
            // You might want to trigger a re-fetch of comments in the parent component
        } catch (err) {
            console.error(err);
        }
    };
    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/blog/getblogbyid/${id}`);
            setBlog(response.data);
            // setIsLiked(response.data.likes.includes(userId)); // Check if the current user ID is in the likes array
            console.log(`blog user ${ response.data.user}`)
            if(response.data.user === userId){
              setMy(true)
            }
            else{
                setMy(false)
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const deletemycomment = async(commentid)=>{
        try{
          const res = await axios.delete(`http://localhost:3000/User/deletemycomment/${commentid}`,{
            headers:{
              Authorization:token
            }
          })
          console.log(res.data)
          fetchComments()
        //   fetchComments()
        }
        
        catch(err){
          console.log(err)
        }
    
      }
    const fetchComments = async () => {
        try {
            setLoadingComments(true);
            const response = await axios.get(`http://localhost:3000/blog/getcommentsonblog/${id}`);
            setComments(response.data.comments);
            console.log(response.data.comments)
            const hasUserComment = response.data.comments.some(comment => comment.User === userId);
            setMyComment(hasUserComment);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingComments(false);
        }
    };
const checkLiked = async()=>{
  try{
    const res = await axios.get(`http://localhost:3000/User/checkedliked/${id}`,{
      headers:{
        Authorization:token

      }
      
    })
    if (res.data.liked == true) {
      setIsLiked(true);
  } else {
      setIsLiked(false);
  }

  }
  catch(err){
    console.log(err)
  }
}
    const likeBlog = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/User/likeblog/${id}`,
                {},
                {
                    headers: {
                        Authorization: token
                    },
                }
            );
            setIsLiked(true);
            console.log('Like added');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {loading ? (
                <ClipLoader className='flex items-center justify-center' color="#2196F3" size={50} loading={loading} />
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
                        <button onClick={likeBlog}>
                            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
                        </button>
                        {my && <Link to={`/editblog/${blog._id}`}><h2> Edit</h2></Link>}
                        <p>{blog.content}</p>
                        <h2 className="mt-4 font-bold">Comments</h2>
                        {loadingComments ? (
                            <ClipLoader className='flex items-center justify-center' color="#2196F3" size={30} loading={loadingComments} />
                        ) : (
                            comments.map(comment => (
                                <Comment key={comment._id} comment={comment} mycomment={mycomment} ondelete={()=>deletemycomment(comment._id)}/>
                            ))
                        )}
                        <MakeComment content={content}  blogId={id} handleSubmit={handleSubmit} setContent={setContent}/>
                    </div>
                   
                </div>
            ) : (
                <p>Blog not found</p>
            )}
        </div>
    );
}

export default SingleBlog;
