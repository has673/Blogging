import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';


function EditBlog() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.currentUser);
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tagsInput, setTagsInput] = useState('');
    const [tags, setTags] = useState('');
    const { id } = useParams();

    useEffect(() => {
        fetchBlog();
    }, [id]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(1)
    //     try {
            
    //         console.log(2)
    //         const res = await axios.put(
    //             `http://localhost:3000/User/updatemyblog/${id}`,
    //             {
    //                 title: title,
    //                 content: content,
    //             },
    //             {
    //                 headers: {
    //                     'Authorization': currentUser.token,
    //                     'Content-Type': 'multipart/form-data'
    //                 }
    //             }
    //         );
    //         console.log('update doene')
    //         navigate('/Home')

    //         // Handle response if needed
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('tags', JSON.stringify(tags)); // Convert tags array to JSON string

            // Append userId to formData if needed
           formData.append('user', currentUser.uid)

        
            const res = await axios.put(
                           `http://localhost:3000/User/updatemyblog/${id}`,
                            {
                                 title: title,
                                 content: content,
                             },
                             {
                                 headers: {
                                     'Authorization': currentUser.token,
                                    'Content-Type': 'multipart/form-data'
                                 }
                             }
                         );

         navigate('/Home')
            console.log('Blog post edited:', res.data);
            // Optionally, you can redirect the user to another page or perform other actions after successful submission
        } catch (err) {
            console.error('Error creating blog post:', err);
            // Optionally, you can display an error message to the user
        }
    };
    // const handleTagsInputChange = (event) => {
    //     setTagsInput(event.target.value);
    //     // Split the input string into an array of tags based on commas
    //     const tagsArray = event.target.value.split(',');
    //     // Trim whitespace from each tag and remove empty tags
    //     const trimmedTagsArray = tagsArray.map(tag => tag.trim()).filter(tag => tag !== '');
    //     // Update the tags state with the new array of tags
    //     setTags(trimmedTagsArray);
    // };

    const fetchBlog = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/blog/getblogbyid/${id}`);
            setBlog(response.data);
            setTitle(response.data?.title || '');
            setContent(response.data?.content || '');
            // setTagsInput(response.data?.tags)
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold mb-4">Edit Your Blog </h1>
                {loading ? (
                    <div className="flex justify-center">
                        <ClipLoader color="#3B82F6" loading={loading} size={35} />
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">Content</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={6}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        {/* <div className="mb-4">
                            <label htmlFor="tags" className="block text-gray-700 font-semibold mb-2">Tags</label>
                            <input
                                type="text"
                                id="tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div> */}
                        <div className="mb-4 ">
                            {blog && (
                                <img
                                    src={`http://localhost:3000/blog/getblogphoto/${id}`}
                                    alt={`Photo for ${blog.title}`}
                                    className="w-25 h-auto justify-items-center"
                                />
                            )}
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Submit
                        </button>
                    </>
                )}
            </form>
        </div>
    );
}

export default EditBlog;
