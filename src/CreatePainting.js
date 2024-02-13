import React, { useState } from 'react';
import axios from 'axios';

function CreatePainting({ history }) {
    const [paintingData, setPaintingData] = useState({
        ID: '',
        Title: '',
        Artist: '',
        Description: '',
        Price: '',
        image_url: ''
    });

    const handleChange = (e) => {
        setPaintingData({ ...paintingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addPainting(paintingData);
            history.push('/'); // Redirect to homepage after successful creation
        } catch (error) {
            console.error('Error creating new painting:', error);
        }
    };

    const addPainting = async (paintingData) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/painting/', {
                ...paintingData
            });
            console.log('New painting created:', response.data);
            // Here you can update the state or perform any additional actions if needed
        } catch (error) {
            throw new Error(error); // Throw error to be caught by handleSubmit
        }
    };

    return (
        <div>
            <h1>Create New Painting</h1>
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
                <label>Image URL:</label>
                <input type="text" name="image_url" value={paintingData.image_url} onChange={handleChange} />
            </div>
            <button onClick={handleSubmit}>Add Painting</button>
        </div>
    );
}

export default CreatePainting;
