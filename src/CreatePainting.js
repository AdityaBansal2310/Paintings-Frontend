import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePainting() {
    const [paintingData, setPaintingData] = useState({
        ID: '',
        Title: '',
        Artist: '',
        Description: '',
        Price: '',
        image: null 
    });

    const navigate = useNavigate(); // Get the navigate function using useNavigate hook

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setPaintingData({ ...paintingData, [e.target.name]: e.target.files[0] });
        } else {
            setPaintingData({ ...paintingData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('ID', paintingData.ID);
            formData.append('Title', paintingData.Title);
            formData.append('Artist', paintingData.Artist);
            formData.append('Description', paintingData.Description);
            formData.append('Price', paintingData.Price);
            formData.append('image', paintingData.image);

            await addPainting(formData);
            navigate('/'); // Redirect to homepage after successful creation
        } catch (error) {
            console.error('Error creating new painting:', error);
        }
    };

    const addPainting = async (formData) => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from local storage
            const response = await axios.post('http://127.0.0.1:8000/painting/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Token ${token}` // Include the token in the request headers
                }
            });
            console.log('New painting created:', response.data);
            // Here you can update the state or perform any additional actions if needed
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <div>
            <h1>Create New Painting</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ID:</label>
                    <input type="text" name="ID" value={paintingData.ID} onChange={handleChange} />
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" name="Title" value={paintingData.Title} onChange={handleChange} />
                </div>
                <div>
                    <label>Artist:</label>
                    <input type="text" name="Artist" value={paintingData.Artist} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="Description" value={paintingData.Description} onChange={handleChange} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" name="Price" value={paintingData.Price} onChange={handleChange} />
                </div>
                <div>
                    <label>Image</label>
                    <input type="file" name="image" onChange={handleChange} /> {/* Use type="file" for file upload */}
                </div>
                <button type="submit">Add Painting</button>
            </form>
        </div>
    );
}

export default CreatePainting;
