import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';
import '../css/CreatePainting.css'; // Import custom CSS for styling

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
            navigate('/paintings/'); // Redirect to homepage after successful creation
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
        <div className="create-painting-container">
            <div className="create-painting-form">
                <h1>Create new Painting</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control floating-input" id="floatingID" name="ID" value={paintingData.ID} onChange={handleChange} />
                        <label htmlFor="floatingID">ID</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control floating-input" id="floatingTitle" name="Title" value={paintingData.Title} onChange={handleChange} />
                        <label htmlFor="floatingTitle">Title</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control floating-input" id="floatingArtist" name="Artist" value={paintingData.Artist} onChange={handleChange} />
                        <label htmlFor="floatingArtist">Artist</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control floating-input" id="floatingDescription" name="Description" value={paintingData.Description} onChange={handleChange} />
                        <label htmlFor="floatingDescription">Description</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control floating-input" id="floatingPrice" name="Price" value={paintingData.Price} onChange={handleChange} />
                        <label htmlFor="floatingPrice">Price</label>
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="formFileSm" className="form-label"></label>
                        <input className="form-control form-control-sm" id="formFileSm" type="file" name="image" onChange={handleChange} />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="btn btn-primary">Add Painting</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePainting;
