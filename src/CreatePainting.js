import React, { useState } from 'react';
import axios from 'axios';

function CreatePainting({ history }) {
    const [paintingData, setPaintingData] = useState({
        ID: '',
        title: '',
        artist: '',
        description: '',
        price: '',
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
            const response = await axios.post('http://127.0.0.1:8000/painting/', paintingData);
            console.log('New painting created:', response.data);
            // Here you can update the state or perform any additional actions if needed
        } catch (error) {
            throw new Error(error); // Throw error to be caught by handleSubmit
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
                    <input type="text" name="title" value={paintingData.title} onChange={handleChange} />
                </div>
                <div>
                    <label>Artist:</label>
                    <input type="text" name="artist" value={paintingData.artist} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={paintingData.description} onChange={handleChange} />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="text" name="price" value={paintingData.price} onChange={handleChange} />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input type="text" name="image_url" value={paintingData.image_url} onChange={handleChange} />
                </div>
                <button type="submit">Add Painting</button>
            </form>
        </div>
    );
}

export default CreatePainting;
