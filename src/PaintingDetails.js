import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook

function PaintingDetails() {
    const { ID } = useParams(); // Use useParams hook to get route parameters
    const [painting, setPainting] = useState({});
    const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the pop-up
    const [editingMode, setEditingMode] = useState(false);
    const [updatedPaintingData, setUpdatedPaintingData] = useState({
        Title: '',
        Artist: '',
        Description: '',
        Price: '',
        image: null
    });

    useEffect(() => {
        const fetchPainting = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                };

                const response = await axios.get(`http://127.0.0.1:8000/painting/${ID}`, config);
                console.log('Painting data:', response.data); 
                setPainting(response.data);
            } catch (error) {
                console.error('Error fetching painting:', error);
            }
        };
    
        fetchPainting();
    }, [ID]);

    const deletePainting = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            };

            await axios.delete(`http://127.0.0.1:8000/painting/${ID}/`, config);
            console.log('Painting deleted');
            setShowPopup(true); 
        } catch (error) {
            console.error('Error deleting painting:', error);
        }
    };

    const handleEdit = () => {
        setEditingMode(true);
        setUpdatedPaintingData({
            Title: painting.Title,
            Artist: painting.Artist,
            Description: painting.Description,
            Price: painting.Price,
            image: painting.image
        });
    };

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            setUpdatedPaintingData({ ...updatedPaintingData, [e.target.name]: e.target.files[0] });
        } else {
            setUpdatedPaintingData({ ...updatedPaintingData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Authorization': `Token ${token}`
                }
            };

            const formData = new FormData();
            formData.append('Title', updatedPaintingData.Title);
            formData.append('Artist', updatedPaintingData.Artist);
            formData.append('Description', updatedPaintingData.Description);
            formData.append('Price', updatedPaintingData.Price);
            formData.append('image', updatedPaintingData.image);

            await axios.patch(`http://127.0.0.1:8000/painting/${ID}/`, formData, config);
            setEditingMode(false);
            // Refresh painting data after update
            const response = await axios.get(`http://127.0.0.1:8000/painting/${ID}`, config);
            setPainting(response.data);
        } catch (error) {
            console.error('Error updating painting:', error);
        }
    };

    return (
        <div>
            <h1>Painting Details</h1>
            <div className="painting-details">
                {editingMode ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Title:</label>
                            <input type="text" name="Title" value={updatedPaintingData.Title} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Artist:</label>
                            <input type="text" name="Artist" value={updatedPaintingData.Artist} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Description:</label>
                            <textarea name="Description" value={updatedPaintingData.Description} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input type="text" name="Price" value={updatedPaintingData.Price} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Image:</label>
                            <input type="file" name="image" onChange={handleChange} />
                        </div>
                        <button type="submit">Save Changes</button>
                    </form>
                ) : (
                    <>
                        <h2>{painting.Title}</h2>
                        <p>Title: {painting.Title}</p>
                        <p>Artist: {painting.Artist}</p>
                        <p>Description: {painting.Description}</p>
                        <p>Price: {painting.Price}</p>
                        <img src={`http://127.0.0.1:8000${painting.image}`} alt={painting.Title} />
                    </>
                )}
                {/* Conditionally render the pop-up */}
                {showPopup && (
                    <div className="popup">
                        <p>Painting deleted successfully</p>
                    </div>
                )}
                <button onClick={deletePainting}>Delete Painting</button>
                <button onClick={handleEdit}>Edit Painting</button>
            </div>
        </div>
    );
}

export default PaintingDetails;
