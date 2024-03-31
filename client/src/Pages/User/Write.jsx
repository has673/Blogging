import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Write() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.currentUser);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [photo, setPhoto] = useState(null);
    const [tagsInput, setTagsInput] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('tags', JSON.stringify(tags)); // Convert tags array to JSON string

            // Append userId to formData if needed
           formData.append('user', currentUser.uid)

            // Append photo if it exists
            if (photo) {
                formData.append('photo', photo);
            }

            const res = await axios.post(
                'http://localhost:3000/blog/createBlog/',
                formData,
                {
                    headers: {
                        'Authorization': currentUser.token,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            navigate('/Home')
            console.log('Blog post created:', res.data);
            // Optionally, you can redirect the user to another page or perform other actions after successful submission
        } catch (err) {
            console.error('Error creating blog post:', err);
            // Optionally, you can display an error message to the user
        }
    };

    // Function to handle changes in the tags input field
    const handleTagsInputChange = (event) => {
        setTagsInput(event.target.value);
        // Split the input string into an array of tags based on commas
        const tagsArray = event.target.value.split(',');
        // Trim whitespace from each tag and remove empty tags
        const trimmedTagsArray = tagsArray.map(tag => tag.trim()).filter(tag => tag !== '');
        // Update the tags state with the new array of tags
        setTags(trimmedTagsArray);
    };


    return (
        <div className="container mx-auto mt-8">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <h1 className="text-2xl font-bold mb-4">Write Blog Post</h1>
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
                <div className="mb-4">
                    <label htmlFor="tags" className="block text-gray-700 font-semibold mb-2">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        value={tagsInput} 
                        onChange={handleTagsInputChange} 
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="photo" className="block text-gray-700 font-semibold mb-2">Photo</label>
                    <input
                        type="file"
                        id="photo"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        accept="image/*"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Write;
