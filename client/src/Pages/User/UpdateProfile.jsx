// UpdateProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners'; // Import ClipLoader
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateProfile() {
    const currentUser = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const token = currentUser.token; // Retrieve token from local storage
    console.log('user token',token)

    useEffect(() => {
        if (currentUser) {
            fetchUser(currentUser.uid);
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
            setName(response.data.name);
            setPhone(response.data.phone);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.put(`http://localhost:3000/User/updateuser/${currentUser.id}`, {
                name,
                phone
            }, {
                headers: {
                    Authorization: token // Include token in the request headers
                }
            });
            console.log('Profile updated:', response.data);
            // toast.success('Profile updated')
            navigate('/Home')
            setError('');
            // Optionally redirect the user to another page after successful update
        } catch (err) {
            console.error(err);
            setError('Failed to update profile');
        } finally {
            setLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    {loading ? <ClipLoader color="#fff" size={20} /> : 'Update Profile'}
                </button>
            </form>
        </div>
    );
}

export default UpdateProfile;
